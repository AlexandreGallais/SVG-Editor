import { describe, expect, it } from "vitest";

import { vertexFactors } from "./vertex-factors";

describe("vertexFactors (DERIV-local-radius-clamp step 3)", () => {
  it("takes the smaller factor of the two edges of each vertex", () => {
    // Edges [top, right, bottom, left] = [0.1, 1, 1, 0.1]: vertex 0 between left and top → 0.1,
    // vertex 1 between top and right → 0.1, vertex 2 → 1, vertex 3 between bottom and left → 0.1.
    expect(vertexFactors([0.1, 1, 1, 0.1])).toEqual([0.1, 0.1, 1, 0.1]);
  });

  it("gives nothing for an empty contour", () => {
    expect(vertexFactors([])).toEqual([]);
  });
});
