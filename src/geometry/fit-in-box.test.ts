import { fc, test } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";

import { EPSILON } from "../math";

import { boundingBox } from "./bounding-box";
import { fitInBox } from "./fit-in-box";

/** Unit square from (−1, −1) to (1, 1), clockwise on screen from its top-left vertex. */
const SQUARE = [
  { x: -1, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: -1, y: 1 },
];

describe("fitInBox (DERIV-regular-polygon-fit steps 3–5)", () => {
  it("fits a square in 100 × 50: the height is reached, centered horizontally", () => {
    // Span 2 × 2, s = min(100/2, 50/2) = 25: a 50 × 50 square, left margin (100 − 50)/2 = 25.
    expect(fitInBox(SQUARE, 100, 50)).toEqual([
      { x: 25, y: 0 },
      { x: 75, y: 0 },
      { x: 75, y: 50 },
      { x: 25, y: 50 },
    ]);
  });

  it("fits a 4 × 2 rectangle in 100 × 100: the width is reached, centered vertically", () => {
    // Span 4 × 2, s = min(100/4, 100/2) = 25: 100 × 50, top margin (100 − 50)/2 = 25.
    const rectangle = [
      { x: 0, y: 0 },
      { x: 4, y: 0 },
      { x: 4, y: 2 },
      { x: 0, y: 2 },
    ];

    expect(fitInBox(rectangle, 100, 100)).toEqual([
      { x: 0, y: 25 },
      { x: 100, y: 25 },
      { x: 100, y: 75 },
      { x: 0, y: 75 },
    ]);
  });

  it("collapses every point to the center of a box of width 0 (Q15)", () => {
    // s = min(0/2, 50/2) = 0: every point at (0, 25).
    expect(fitInBox(SQUARE, 0, 50)).toEqual(Array.from({ length: 4 }, () => ({ x: 0, y: 25 })));
  });
});

describe("fitInBox (properties)", () => {
  test.prop({
    height: fc.integer({ max: 1000, min: 0 }),
    stretch: fc.integer({ max: 10, min: 1 }),
    width: fc.integer({ max: 1000, min: 0 }),
  })(
    "stays in the box, centered, reaching its width or its height",
    ({ height, stretch, width }) => {
      const rectangle = SQUARE.map((point) => ({ x: point.x * stretch, y: point.y }));
      const box = boundingBox(fitInBox(rectangle, width, height));
      const tolerance = EPSILON * Math.max(1, width, height);

      expect(box.minX).toBeGreaterThanOrEqual(-tolerance);
      expect(box.minY).toBeGreaterThanOrEqual(-tolerance);
      expect(box.maxX).toBeLessThanOrEqual(width + tolerance);
      expect(box.maxY).toBeLessThanOrEqual(height + tolerance);
      expect(Math.abs((box.minX + box.maxX) / 2 - width / 2)).toBeLessThan(tolerance);
      expect(Math.abs((box.minY + box.maxY) / 2 - height / 2)).toBeLessThan(tolerance);

      expect(
        Math.abs(box.maxX - box.minX - width) < tolerance ||
          Math.abs(box.maxY - box.minY - height) < tolerance,
      ).toBe(true);
    },
  );

  test.prop({
    height: fc.integer({ max: 1000, min: 1 }),
    width: fc.integer({ max: 1000, min: 1 }),
  })("keeps the proportions: a square stays a square", ({ height, width }) => {
    const box = boundingBox(fitInBox(SQUARE, width, height));

    expect(box.maxX - box.minX).toBeCloseTo(box.maxY - box.minY, 9);
  });
});
