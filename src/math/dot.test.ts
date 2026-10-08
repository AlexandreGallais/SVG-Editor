import { describe, expect, it } from "vitest";

import { dot } from "./dot";

describe("dot", () => {
  it("sums the products of the components", () => {
    // 3 × 4 + 2 × (−1) = 10.
    expect(dot({ x: 3, y: 2 }, { x: 4, y: -1 })).toBe(10);
  });

  it("is zero for perpendicular vectors", () => {
    expect(dot({ x: 100, y: 0 }, { x: 0, y: 50 })).toBe(0);
  });
});
