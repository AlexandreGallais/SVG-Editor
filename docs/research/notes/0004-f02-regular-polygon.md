# Note 0004 — Sources of F02, regular polygon with corner radius

**Date**: 2026-10-09 — research spike SP-002, done by Claude Code (WebFetch, WebSearch), during the autonomous run of F02.
**Resulting documents**: `DERIV-regular-polygon-fit` completed (steps 2, 5, 6); six references read or added; request 0004 (optional); EN-008, US-005, US-006 updated.

## Per story

| Story  | Found                                                                                                                                 | Source                                                                                                                   |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| EN-008 | the nth roots of unity are the vertices of a regular n-gon on the unit circle; a vertex at angle `α` is `(cos α, sin α)`              | `REF-MATHWORLD-ROOT-OF-UNITY`, `REF-MATHWORLD-EULER-FORMULA`, `REF-OPENSTAX-UNIT-CIRCLE`                                 |
| EN-008 | flat base, decreasing angles for clockwise on screen, starting vertex by its index `⌊n/2⌋` (no float comparison)                      | derived: `DERIV-regular-polygon-fit` steps 1–2 (Q11, Q18)                                                                |
| US-005 | unit bounding box, uniform scale, centering and y flip; a size of 0 collapses to the center                                           | `DERIV-regular-polygon-fit` steps 3–5                                                                                    |
| US-006 | at the maximal radius each fillet is an arc of the incircle, radius `½ a cot(π/n) = R cos(π/n)`                                       | `DERIV-regular-polygon-fit` step 6, `REF-MATHWORLD-REGULAR-POLYGON` (3), (4), `REF-MATHWORLD-INCIRCLE`, `REF-EUCLID-IV4` |
| US-006 | the F01 clamp and fillet need no change: they already work on any point, the polygon's vertices are derived and fractional (ADR-0003) | `src/geometry/` (read); `Corner.point` TSDoc still says "integer coordinates": to correct                                |
| US-007 | Inkscape's tool: a polygon mode with a "Corners" field; its rounding uses curves and is not kept (ADR-0001)                           | `REF-INKSCAPE-POLYGON` (now verified)                                                                                    |

## Q19 — largest number of corners

What could be read:

- the ISA itself states that the diamond — a square standing on a vertex — has been an ISA-5.1 symbol since 2009, for safety instrumented systems (`REF-ISA-INTECH-2019`);
- search summaries, not readings (pages refused): circle, square, circle in a square and hexagon (computer function) in ISA-5.1, triangles in valve symbols;
- the symbol standards themselves (ISA-5.1, ISO 10628-2, ISO 14617, IEC 60617) and ISA-101 are paid: not read, not cited.

What it costs: one segment and one arc per corner in the path data, about 50 characters each with 5 decimals; 100 corners make about 5 kB. The limit is a matter of usefulness, not of performance.

Findings for the Product Owner:

- no source shows a symbol polygon with more than 6 sides; 8 (octagon) is a margin;
- the diamond is needed, but it is a square standing on a vertex: F02 always draws a flat base, so the diamond comes with rotation (F04), or with an orientation option not planned;
- request 0004 holds the precise question if a normative confirmation is wanted.

## Remaining open

- Q19, the Product Owner's decision.
