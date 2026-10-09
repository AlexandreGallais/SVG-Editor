import { boundingBox } from "./bounding-box";

import type { Point } from "../math";

/**
 * Scales a set of points uniformly to the largest size fitting a `width × height` box, and
 * centers it there (`DERIV-regular-polygon-fit` steps 3–5).
 *
 * The scale is `s = min(width / spanX, height / spanY)`: the shape keeps its proportions and
 * reaches the width, the height or both, within a rounding error relative to the box: about
 * 1e-16 × its size (written 0 by the output for boxes up to millions of units). The points must span both axes
 * (`spanX > 0`, `spanY > 0`); a box of size 0 gives `s = 0`: every point goes to the center.
 * The y axis is not flipped: the points are already in the SVG frame.
 *
 * @kind geometry
 * @param points - points spanning both axes, in drawing order
 * @param width - width of the box, >= 0
 * @param height - height of the box, >= 0
 * @returns the points scaled and centered, in the same order
 * @see DERIV-regular-polygon-fit
 */
export function fitInBox(
  points: readonly Point[],
  width: number,
  height: number,
): readonly Point[] {
  const box = boundingBox(points);
  const spanX = box.maxX - box.minX;
  const spanY = box.maxY - box.minY;
  const scale = Math.min(width / spanX, height / spanY);
  const left = (width - scale * spanX) / 2;
  const top = (height - scale * spanY) / 2;

  return points.map((point) => ({
    x: left + scale * (point.x - box.minX),
    y: top + scale * (point.y - box.minY),
  }));
}
