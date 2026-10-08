---
id: US-003
epic: E01
feature: F01
title: Round the rectangle's corners in the playground
status: draft
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

- A rectangle of size 0 has no corner to round: no arc is drawn and the effective radius equals the requested one, so nothing is signaled. To confirm with the Product Owner at the next stop.

## Tasks

One task = one commit, referenced as `US-003.Tn`.

- [ ] T1 — Add the global radius to the rectangle model (`domain`) (1 h)
- [ ] T2 — Wire the radius input and the effective radius display in the playground (2 h)
- [ ] T3 — Demonstrate the criteria to the Product Owner (0.5 h)
