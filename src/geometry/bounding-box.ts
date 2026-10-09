import type { Point } from "../math";

/** Smallest axis-aligned rectangle containing a set of points (glossary: bounding box). */
export type BoundingBox = {
  /** Largest abscissa. */
  readonly maxX: number;
  /** Largest ordinate (lowest point on screen). */
  readonly maxY: number;
  /** Smallest abscissa. */
  readonly minX: number;
  /** Smallest ordinate (highest point on screen). */
  readonly minY: number;
};

/**
 * Bounding box of a set of points: the smallest and largest coordinates on each axis
 * (`DERIV-regular-polygon-fit` step 3).
 *
 * An empty set has no box: its minima are `+∞` and its maxima `−∞`.
 *
 * @kind geometry
 * @param points - points, in any order
 * @returns the extreme coordinates
 * @see DERIV-regular-polygon-fit
 */
export function boundingBox(points: readonly Point[]): BoundingBox {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);

  return {
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
    minX: Math.min(...xs),
    minY: Math.min(...ys),
  };
}
