import { effectiveRadii } from "../geometry";

import type { Corner } from "../geometry";

/**
 * Corner radius actually drawn on a shape whose corners all request the same radius: the
 * requested radius after clamping (ADR-0007).
 *
 * Derived at every evaluation, never stored (Q8). The corners of a rectangle or of a regular
 * polygon are clamped alike, so the smallest effective radius is the radius of every corner.
 * No corner gives `+∞`.
 *
 * @kind domain
 * @param corners - corners of the shape, the same requested radius on each
 * @returns the effective radius, <= the requested one
 * @see docs/domain/shapes.md#radius-clamping-adr-0007
 */
export function effectiveCornerRadius(corners: readonly Corner[]): number {
  return Math.min(...effectiveRadii(corners));
}
