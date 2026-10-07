# DERIV-regular-polygon-fit — Regular polygon fitted uniformly in a box

Used by: `docs/domain/shapes.md` §3 (Q1: uniform mode).

## Inputs (model, integers)

`n ≥ 3` corners, width `w`, height `h`.

## Step 1 — Unit polygon

Vertices on the circle of radius 1 (mathematical frame, y upwards):
`pₖ = (cos αₖ, sin αₖ)`, `αₖ = α₀ + 2πk / n`.

Default orientation: **flat base** (a horizontal bottom edge).
The bottom edge joins the angles `−π/2 ± π/n`, so `α₀ = −π/2 + π/n`.

Consequence: `n=3` triangle pointing up, `n=4` square (not a diamond), `n=6` hexagon with flat bases.

## Step 2 — Unit bounding box

`Wᵤ = max xₖ − min xₖ`, `Hᵤ = max yₖ − min yₖ`.

## Step 3 — Uniform scale

`s = min(w / Wᵤ, h / Hᵤ)`.
At least one dimension is reached exactly (`w` or `h`, or both).

## Step 4 — Placement

Center the `s·Wᵤ × s·Hᵤ` box in the `w × h` box, then flip the y axis for the SVG frame (y downwards).

## Checks

| `n` | Box       | `Wᵤ × Hᵤ` | Result                      |
| --- | --------- | --------- | --------------------------- |
| 3   | 100 × 100 | √3 × 1.5  | 100 × 86.60 (width reached) |
| 4   | 100 × 50  | √2 × √2   | 50 × 50 (height reached)    |
| 6   | 100 × 100 | 2 × √3    | 100 × 86.60                 |

## Note

The fit is computed on the **sharp-cornered** polygon. A corner radius then rounds inwards: a vertex that touched the box no longer does, a flat edge that touched it still does.
