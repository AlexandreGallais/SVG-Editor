import { fc, test } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";

import { edgeLengths, roundedContour } from "../geometry";

import { effectiveCornerRadius } from "./effective-corner-radius";
import { regularPolygonCorners } from "./regular-polygon-corners";

import type { Arc, ContourPiece, Corner } from "../geometry";

/** Decimals compared, from `EPSILON = 1e-9` (Q10). */
const DECIMALS = 9;

/**
 * Arcs of a rounded contour.
 *
 * @param pieces - segments and arcs
 * @returns the arcs only, in drawing order
 */
function arcsOf(pieces: readonly ContourPiece[]): readonly Arc[] {
  return pieces.filter((piece): piece is Arc => piece.kind === "arc");
}

/**
 * Circumradius `s` of a regular polygon, from its edge `a = 2 s sin(π/n)`
 * (`REF-MATHWORLD-REGULAR-POLYGON` (2)).
 *
 * @param corners - corners of the polygon, in drawing order
 * @returns the radius of its circumscribed circle
 */
function circumradius(corners: readonly Corner[]): number {
  const [edge = 0] = edgeLengths(corners.map((corner) => corner.point));

  return edge / (2 * Math.sin(Math.PI / corners.length));
}

describe("regularPolygonCorners (DERIV-regular-polygon-fit step 6)", () => {
  it("[F02.AC2] turns a hexagon in 100 × 100 with radius 1000 into its incircle: diameter 86.60254", () => {
    // s = 50, inradius 50 cos(π/6) = 43.30127; every arc centered at the center of the box.
    const corners = regularPolygonCorners({ corners: 6, height: 100, radius: 1000, width: 100 });
    const pieces = roundedContour(corners);

    expect(effectiveCornerRadius(corners)).toBeCloseTo(25 * Math.sqrt(3), DECIMALS);
    expect(arcsOf(pieces)).toHaveLength(6);
    expect(pieces.every((piece) => piece.kind === "arc")).toBe(true);

    const arcs = arcsOf(pieces);

    for (const arc of arcs) {
      expect(arc.center.x).toBeCloseTo(50, DECIMALS);
      expect(arc.center.y).toBeCloseTo(50, DECIMALS);
    }
  });

  it("[F02.AC2] gives a triangle in 100 × 100 with radius 1000 its incircle, below the center of the box", () => {
    // s = 100/√3, inradius s cos(π/3) = 28.86751; center 28.86751 above the base 93.30127: y = 64.43376.
    const corners = regularPolygonCorners({ corners: 3, height: 100, radius: 1000, width: 100 });
    const inradius = 50 / Math.sqrt(3);
    const base = 50 + 25 * Math.sqrt(3);

    expect(effectiveCornerRadius(corners)).toBeCloseTo(inradius, DECIMALS);

    const pieces = roundedContour(corners);
    const arcs = arcsOf(pieces);

    expect(arcs).toHaveLength(3);
    expect(pieces.every((piece) => piece.kind === "arc")).toBe(true);

    for (const arc of arcs) {
      expect(arc.center.x).toBeCloseTo(50, DECIMALS);
      expect(arc.center.y).toBeCloseTo(base - inradius, DECIMALS);
    }
  });

  it("[F02.AC2] keeps radius 10 on a hexagon in 100 × 100: two setbacks of 5.7735 fit an edge of 50", () => {
    // Turn of π/3: setback 10 · tan(π/6) = 5.7735; 2 × 5.7735 = 11.547 ≤ 50, no reduction.
    const corners = regularPolygonCorners({ corners: 6, height: 100, radius: 10, width: 100 });

    expect(effectiveCornerRadius(corners)).toBeCloseTo(10, DECIMALS);
  });

  it("[F02.AC2] keeps the requested radius on every corner (Q8)", () => {
    const corners = regularPolygonCorners({ corners: 5, height: 100, radius: 1000, width: 100 });

    expect(corners.map((corner) => corner.radius)).toEqual([1000, 1000, 1000, 1000, 1000]);
  });
});

describe("regularPolygonCorners (properties)", () => {
  test.prop({
    corners: fc.integer({ max: 12, min: 3 }),
    height: fc.integer({ max: 1000, min: 1 }),
    width: fc.integer({ max: 1000, min: 1 }),
  })(
    "[F02.AC2] at the maximal radius, gives every corner the inradius s · cos(π/n), one common center",
    ({ corners, height, width }) => {
      const polygon = regularPolygonCorners({ corners, height, radius: 100_000, width });
      const arcs = arcsOf(roundedContour(polygon));
      const [first] = arcs;
      const tolerance = 1e-9 * Math.max(width, height);
      const offsets = arcs.map((arc) =>
        Math.hypot(arc.center.x - (first?.center.x ?? 0), arc.center.y - (first?.center.y ?? 0)),
      );

      expect(effectiveCornerRadius(polygon)).toBeCloseTo(
        circumradius(polygon) * Math.cos(Math.PI / corners),
        DECIMALS,
      );

      expect(arcs).toHaveLength(corners);
      expect(Math.max(...offsets)).toBeLessThan(tolerance);
    },
  );

  test.prop({
    corners: fc.integer({ max: 12, min: 3 }),
    radius: fc.integer({ max: 2000, min: 0 }),
    size: fc.integer({ max: 1000, min: 1 }),
  })("never exceeds the requested radius", ({ corners, radius, size }) => {
    const polygon = regularPolygonCorners({ corners, height: size, radius, width: size });

    expect(effectiveCornerRadius(polygon)).toBeLessThanOrEqual(radius * (1 + 1e-9));
  });
});
