/** Rectangle of the model: integer width, height and corner radius, ≥ 0 (ADR-0003, Q15). */
export type Rectangle = {
  /** Vertical size, integer ≥ 0. */
  readonly height: number;
  /** Requested corner radius, the same at every corner, integer ≥ 0; the effective one is derived (Q8). */
  readonly radius: number;
  /** Horizontal size, integer ≥ 0. */
  readonly width: number;
};
