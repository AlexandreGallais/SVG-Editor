import { isModelSize } from "./is-model-size";

import type { Rectangle } from "./rectangle";

/**
 * Whether a rectangle can enter the model: width, height and corner radius are integers ≥ 0.
 *
 * A size of 0 gives a degenerate rectangle, allowed (Q15); a negative or fractional value is
 * rejected (ADR-0003). A radius larger than the rectangle is valid: it is clamped (ADR-0007).
 *
 * @kind domain
 * @param rectangle - width, height and radius to check
 * @returns `true` when the three values are integers ≥ 0
 * @see docs/domain/shapes.md#rectangle
 */
export function isValidRectangle(rectangle: Rectangle): boolean {
  const { height, radius, width } = rectangle;

  return [width, height, radius].every((value) => isModelSize(value));
}
