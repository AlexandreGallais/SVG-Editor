import { describe, expect, it } from "vitest";

import { cyclicVertex } from "./cyclic-vertex";

/** Rectangle 100 × 50 of US-001, clockwise from the top-left vertex. */
const RECTANGLE = [
  { x: 0, y: 0 },
  { x: 100, y: 0 },
  { x: 100, y: 50 },
  { x: 0, y: 50 },
];

/** Fallback returned for an empty contour. */
const FALLBACK = { x: -1, y: -1 };

describe("cyclicVertex", () => {
  it("reads the vertex at an index inside the contour", () => {
    expect(cyclicVertex(RECTANGLE, 2, FALLBACK)).toEqual({ x: 100, y: 50 });
  });

  it("wraps around: the vertex before the first one is the last one (Q11)", () => {
    expect(cyclicVertex(RECTANGLE, -1, FALLBACK)).toEqual({ x: 0, y: 50 });
  });

  it("wraps around: the vertex after the last one is the first one (Q11)", () => {
    expect(cyclicVertex(RECTANGLE, 4, FALLBACK)).toEqual({ x: 0, y: 0 });
  });

  it("returns the fallback for an empty contour", () => {
    expect(cyclicVertex([], 0, FALLBACK)).toEqual(FALLBACK);
  });
});
