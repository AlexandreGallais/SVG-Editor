---
id: US-003
epic: E01
feature: F01
title: Round the rectangle's corners in the playground
status: ready
points: 2
---

# E01 · F01 · US-003 — Round the rectangle's corners in the playground

As a symbol designer, I want to type a corner radius and see the corners rounded so that I can shape the rectangle exactly.

## Acceptance criteria

- Given a 100 × 50 rectangle, when I type radius 10, then the four corners are rounded with radius 10.
- Given a 100 × 25 rectangle, when I type radius 100, then the effective radius 12.5 is shown next to the requested 100.
- Given any radius, when I change the width, then the rounding follows, up to the requested value (Q8).

## Product Owner test

Written during the story (ADR-0028): steps in the playground, expected result of each, words explained.

## Open points

- Where no arc can exist — a rectangle of size 0, an aligned vertex — `effectiveRadii` keeps the requested radius (factor 1), so nothing would be signaled although nothing is rounded. Should the effective radius shown be 0 there? Question for the Product Owner at the next stop (EN-005 audit).

## Tasks

One task = one commit, referenced as `US-003.Tn`.

- [ ] T1 — Global requested radius in the rectangle model, its validation, the rectangle's corners and its effective radius (`domain`), tests `[F01.AC2]` (1.5 h)
- [ ] T2 — Radius input, effective radius shown next to the requested one, rounded path in the playground (`procedure`) (2 h)
- [ ] T3 — Product Owner test card; demonstrated at VAL-001 (0.5 h)
