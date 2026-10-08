import { describe, expect, it } from "vitest";

import { formatSvgNumber } from "./format-svg-number";

describe("formatSvgNumber", () => {
  it("writes an integer without decimals", () => {
    expect(formatSvgNumber(1)).toBe("1");
  });

  it("rounds to 5 decimals", () => {
    // 1 / 3 = 0.333333…, 5 decimals kept.
    expect(formatSvgNumber(1 / 3)).toBe("0.33333");
    // 86.602540378 → 86.60254 (sixth decimal 0, rounded down).
    expect(formatSvgNumber(86.602540378)).toBe("86.60254");
  });

  it("drops trailing zeros", () => {
    // 2.5000000001 rounds to 2.50000, written without its trailing zeros.
    expect(formatSvgNumber(2.5000000001)).toBe("2.5");
  });

  it("never writes a negative zero", () => {
    // -0.000001 rounds to -0.00000, written as 0.
    expect(formatSvgNumber(-0.000001)).toBe("0");
  });

  it("keeps the sign of negative numbers", () => {
    expect(formatSvgNumber(-12.25)).toBe("-12.25");
  });
});
