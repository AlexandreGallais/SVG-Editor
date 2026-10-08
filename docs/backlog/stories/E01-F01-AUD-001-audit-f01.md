---
id: AUD-001
epic: E01
feature: F01
title: "Audit F01: rectangle with corner radius"
status: draft
points: 3
---

# E01 · F01 · AUD-001 — Audit F01: rectangle with corner radius

Full check of F01 in depth and of the project in breadth, following [audit.md](../../conventions/audit.md) (ADR-0020), with the `/audit` skill.

## Acceptance criteria

- Given the functions of F01, when audited, then every formula is re-derived, every expected value recomputed by hand, and each function survives a mutation spot-check.
- Given the sources, when audited, then every `@see` of F01 is re-verified online and dated.
- Given the project, when audited, then no duplicate, no copied code and no inconsistency between code, domain, ADRs and docs remains unrecorded.

## Notes

- F01 functions merged before ADR-0022 have no properties yet: `subtract`, `dot`, `perpDot`, `turningAngle`, `turningAngles`, `cyclicVertex`, `filletSetback`, `formatSvgNumber`, `contourToPathData`, `rectangleContour`, `isValidRectangle`. T1 adds them where an invariant can be stated.
- Found while preparing the audit (2026-10-08): the F01 story table showed EN-001, US-001, EN-002, US-002 as `draft` although done; fixed, and `backlog.test.ts` now checks parents' tables.

## Tasks

One task = one commit, referenced as `AUD-001.Tn`.

- [ ] T1 — A. Independent review by the `auditor` subagent; mathematics, mutation spot-checks, missing properties (3 h)
- [ ] T2 — B. Sources re-verified (1 h)
- [ ] T3 — C, D, E. Provenance, duplicates, consistency (2 h)
- [ ] T4 — F, G. Quality gates and research list for the next feature; findings table (1 h)

## Findings

| Check | Result | Evidence | Action |
| ----- | ------ | -------- | ------ |
