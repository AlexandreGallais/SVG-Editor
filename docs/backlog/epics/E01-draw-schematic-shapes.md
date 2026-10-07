---
id: E01
title: Draw schematic shapes from numbers
status: draft
---

# E01 — Draw schematic shapes from numbers

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| For                         | symbol designers                                                                                                    |
| who                         | need logical, reproducible shapes, not freehand drawings                                                            |
| the solution                | shape model and creation tools (rectangle, regular polygon, corner radius, node editing)                            |
| is a                        | an integer model evaluated into segments and arcs, rendered as one `<path>`                                         |
| that                        | shapes entirely described by integers, editable at any time                                                         |
| unlike                      | drawing tools based on gestures and Bézier curves                                                                   |
| our solution                | every vertex, size and radius is an integer; the drawing follows from the numbers                                   |
| Business outcomes           | A rectangle and a regular polygon with per-vertex corner radius are created, edited and rendered from integers only |
| Leading indicators          | features validated in review; open domain questions (Q10, Q11) settled                                              |
| Non-functional requirements | integer model (ADR-0003); exact geometry (segments + arcs, ADR-0001); output precision `SVG_DECIMALS`               |
| In scope                    | rectangle, regular polygon, corner radius with clamping (ADR-0007), node add / move / delete                        |
| Out of scope                | ellipses (Q4), Bézier curves, freehand, pen tool                                                                    |
| Closure criteria            | the shape examples of `shapes.md` (circle as a rounded square, polygon fits) render as specified                    |

## Candidate features

To be turned into feature files during refinement.

| Candidate                    | Benefit hypothesis                                                         |
| ---------------------------- | -------------------------------------------------------------------------- |
| Rectangle with corner radius | the user creates a rectangle and rounds its corners by typing values       |
| Regular polygon              | the user creates an n-gon fitting a box, flat base                         |
| Corner radius clamping       | any requested radius renders without overlap, the effective value is shown |
| Node editing                 | the user adds, moves and deletes vertices with integer values              |
