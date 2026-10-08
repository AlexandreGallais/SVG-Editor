---
id: VAL-001
epic: E01
feature: F01
title: Validate F01 on the reference cases
status: draft
points: 2
---

# E01 · F01 · VAL-001 — Validate F01 on the reference cases

Replay every acceptance criterion of F01 in the playground and against the derivation's check table.

## Acceptance criteria

- Given the playground, when each reference case of F01 is entered, then the drawing and the effective radius match the expected values.
- Given the check table of `DERIV-local-radius-clamp`, when each case is run, then the results match.
- Given the demo page, when the Product Owner follows its guided test, then each step is ticked or commented, and misunderstandings become backlog items (ADR-0023).
- Given the review, when the Product Owner validates, then F01 is `done`.

## Tasks

One task = one commit, referenced as `VAL-001.Tn`.

- [ ] T1 — Replay the reference cases and record the results in the feature file (1 h)
- [ ] T2 — Demo page `docs/guide/` in plain language (fillet, setback, clamp explained) with its guided test (2 h)
- [ ] T3 — Product Owner runs the guided test and validates; feedback recorded (0.5 h)
