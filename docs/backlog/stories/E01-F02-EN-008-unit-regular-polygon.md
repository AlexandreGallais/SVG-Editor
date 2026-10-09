---
id: EN-008
epic: E01
feature: F02
title: Unit regular polygon with a flat base
status: ready
points: 2
---

# E01 · F02 · EN-008 — Unit regular polygon with a flat base

The n vertices of a regular polygon on the unit circle, with a horizontal bottom edge, in the SVG frame (`DERIV-regular-polygon-fit` step 1, sources from SP-002).

## Acceptance criteria

- Given n = 4, when the unit polygon is built, then its vertices are those of a square with horizontal edges (not a diamond), within `EPSILON`.
- Given n = 3, when the unit polygon is built, then it is a triangle pointing up, its base horizontal.
- Given any n ≥ 3, when the unit polygon is built, then it has n vertices on the unit circle, equally spaced, listed clockwise on screen from the topmost vertex, the leftmost on a tie (Q11, Q18).

## Tasks

One task = one commit, referenced as `EN-008.Tn`.

- [ ] T1 — Tests: hand-computed cases n = 3, 4, 6, then properties (any n: n vertices, unit distance, equal edges, clockwise, starting vertex) (1.5 h)
- [ ] T2 — The `geometry` function and its TSDoc citing its sources (1.5 h)
