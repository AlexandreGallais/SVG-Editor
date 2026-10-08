import { dot, perpDot, subtract } from "../math";

import type { Point } from "../math";

/**
 * Turning angle at a vertex, from the incoming edge to the outgoing edge.
 *
 * Formula: τ = atan2(a⊥ · b, a · b), a = vertex − previous, b = next − vertex. In the SVG frame,
 * τ > 0 is a clockwise turn on screen; τ ∈ [−π, π].
 *
 * @kind geometry
 * @param previous - vertex before the corner
 * @param vertex - corner vertex
 * @param next - vertex after the corner
 * @returns the signed turning angle in radians, 0 for aligned vertices or a zero-length edge
 * @see DERIV-turning-angle
 */
export function turningAngle(previous: Point, vertex: Point, next: Point): number {
  const incoming = subtract(vertex, previous);
  const outgoing = subtract(next, vertex);

  return Math.atan2(perpDot(incoming, outgoing), dot(incoming, outgoing));
}
