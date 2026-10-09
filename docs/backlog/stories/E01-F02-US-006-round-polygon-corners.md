---
id: US-006
epic: E01
feature: F02
title: Round the polygon's corners
status: ready
points: 2
---

# E01 · F02 · US-006 — Round the polygon's corners

As a symbol designer, I want one corner radius for every corner of a regular polygon so that it is rounded exactly as a rectangle is, the requested value kept.

## Acceptance criteria

- Given a hexagon in 100 × 100 with radius 1000, when it is rounded, then it is a circle of diameter 86.60254, centered in the box: the effective radius is 43.30127 (the apothem).
- Given a triangle in 100 × 100 with radius 1000, when it is rounded, then the effective radius is 28.86751, its inscribed circle, centered at (50, 64.43376) — not at the center of the box.
- Given a hexagon in 100 × 100 with radius 10, when it is rounded, then the effective radius is 10: each setback is 10 · tan(π/6) = 5.7735, two of them use 11.547 of an edge of 50.
- Given any polygon, when it is rounded, then the requested radius is kept in the model and the effective one is derived (Q8), with the F01 geometry (ADR-0007) — no clamp of its own.

## Product Owner test

None of its own: shown by US-007's card.

## Tasks

One task = one commit, referenced as `US-006.Tn`.

- [ ] T1 — Tests of the cases above, each expected value computed by hand (1 h)
- [ ] T2 — Polygon corners and effective radius in `src/model/`, sharing what the rectangle already uses; `@see` `DERIV-regular-polygon-fit` step 6 (1.5 h)
