import { describe, expect, it } from "vitest";

import { rectangleCorners } from "./rectangle-corners";

describe("rectangleCorners", () => {
  it("gives the four vertices of the contour, each with the requested radius (global radius)", () => {
    expect(rectangleCorners({ height: 50, radius: 10, width: 100 })).toEqual([
      { point: { x: 0, y: 0 }, radius: 10 },
      { point: { x: 100, y: 0 }, radius: 10 },
      { point: { x: 100, y: 50 }, radius: 10 },
      { point: { x: 0, y: 50 }, radius: 10 },
    ]);
  });
});
