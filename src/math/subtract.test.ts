import { describe, expect, it } from "vitest";

import { subtract } from "./subtract";

describe("subtract", () => {
  it("subtracts component-wise: the vector from b to a", () => {
    // (100, 0) − (0, 50) = (100, −50).
    expect(subtract({ x: 100, y: 0 }, { x: 0, y: 50 })).toEqual({ x: 100, y: -50 });
  });
});
