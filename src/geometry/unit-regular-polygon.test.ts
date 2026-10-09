import { fc, test } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";

import { EPSILON } from "../math";

import { unitRegularPolygon } from "./unit-regular-polygon";

import type { Point } from "../math";

/** Decimals compared: cosine and sine of the angles are correct to the last bits of a double. */
const DECIMALS = 12;

/** Half of √2: cos(π/4), a coordinate of the square. */
const HALF_SQRT_2 = Math.SQRT2 / 2;

/** Half of √3: cos(π/6), a coordinate of the triangle and the hexagon. */
const HALF_SQRT_3 = Math.sqrt(3) / 2;

/**
 * Checks two lists of points coordinate by coordinate.
 *
 * @param actual - computed points
 * @param expected - hand-computed points
 */
function expectPoints(actual: readonly Point[], expected: readonly Point[]): void {
  expect(actual).toHaveLength(expected.length);

  for (const [index, point] of expected.entries()) {
    expect(actual[index]?.x).toBeCloseTo(point.x, DECIMALS);
    expect(actual[index]?.y).toBeCloseTo(point.y, DECIMALS);
  }
}

/**
 * Twice the signed area of a closed contour (shoelace formula), positive when clockwise on
 * screen (y down), like the rectangle of US-001.
 *
 * @param points - vertices in drawing order
 * @returns twice the signed area
 */
function doubleSignedArea(points: readonly Point[]): number {
  return points.reduce((sum, point, index) => {
    const next = points[(index + 1) % points.length] ?? point;

    return sum + point.x * next.y - next.x * point.y;
  }, 0);
}

describe("unitRegularPolygon (DERIV-regular-polygon-fit steps 1–2)", () => {
  it("[F02.AC3] gives a triangle pointing up, from its apex, clockwise on screen", () => {
    // n = 3, start k = ⌊3/2⌋ = 1: β = π/2, −π/6, −5π/6; SVG point (cos β, −sin β).
    expectPoints(unitRegularPolygon(3), [
      { x: 0, y: -1 },
      { x: HALF_SQRT_3, y: 0.5 },
      { x: -HALF_SQRT_3, y: 0.5 },
    ]);
  });

  it("[F02.AC3] gives a square with horizontal edges, not a diamond, from its top-left vertex", () => {
    // n = 4, start k = 2: β = 3π/4, π/4, −π/4, −3π/4.
    expectPoints(unitRegularPolygon(4), [
      { x: -HALF_SQRT_2, y: -HALF_SQRT_2 },
      { x: HALF_SQRT_2, y: -HALF_SQRT_2 },
      { x: HALF_SQRT_2, y: HALF_SQRT_2 },
      { x: -HALF_SQRT_2, y: HALF_SQRT_2 },
    ]);
  });

  it("[F02.AC3] gives a hexagon with flat top and bottom, from the left end of its top edge", () => {
    // n = 6, start k = 3: β = 2π/3, π/3, 0, −π/3, −2π/3, −π.
    expectPoints(unitRegularPolygon(6), [
      { x: -0.5, y: -HALF_SQRT_3 },
      { x: 0.5, y: -HALF_SQRT_3 },
      { x: 1, y: 0 },
      { x: 0.5, y: HALF_SQRT_3 },
      { x: -0.5, y: HALF_SQRT_3 },
      { x: -1, y: 0 },
    ]);
  });

  it("writes the zero ordinate of the hexagon's right vertex as +0, never −0 (ADR-0025)", () => {
    // β₂ = −π/2 + 3π/6 = 0 exactly: −sin(0) would be −0.
    expect(Object.is(unitRegularPolygon(6)[2]?.y, 0)).toBe(true);
  });
});

describe("unitRegularPolygon (properties)", () => {
  test.prop({ corners: fc.integer({ max: 64, min: 3 }) })(
    "[F02.AC3] puts n vertices on the unit circle, a chord 2 sin(π/n) apart",
    ({ corners }) => {
      const polygon = unitRegularPolygon(corners);
      const chord = 2 * Math.sin(Math.PI / corners);

      expect(polygon).toHaveLength(corners);

      for (const [index, point] of polygon.entries()) {
        const next = polygon[(index + 1) % corners] ?? point;

        expect(Math.hypot(point.x, point.y)).toBeCloseTo(1, DECIMALS);
        expect(Math.hypot(next.x - point.x, next.y - point.y)).toBeCloseTo(chord, DECIMALS);
      }
    },
  );

  test.prop({ corners: fc.integer({ max: 64, min: 3 }) })(
    "[F02.AC3] runs clockwise on screen from the topmost vertex, the leftmost on a tie",
    ({ corners }) => {
      const polygon = unitRegularPolygon(corners);
      const [start] = polygon;
      const top = Math.min(...polygon.map((point) => point.y));
      const topLeft = Math.min(
        ...polygon.filter((point) => point.y - top < EPSILON).map((point) => point.x),
      );

      expect(doubleSignedArea(polygon)).toBeGreaterThan(0);
      expect(start?.y).toBeCloseTo(top, DECIMALS);
      expect(start?.x).toBeCloseTo(topLeft, DECIMALS);
    },
  );

  test.prop({ corners: fc.integer({ max: 64, min: 3 }) })(
    "[F02.AC1] has a flat base: its two lowest vertices are at the same height",
    ({ corners }) => {
      const heights = unitRegularPolygon(corners)
        .map((point) => point.y)
        .toSorted((first, second) => second - first);

      expect(heights[0]).toBeCloseTo(heights[1] ?? NaN, DECIMALS);
      expect(heights[0]).toBeCloseTo(Math.cos(Math.PI / corners), DECIMALS);
    },
  );
});
