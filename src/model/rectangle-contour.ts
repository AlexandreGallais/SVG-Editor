import type { Point } from "../math";
import type { Rectangle } from "./rectangle";

/**
 * Contour of a rectangle placed at the origin: its four vertices, clockwise on screen from the
 * top-left one.
 *
 * @kind domain
 * @param rectangle - width and height of the rectangle
 * @returns top-left, top-right, bottom-right and bottom-left vertices
 * @see docs/domain/shapes.md#contour-orientation-q11
 */
export function rectangleContour(rectangle: Rectangle): readonly Point[] {
  const { height, width } = rectangle;

  return [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ];
}
