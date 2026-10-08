---
id: SP-001
epic: E01
feature: F01
title: Research for the remaining stories of F01
status: draft
points: 2
---

# E01 · F01 · SP-001 — Research for the remaining stories of F01

Find, read and record the sources of EN-005, EN-006, EN-007, US-003 and VAL-001 before implementing them (ADR-0020, added after F01 was refined).

## Acceptance criteria

- Given EN-005 to VAL-001, when the spike ends, then every formula and behavior they need has a verified `REF-*`, a `DERIV-*` or an open research request.
- Given the sources found, when the spike ends, then the stories' criteria and tasks cite them, and research note 0002 records what was found and what remains open.

## Questions

- EN-005: is the CSS corner-overlap factor (`REF-CSS-BR`) still stated as in `DERIV-local-radius-clamp` steps 2–3?
- EN-006: where are the tangent points (vertex ± setback along each unit edge) and the arc center of a fillet; how is a vector normalized (source for the norm)?
- EN-007: exact syntax of the SVG arc command `A` (radii, rotation, large-arc and sweep flags, end point) and the meaning of the sweep flag in the SVG frame (`REF-SVG2-PATHS` §9.3.8, `REF-SVG2-IMPLNOTE`, currently unverified); is the large-arc flag always 0 for a fillet (`|τ| < π`)?
- US-003: display of the requested and the effective radius (`docs/domain/shapes.md` §2, Q8) — any open business point?

## Tasks

One task = one commit, referenced as `SP-001.Tn`.

- [ ] T1 — Inventory the formulas and behaviors of EN-005 to VAL-001 (0.5 h)
- [ ] T2 — Find, read and record the sources; write the derivations (3 h)
- [ ] T3 — Write research note 0002 and update the stories (1 h)
