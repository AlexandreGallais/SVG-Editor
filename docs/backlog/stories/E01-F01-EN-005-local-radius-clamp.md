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

- Given a 100 × 100 square with radius 1000 on one corner and 0 elsewhere, when clamped, then the effective radius of that corner is 100.
- Given an edge of length 25 between two right corners with radius 100, when clamped, then both effective radii are 12.5.
- Given a 100 × 100 square with radius 50 on every corner, when clamped, then every effective radius is 50.
- Given aligned vertices with radius 30, when clamped, then no arc is produced.

## Tasks

One task = one commit, referenced as `EN-005.Tn`.

- [ ] T1 — Write the tests of the derivation's check table (1 h)
- [ ] T2 — Implement the factor per edge (`geometry`) (1 h)
- [ ] T3 — Implement the factor per vertex and the effective radii (`geometry`) (1.5 h)
