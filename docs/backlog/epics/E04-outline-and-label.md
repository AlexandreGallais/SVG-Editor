---
id: E04
title: Give shapes exact strokes and labels
status: draft
---

# E04 — Give shapes exact strokes and labels

| Field                       | Content                                                                         |
| --------------------------- | ------------------------------------------------------------------------------- |
| For                         | symbol designers                                                                |
| who                         | need aligned outlines and texts                                                 |
| the solution                | computed strokes and text                                                       |
| is a                        | strokes computed as offset paths; native `<text>`                               |
| that                        | inner, centered or outer strokes, exact joins, caps and dashes                  |
| unlike                      | the native SVG stroke                                                           |
| our solution                | the outline is geometry, so it is exact                                         |
| Business outcomes           | aligned strokes with joins, caps and dashes; texts with integer size and anchor |
| Leading indicators          | stroke cases accepted                                                           |
| Non-functional requirements | exact offsets of arcs (ADR-0001)                                                |
| In scope                    | stroke width, alignment, join, cap, dashes; text                                |
| Out of scope                | text to path conversion                                                         |
| Closure criteria            | every property of `shapes.md` §6 demonstrated                                   |

## Candidate features

| Feature                | Status    |
| ---------------------- | --------- |
| Aligned stroke         | to refine |
| Joins, caps and dashes | to refine |
