---
id: AUD-002
epic: E01
feature: F02
title: "Audit F02: regular polygon with corner radius"
status: in-progress
points: 3
---

# E01 · F02 · AUD-002 — Audit F02: regular polygon with corner radius

Full check of F02 in depth and of the project in breadth, following [audit.md](../../conventions/audit.md) (ADR-0020), with the `/audit` skill.

## Acceptance criteria

- Given the functions of F02, when audited, then every formula is re-derived, every expected value recomputed by hand, and each function survives a mutation spot-check.
- Given the sources, when audited, then every `@see` of F02 is re-verified online and dated.
- Given the project, when audited, then no duplicate, no copied code and no inconsistency between code, domain, ADRs and docs remains unrecorded.

## Tasks

One task = one commit, referenced as `AUD-002.Tn`.

- [ ] T1 — A. Independent review by the `auditor` subagent; mathematics, mutation spot-checks, missing properties (3 h)
- [ ] T2 — B. Sources re-verified (1 h)
- [ ] T3 — C, D, E. Provenance, duplicates, consistency (2 h)
- [ ] T4 — F, G. Quality gates and research list for the next feature; findings table (1 h)

## Findings

| Check | Result | Evidence | Action |
| ----- | ------ | -------- | ------ |

## G. Next feature (F03, per-vertex radius and node editing)

Sources and questions for its spike:

- Per-vertex radius: `REF-FIGMA-CR` (verified) for the behavior; the clamp of F01 already works per vertex (`Corner`); the `Math.max`/`Math.min` mutant of `effectiveCornerRadius` stops being equivalent — the interface needs one effective radius per vertex.
- Node editing (select, move by integers, add on an edge, delete): Inkscape's node tool and Figma's vector editing as functional references, to read (no row yet); projecting a click onto an edge (closest point on a segment) needs a source.
- Concave contours: the known limit of the clamp (an arc touching a non-adjacent edge, `shapes.md` §2) becomes reachable — segment–arc and arc–arc intersection (`REF-SCHNEIDER-EBERLY`, `REF-BOURKE-CIRCLES`, both to verify).
- Business questions: can a regular polygon's vertices be edited (it would stop being regular: convert it to a free contour?); does a moved vertex keep its radius; what does deleting a vertex down to two do.
- Large boxes: the absolute `EPSILON` of `hasLength` leaves tiny segments on boxes of millions of units (improvement log) — a size range or a relative tolerance, for the Product Owner.

## H. Light evolvability check (2026-10-09)

| Question            | Answer                                                                                                                                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size                | 53 modules in `src/` (geometry 21, math 11, model 11, io 6, render 4); 306 tests in 4.8 s; `check:all` about 28 s; no layer close to a package split                                                                        |
| Tools               | StrykerJS still blocked (issue 6210 open): mutations by hand, 10 for 10 caught in this audit; `knip` waits for the retrospective; `deps:tools` added at the Product Owner's request                                         |
| Fitness functions   | every new `geometry` function has a property test; still a candidate automatic check (improvement log)                                                                                                                      |
| Patterns            | duplicated size rule removed (`isModelSize`); test helpers (`expectPoints`, signed area) logged; `regularPolygonCorners` mirrors `rectangleCorners` — fine for two shapes, a shared "corners of a shape" when a third comes |
| Agent configuration | `CLAUDE.md` + rules 185 lines; one library rule added (visibility in the playground); `/run` orders the review before `done`                                                                                                |
| Process             | 6 stories merged by the run; every review changed its story; one real bug caught only by review (hidden field), which happy-dom could not see before the head was loaded — real-browser tests remain an E12 item            |
