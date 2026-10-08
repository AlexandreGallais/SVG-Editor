/** Rectangle of the model: integer width and height, ≥ 0 (ADR-0003, Q15). */
export type Rectangle = {
  /** Vertical size, integer ≥ 0. */
  readonly height: number;
  /** Horizontal size, integer ≥ 0. */
  readonly width: number;
};
