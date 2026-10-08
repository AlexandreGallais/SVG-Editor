import type { Point } from "../math";

/**
 * Vertex of a cyclic contour at any index: indices are taken modulo the vertex count (Q11).
 *
 * Index −1 is the last vertex, index `n` the first one.
 *
 * @kind geometry
 * @param contour - vertices in drawing order
 * @param index - position, wrapped around the contour
 * @param fallback - point returned when the contour is empty
 * @returns the vertex at `index mod n`, or `fallback` for an empty contour
 * @see DERIV-turning-angle
 */
export function cyclicVertex(contour: readonly Point[], index: number, fallback: Point): Point {
  return contour.at(index % contour.length) ?? fallback;
}
