# DERIV-local-radius-clamp — Local proportional reduction of corner radii

Used by: ADR-0007. Source principle: `REF-CSS-BR` (proportional reduction factor).

## Notation

Closed contour of vertices `v₀ … vₙ₋₁` (indices modulo n).

| Symbol | Definition                                                                          |
| ------ | ----------------------------------------------------------------------------------- |
| `eᵢ`   | edge from `vᵢ` to `vᵢ₊₁`                                                            |
| `Lᵢ`   | length of `eᵢ`                                                                      |
| `τᵢ`   | turning angle at `vᵢ` (between incoming and outgoing directions), `\|τᵢ\| ∈ [0, π[` |
| `rᵢ`   | radius requested at `vᵢ`, integer ≥ 0                                               |
| `sᵢ`   | setback requested at `vᵢ`                                                           |

## Step 1 — Setback of a fillet

Angle between both edges: `θᵢ = π − |τᵢ|`.
Setback: `sᵢ = rᵢ / tan(θᵢ / 2) = rᵢ · tan(|τᵢ| / 2)` (`REF-GG-FILLET`).

Limit cases:

- `τᵢ = 0` (aligned vertices) → `sᵢ = 0`, no arc.
- `|τᵢ| → π` (very sharp spike) → `sᵢ → ∞`, always bounded by step 2.

## Step 2 — Factor per edge

Total demand on the edge: `Sᵢ = sᵢ + sᵢ₊₁`.
Factor: `fᵢ = 1` if `Sᵢ ≤ Lᵢ`, otherwise `fᵢ = Lᵢ / Sᵢ`.

## Step 3 — Factor per vertex

`gᵢ = min(fᵢ₋₁, fᵢ)` (the vertex respects both its edges).
Effective radius: `r'ᵢ = gᵢ · rᵢ`. Effective setback: `s'ᵢ = gᵢ · sᵢ` (the setback is linear in `r` at a fixed angle).

## Proof of validity

For every edge `eᵢ`:
`s'ᵢ + s'ᵢ₊₁ = gᵢ sᵢ + gᵢ₊₁ sᵢ₊₁ ≤ fᵢ sᵢ + fᵢ sᵢ₊₁ = fᵢ Sᵢ ≤ Lᵢ`
because `gᵢ ≤ fᵢ` and `gᵢ₊₁ ≤ fᵢ`. The arcs of one edge never overlap → no "anti-corner".

## Checks (test cases)

| Case                                        | Computation                                          | Expected result                                |
| ------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| Square 100, one corner at 1000, others at 0 | `τ = π/2` → `s = 1000`; `f = 100/1000` on both edges | `r' = 100`: quarter circle over the whole side |
| Edge 25, two right corners at 100           | `S = 200`, `f = 0.125`                               | `r' = 12.5` each, meeting in the middle        |
| Square 100, 4 corners at 50                 | `S = 100 = L`, `f = 1`                               | `r' = 50`: circle                              |
| Aligned vertices, `r = 30`                  | `s = 0`                                              | no arc                                         |

## Known limits

- Not maximal: when `gᵢ` is imposed by the other edge, a margin may stay unused.
- Concave contours: an arc may in theory touch a non-adjacent edge. To be detected, not corrected, in v1.
