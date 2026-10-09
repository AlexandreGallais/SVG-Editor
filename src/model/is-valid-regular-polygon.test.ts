import { describe, expect, it } from "vitest";

import { isValidRegularPolygon } from "./is-valid-regular-polygon";

describe("isValidRegularPolygon", () => {
  it("[F02.AC1] accepts 3 and 12 corners, the limits of Q19", () => {
    expect(isValidRegularPolygon({ corners: 3, height: 100, radius: 0, width: 100 })).toBe(true);
    expect(isValidRegularPolygon({ corners: 12, height: 100, radius: 0, width: 100 })).toBe(true);
  });

  it("[F02.AC1] refuses 2 corners, 13 corners and a fractional number of corners", () => {
    expect(isValidRegularPolygon({ corners: 2, height: 100, radius: 0, width: 100 })).toBe(false);
    expect(isValidRegularPolygon({ corners: 13, height: 100, radius: 0, width: 100 })).toBe(false);
    expect(isValidRegularPolygon({ corners: 4.5, height: 100, radius: 0, width: 100 })).toBe(false);
  });

  it("[F02.AC1] accepts a size of 0 and refuses a negative or fractional size (Q15)", () => {
    expect(isValidRegularPolygon({ corners: 6, height: 0, radius: 0, width: 0 })).toBe(true);
    expect(isValidRegularPolygon({ corners: 6, height: 100, radius: 0, width: -1 })).toBe(false);
    expect(isValidRegularPolygon({ corners: 6, height: 0.5, radius: 0, width: 100 })).toBe(false);
  });

  it("accepts a radius larger than the polygon and refuses a negative one (ADR-0007)", () => {
    expect(isValidRegularPolygon({ corners: 6, height: 100, radius: 1000, width: 100 })).toBe(true);
    expect(isValidRegularPolygon({ corners: 6, height: 100, radius: -1, width: 100 })).toBe(false);
  });
});
