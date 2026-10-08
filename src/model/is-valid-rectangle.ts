import type { Rectangle } from "./rectangle";

/**
 * Whether a rectangle can enter the model: width and height are integers ≥ 0.
 *
 * A size of 0 gives a degenerate rectangle, allowed (Q15); a negative or fractional size is
 * rejected (ADR-0003).
 *
 * @kind domain
 * @param rectangle - width and height to check
 * @returns `true` when both sizes are integers ≥ 0
 * @see docs/domain/shapes.md#rectangle
 */
export function isValidRectangle(rectangle: Rectangle): boolean {
  const { height, width } = rectangle;

  return Number.isSafeInteger(width) && width >= 0 && Number.isSafeInteger(height) && height >= 0;
}
