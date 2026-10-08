import { rectangleContour } from "./rectangle-contour";

import type { Rectangle } from "./rectangle";
import type { Corner } from "../geometry";

/**
 * Corners of a rectangle: the vertices of its contour, each with the rectangle's requested radius.
 *
 * @kind domain
 * @param rectangle - width, height and global corner radius
 * @returns four corners, clockwise from the top-left vertex (Q11)
 * @see docs/domain/shapes.md#_2-corner-radius
 */
export function rectangleCorners(rectangle: Rectangle): readonly Corner[] {
  return rectangleContour(rectangle).map((point) => ({ point, radius: rectangle.radius }));
}
