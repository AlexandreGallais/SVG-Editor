# DERIV-regular-polygon-fit — Regular polygon fitted uniformly in a box

Used by: `docs/domain/shapes.md` §3 (Q1: uniform mode), EN-008, US-005, US-006. Sources read in SP-002 (note 0004).

## Inputs (model, integers)

`n ≥ 3` corners, width `w ≥ 0`, height `h ≥ 0`.

## Step 1 — Unit polygon

The nth roots of unity `e^(2πik/n)` form a regular polygon with n sides, every vertex on the unit circle (`REF-MATHWORLD-ROOT-OF-UNITY`). By Euler's formula `e^(ix) = cos x + i sin x` (`REF-MATHWORLD-EULER-FORMULA`), the vertex at central angle `α` is `(cos α, sin α)` (`REF-OPENSTAX-UNIT-CIRCLE`), in the mathematical frame (y upwards). Turning every vertex by the same angle `α₀` keeps them on the unit circle, `2π/n` apart:

`pₖ = (cos αₖ, sin αₖ)`, `αₖ = α₀ + 2πk / n`.

Two consecutive vertices are a chord `a = 2 sin(π/n)` apart (`REF-MATHWORLD-REGULAR-POLYGON` (2), `R = 1`).

Default orientation: **flat base** (a horizontal bottom edge). The bottom edge joins the angles `−π/2 ± π/n`: symmetric about `−π/2`, they have the same sine, hence the same y. So `α₀ = −π/2 + π/n`, and

`αₖ = −π/2 + (2k + 1) π / n`.

Consequence: `n=3` triangle pointing up, `n=4` square (not a diamond), `n=6` hexagon with flat bases.

## Step 2 — Order and starting vertex (Q11, Q18)

Increasing angles turn counter-clockwise in the mathematical frame; the picture keeps its orientation when drawn in the SVG frame (step 5), so the vertices are listed by **decreasing** angle to run clockwise on screen.

The topmost vertex has the largest sine: its angle is the closest to `π/2`. With `(2k + 1) π / n − π/2 = π/2`, i.e. `2k + 1 = n`:

- `n` odd: `k = (n − 1)/2` gives exactly `π/2`, a single topmost vertex (the apex);
- `n` even: no `k` does; `k = n/2 − 1` and `k = n/2` give `π/2 ∓ π/n`, a flat top edge; the leftmost of the two has the smaller cosine, at `π/2 + π/n` (cosine negative), i.e. `k = n/2`.

Both cases give `k = ⌊n/2⌋`. The `j`-th vertex in drawing order (`j = 0 … n−1`) has the angle

`βⱼ = −π/2 + (2⌊n/2⌋ + 1 − 2j) π / n`.

The start is chosen by its index, never by comparing floating coordinates.

The code (`unitRegularPolygon`, EN-008) hands the unit polygon over **already flipped** to the SVG frame: `(cos βⱼ, −sin βⱼ)`. Step 5 then uses the flipped ordinates `y′ = −y` (below).

## Step 3 — Unit bounding box

`Wᵤ = max xₖ − min xₖ`, `Hᵤ = max yₖ − min yₖ`.

## Step 4 — Uniform scale

`s = min(w / Wᵤ, h / Hᵤ)`.
At least one dimension is reached (`w` or `h`, or both), exactly in theory; in floating point within a rounding error relative to the box (about 1e-16 × its size: 1e-13 for a box of 1000, 0.5 for the largest safe integer). `Wᵤ` and `Hᵤ` are positive for `n ≥ 3`; a size of 0 gives `s = 0`: every vertex is the center of the box (Q15).

## Step 5 — Placement in the SVG frame

Center the `s·Wᵤ × s·Hᵤ` box in the `w × h` box and flip the y axis (y downwards):

`x = (w − s·Wᵤ) / 2 + s · (xₖ − min xₖ)`, `y = (h − s·Hᵤ) / 2 + s · (max yₖ − yₖ)`.

The highest vertex of the mathematical frame becomes the one with the smallest SVG y: the picture is unchanged, only its coordinates are.

