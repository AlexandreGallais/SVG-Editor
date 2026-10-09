---
id: US-007
epic: E01
feature: F02
title: Choose rectangle or polygon in the playground
status: draft
points: 3
---

# E01 · F02 · US-007 — Choose rectangle or polygon in the playground

As a symbol designer, I want to choose between a rectangle and a polygon so that I see the polygon drawn with the same width, height and radius, plus its number of corners.

Kept simple on purpose (Product Owner, 2026-10-09): a selector and the fields it needs; the shape menu of the applications comes later.

## Acceptance criteria

- Given the playground, when it opens, then the rectangle of F01 is shown as before, with a shape selector set to "Rectangle".
- Given a 100 × 100 rectangle, when the selector is set to "Polygon", then a polygon is drawn in the same 100 × 100 box, and a "Corners" field appears; width, height and radius keep their values.
- Given the polygon, when the number of corners or the radius changes, then the drawing, the path data and the effective radius follow.
- Given an invalid number of corners, when it is typed, then it is refused as invalid sizes are.

## Product Owner test

Written with the story: the steps, the expected result of each, and what to look at closely.

| Step | Do  | You should see |
| ---- | --- | -------------- |

## Tasks

One task = one commit, referenced as `US-007.Tn`.

- [ ] T1 — Playground tests in happy-dom: selector, corners field, drawing, refused values (1.5 h)
- [ ] T2 — Shape selector and corners field in the playground (2 h)
- [ ] T3 — Product Owner test card (0.5 h)
