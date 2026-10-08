import { formatSvgNumber } from "./format-svg-number";

import type { Point } from "../math";

/** Separator between path-data commands and between coordinates (SVG 2 §9.3.9, `wsp`). */
const SEPARATOR = " ";

/** `closepath` command: draws the last edge back to the initial point (SVG 2 §9.3.4). */
const CLOSE_PATH = "Z";

/**
 * Coordinate pair of a path-data command, numbers at fixed precision: `x y`.
 *
 * @kind format
 * @param point - vertex to write
 * @returns `"x y"` written with `formatSvgNumber`
 * @see REF-SVG2-PATHS
 */
function pointToCoordinatePair(point: Point): string {
  return `${formatSvgNumber(point.x)}${SEPARATOR}${formatSvgNumber(point.y)}`;
}

/**
 * Path data of a closed contour with sharp corners: `M p₀ L p₁ … L pₙ₋₁ Z`.
 *
 * `moveto` starts at the first vertex (§9.3.3), `lineto` draws each edge (§9.3.5), `closepath`
 * draws the last edge back to the first vertex (§9.3.4). An empty contour gives an empty `d`.
 *
 * @kind format
 * @param contour - vertices in drawing order
 * @returns the `d` attribute of the `<path>`
 * @see REF-SVG2-PATHS
 */
export function contourToPathData(contour: readonly Point[]): string {
  const commands = contour.map(
    (vertex, index) => `${index === 0 ? "M" : "L"}${pointToCoordinatePair(vertex)}`,
  );

  return contour.length === 0 ? "" : [...commands, CLOSE_PATH].join(SEPARATOR);
}
