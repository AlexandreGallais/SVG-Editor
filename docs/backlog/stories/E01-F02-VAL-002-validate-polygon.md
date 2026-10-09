---
id: VAL-002
epic: E01
feature: F02
title: Validate F02 on the reference cases
status: draft
points: 2
---

# E01 · F02 · VAL-002 — Validate F02 on the reference cases

Replay every acceptance criterion of F02 in the playground and against the derivation's check table.

## Acceptance criteria

- Given the playground, when each reference case of F02 is entered, then the drawing and the effective radius match the expected values.
- Given the check table of `DERIV-regular-polygon-fit`, when each case is run, then the results match.
- Given the demo page, when the Product Owner follows its guided test, then each step is ticked or commented, and misunderstandings become backlog items (ADR-0023).
- Given the review, when the Product Owner validates, then F02 is `done`.

## Tasks

One task = one commit, referenced as `VAL-002.Tn`. This story is not merged automatically (ADR-0028).

- [ ] T1 — One test per criterion `[F02.AC1]`…`[F02.AC4]`, the playground ones in `playground/mount-playground.test.ts` (1.5 h)
- [ ] T2 — Guided test in the playground: the steps of the US-007 card, one at a time (2 h)
- [ ] T3 — Demo page in `docs/guide/` in plain language (fit in a box, inscribed circle explained) (1.5 h)
- [ ] T4 — Product Owner runs the guided test and validates; feedback recorded; feature pull request into `main` (0.5 h)
