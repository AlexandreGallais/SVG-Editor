---
id: SP-002
epic: E01
feature: F02
title: Research for F02
status: draft
points: 2
---

# E01 · F02 · SP-002 — Research for F02

Find, read and record the sources of every story of F02 before its implementation (ADR-0020, research protocol §8).

## Acceptance criteria

- Given each story of F02, when the spike ends, then every formula, algorithm and behavior it needs has a verified `REF-*`, a `DERIV-*` or an open research request.
- Given the sources found, when the spike ends, then the stories' criteria and tasks cite them, and a research note records what was found and what remains open.
- Given the symbols of synoptic views and process diagrams, when the spike ends, then the Product Owner has a sourced proposal for the largest number of corners (Q19), and decides it.

## Questions

- Vertices of a regular polygon on its circumscribed circle, its bounding box and its apothem: a readable source for the formulas of `DERIV-regular-polygon-fit` steps 1–3.
- Placement: centering in the box and the flip to the SVG frame; starting vertex and clockwise order (Q11, Q18).
- Inkscape's Star/Polygon tool (`REF-INKSCAPE-POLYGON`, `[unverified]`): read it, record what F02 keeps and what it does not.
- Maximal radius: proof that the fillets of a regular polygon at their maximum form its inscribed circle (apothem as radius).
- Floating vertices: `Corner.point` says integer coordinates, while a polygon's vertices are derived floats (ADR-0003); does the F01 geometry hold, and with which tolerance (`EPSILON`)?
- Q19: which regular polygons appear in synoptic and process symbols (ISA-5.1, ISA-101, ISO 10628-2, IEC 60617…) and in their display; what largest n is useful, and what it costs to draw.

## Tasks

One task = one commit, referenced as `SP-002.Tn`.

- [ ] T1 — Inventory the formulas and behaviors of the stories (1 h)
- [ ] T2 — Find, read and record the sources; update or write the derivations (3 h)
- [ ] T3 — Q19: polygons used in synoptic and process symbols, proposal to the Product Owner (2 h)
- [ ] T4 — Write the research note and update the stories (1 h)
