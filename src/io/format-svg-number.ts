import { SVG_DECIMALS } from "./svg-decimals";

/**
 * Number written in SVG path data: rounded to `SVG_DECIMALS` decimals, shortest form.
 *
 * Trailing zeros are dropped and a negative zero is written `0`.
 *
 * @kind format
 * @param value - finite derived coordinate or length, in user units
 * @returns its decimal text, e.g. `86.60254`, `2.5`, `0`
 * @see REF-SVG2-PATHS
 */
export function formatSvgNumber(value: number): string {
  const rounded = Number(value.toFixed(SVG_DECIMALS));

  return String(rounded);
}
