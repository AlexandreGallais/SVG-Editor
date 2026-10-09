import { describe, expect, it } from "vitest";

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
