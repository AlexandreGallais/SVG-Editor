---
id: EN-007
epic: E01
feature: F01
title: Path data with arcs
status: draft
points: 2
---

# E01 · F01 · EN-007 — Path data with arcs

Write segments and circular arcs as path data with `A` commands (radius, flags, end point).

## Acceptance criteria

- Given a quarter arc of radius 10 turning clockwise, when written, then the command is `A10 10 0 0 1 x y` with the right sweep flag.
- Given the circle of EN-006, when written, then the path closes with `Z` and every number follows EN-001.

## Tasks

One task = one commit, referenced as `EN-007.Tn`.

- [ ] T1 — Verify the arc command syntax and flags (`REF-SVG2-PATHS` §9.3.8, `REF-SVG2-IMPLNOTE`) and update `docs/references.md` (1 h)
- [ ] T2 — Write the tests of the cases above (1 h)
- [ ] T3 — Implement the arc command and the path data of a rounded contour (`format`) (2 h)

## Open points

- Blocked while `REF-SVG2-IMPLNOTE` is `[unverified]`.
