---
id: E03
title: Give shapes exact strokes and text
status: draft
---

# E03 — Give shapes exact strokes and text

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| For                         | symbol designers                                                                                          |
| who                         | need inner, centered or outer outlines and labels                                                         |
| the solution                | computed strokes and native text                                                                          |
| is a                        | strokes computed as offset paths; text as `<text>`                                                        |
| that                        | exact alignment, joins, caps and dashes                                                                   |
| unlike                      | the native SVG stroke, which cannot be aligned inside or outside                                          |
| our solution                | the outline is geometry, so it is exact and aligned                                                       |
| Business outcomes           | A shape gets an aligned stroke with joins, caps and dashes; a text is placed with integer size and anchor |
| Leading indicators          | stroke cases validated in review                                                                          |
| Non-functional requirements | exact offsets of arcs (ADR-0001); integer widths                                                          |
| In scope                    | stroke width, alignment, join, cap, dashes; text content, font, size, anchor, color                       |
| Out of scope                | text to path conversion                                                                                   |
| Closure criteria            | every property of `shapes.md` §6 and the text parameters demonstrated                                     |

## Candidate features

To be turned into feature files during refinement.

| Candidate              | Benefit hypothesis                                |
| ---------------------- | ------------------------------------------------- |
| Aligned stroke         | inner, center and outer strokes of a closed shape |
| Joins, caps and dashes | stroke details as in SVG                          |
| Text                   | placing and styling a label                       |
