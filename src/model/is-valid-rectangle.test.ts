import { describe, expect, it } from "vitest";

import { isValidRectangle } from "./is-valid-rectangle";

describe("isValidRectangle", () => {
  it("accepts positive integer sizes", () => {
    expect(isValidRectangle({ height: 50, width: 100 })).toBe(true);
  });

  it("accepts a size of 0 (Q15)", () => {
    expect(isValidRectangle({ height: 0, width: 0 })).toBe(true);
  });

  it("rejects a negative width or height (Q15)", () => {
    expect(isValidRectangle({ height: 50, width: -1 })).toBe(false);
    expect(isValidRectangle({ height: -1, width: 50 })).toBe(false);
  });

  it("rejects a non-integer size (ADR-0003)", () => {
    expect(isValidRectangle({ height: 50, width: 10.5 })).toBe(false);
  });
});
