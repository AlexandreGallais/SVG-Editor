---
id: EN-006
epic: E01
feature: F01
title: "Rounded contour geometry: segments and arcs"
status: draft
points: 3
---

# E01 · F01 · EN-006 — Rounded contour geometry: segments and arcs

Evaluate a contour with effective radii into a closed sequence of segments and circular arcs (ADR-0001, ADR-0005 stage 3).

## Acceptance criteria

- Given a 100 × 100 square with effective radius 50 everywhere, when evaluated, then the result is 4 quarter arcs and no segment of positive length.
- Given a 100 × 50 rectangle with effective radius 10, when evaluated, then it has 4 segments and 4 quarter arcs, tangent points 10 away from each corner.
- Given radius 0 everywhere, when evaluated, then the result is the sharp contour.

## Tasks

One task = one commit, referenced as `EN-006.Tn`.

- [ ] T1 — Write the tests of the cases above (1.5 h)
- [ ] T2 — Define the segment and arc geometry types (0.5 h)
- [ ] T3 — Implement tangent points and arc of a filleted corner (`geometry`) (2 h)
- [ ] T4 — Implement the closed sequence of segments and arcs (`geometry`) (1.5 h)
