import { effectiveRadii } from "../geometry";

import { rectangleCorners } from "./rectangle-corners";

import type { Rectangle } from "./rectangle";

/**
 * Corner radius actually drawn on a rectangle: the requested radius after clamping (ADR-0007).
 *
 * Derived at every evaluation, never stored (Q8). A rectangle's corners are clamped alike, so
 * the smallest effective radius is the radius of every corner.
 *
 * @kind domain
 * @param rectangle - width, height and requested radius
 * @returns the effective radius, <= the requested one
 * @see docs/domain/shapes.md#radius-clamping-adr-0007
 */
export function effectiveCornerRadius(rectangle: Rectangle): number {
  return Math.min(...effectiveRadii(rectangleCorners(rectangle)));
}