With the flipped unit polygon of step 2 (`y′ₖ = −yₖ`, so `max yₖ − yₖ = y′ₖ − min y′ₖ`), the same placement reads `y = (h − s·Hᵤ) / 2 + s · (y′ₖ − min y′ₖ)`: no second flip. In the code, steps 3–5 are `boundingBox` and `fitInBox`, and the whole fit is `regularPolygonContour` (US-005).

## Step 6 — Maximal rounding: the incircle

At the maximal radius, every edge carries two equal fillets, clamped to meet at its middle (`DERIV-local-radius-clamp`): setback `a/2`. With the interior angle `θ = π − 2π/n`, the radius is `ρ = (a/2) · tan(θ/2)` (`DERIV-fillet-setback` step 4), and `tan(π/2 − π/n) = cot(π/n)`:

`ρ = ½ a cot(π/n)`, the inradius `r` of the polygon (`REF-MATHWORLD-REGULAR-POLYGON` (3)).

The fillet's center `D` is the point of the bisector at distance `ρ` from both edges of the corner `B` (`DERIV-fillet-setback` step 1). The incircle is tangent to every side (`REF-MATHWORLD-INCIRCLE`): its center `O` is at distance `r = ρ` from both edges, the feet `E` and `F` of its perpendiculars being the points of contact (Euclid III.18, `REF-EUCLID-III18`). The right triangles `BEO` and `BFO` share the hypotenuse `BO` and have `OE = OF`, so `BE = BF` (Euclid I.47, `REF-EUCLID-I47`); their three sides being equal, their angles at `B` are equal (Euclid I.8, `REF-EUCLID-I8`): `O` lies on the bisector. On the bisector, the distance to the edges grows with the distance to `B`, so one point only is at distance `ρ`: `O = D`. Every fillet is therefore an arc of the incircle, and the fillets meet at the middles of the edges: the rounded polygon **is** its incircle, of radius `s · cos(π/n)` once scaled (`REF-MATHWORLD-REGULAR-POLYGON` (4), `R = s`). In the code nothing is specific to polygons: `regularPolygonCorners` gives every vertex the requested radius and the clamp of F01 finds the incircle (US-006).

## Checks

| `n` | Box       | `Wᵤ × Hᵤ`         | Result                 | Vertices in drawing order (5 decimals)                                                | Maximal radius |
| --- | --------- | ----------------- | ---------------------- | ------------------------------------------------------------------------------------- | -------------- |
| 3   | 100 × 100 | √3 × 1.5          | 100 × 86.60254 (width) | (50, 6.69873), (100, 93.30127), (0, 93.30127)                                         | 28.86751       |
| 4   | 100 × 50  | √2 × √2           | 50 × 50 (height)       | (25, 0), (75, 0), (75, 50), (25, 50)                                                  | 25             |
| 5   | 100 × 100 | 1.90211 × 1.80902 | 100 × 95.10565 (width) | (50, 2.44717), (100, 38.7743), (80.9017, 97.55283), (19.0983, 97.55283), (0, 38.7743) | 42.53254       |
| 6   | 100 × 100 | 2 × √3            | 100 × 86.60254 (width) | (25, 6.69873), (75, 6.69873), (100, 50), (75, 93.30127), (25, 93.30127), (0, 50)      | 43.30127       |
| 8   | 100 × 100 | 1.84776 × 1.84776 | 100 × 100 (both)       | (29.28932, 0), (70.71068, 0), (100, 29.28932), …, (0, 29.28932)                       | 50             |

By hand: `n = 3`, `s = 100/√3 = 57.73503`, height `1.5 s = 86.60254`, top margin `(100 − 86.60254)/2 = 6.69873`; maximal radius `s cos(π/3) = 28.86751`. `n = 6`, `s = 50`, maximal radius `50 cos(π/6) = 43.30127`, a circle of diameter 86.60254.

## Note

The fit is computed on the **sharp-cornered** polygon. A corner radius then rounds inwards: a vertex that touched the box no longer does, a flat edge that touched it still does; at the maximal radius only the incircle remains (accepted by the Product Owner, 2026-10-09).
