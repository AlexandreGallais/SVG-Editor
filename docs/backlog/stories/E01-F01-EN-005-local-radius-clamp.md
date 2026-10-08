---
id: EN-005
epic: E01
feature: F01
title: Local proportional radius clamp
status: draft
points: 3
---

# E01 · F01 · EN-005 — Local proportional radius clamp

Compute the effective radius of every vertex from the requested radii (`DERIV-local-radius-clamp` steps 2 and 3, ADR-0007).

## Acceptance criteria

Sources: `DERIV-local-radius-clamp` (check table), principle of `REF-CSS-BR` §4.5, edge length by `REF-MATHWORLD-VECTOR-NORM` (SP-001).

- Given a 100 × 100 square with radius 1000 on one corner and 0 elsewhere, when clamped, then the effective radius of that corner is 100.
- Given an edge of length 25 between two right corners with radius 100, when clamped, then both effective radii are 12.5.
- Given a 100 × 100 square with radius 50 on every corner, when clamped, then every effective radius is 50.
- Given aligned vertices with radius 30, when clamped, then no setback is produced (`s = 0`).
- Given a rectangle of size 0 × 50 (Q15), when clamped, then no `NaN` appears and no setback is produced.

## Tasks

One task = one commit, referenced as `EN-005.Tn`.

- [ ] T1 — Edge length `norm` (`math`, `REF-MATHWORLD-VECTOR-NORM`) with its tests (0.5 h)
- [ ] T2 — Factor per edge (`geometry`, `DERIV-local-radius-clamp` step 2) with the tests of the check table (1 h)
- [ ] T3 — Factor per vertex and effective radii (`geometry`, step 3), properties: effective ≤ requested, setbacks of an edge ≤ its length (1.5 h)
