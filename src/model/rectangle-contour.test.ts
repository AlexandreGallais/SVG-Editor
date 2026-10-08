import { describe, expect, it } from "vitest";

import { rectangleContour } from "./rectangle-contour";

describe("rectangleContour", () => {
  it("lists the vertices clockwise on screen from the top-left one (Q11)", () => {
    // y points down: top-left, top-right, bottom-right, bottom-left.
    expect(rectangleContour({ height: 50, radius: 0, width: 100 })).toEqual([
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 50 },
      { x: 0, y: 50 },
    ]);
  });

  it("keeps integer coordinates for integer sizes (ADR-0003)", () => {
    const vertices = rectangleContour({ height: 7, radius: 0, width: 13 });

    expect(
      vertices.every((vertex) => Number.isSafeInteger(vertex.x) && Number.isSafeInteger(vertex.y)),
    ).toBe(true);
  });

  it("accepts a degenerate rectangle of height 0 (Q15)", () => {
    // Height 0: the four vertices lie on the top edge.
    expect(rectangleContour({ height: 0, radius: 0, width: 10 })).toEqual([
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 0 },
      { x: 0, y: 0 },
    ]);
  });
});
