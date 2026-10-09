import { REGULAR_POLYGON_CORNER_RANGE } from "./regular-polygon-corner-range";

import type { RegularPolygon } from "./regular-polygon";

/**
 * Whether a regular polygon can enter the model: an integer number of corners from 3 to 12
 * (Q19), and width, height and corner radius integers ≥ 0.
 *
 * A size of 0 gives a degenerate polygon, allowed (Q15); a negative or fractional value is
 * rejected (ADR-0003). A radius larger than the polygon is valid: it is clamped (ADR-0007).
 *
 * @kind domain
 * @param polygon - number of corners, width, height and radius to check
 * @returns `true` when every value is allowed
 * @see docs/domain/shapes.md#regular-polygon
 */
export function isValidRegularPolygon(polygon: RegularPolygon): boolean {
  const { corners, height, radius, width } = polygon;
  const { max, min } = REGULAR_POLYGON_CORNER_RANGE;
  const sizes = [width, height, radius];

  return (
    Number.isSafeInteger(corners) &&
    corners >= min &&
    corners <= max &&
    sizes.every((value) => Number.isSafeInteger(value) && value >= 0)
  );
}
