---
id: E07
title: Edit with precision
status: draft
---

# E07 — Edit with precision

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| For                         | symbol and view designers                                                                                |
| who                         | need fast, exact placement                                                                               |
| the solution                | selection, snapping, alignment, history and navigation                                                   |
| is a                        | the editors' interaction layer                                                                           |
| that                        | integer placement with Inkscape-like snapping                                                            |
| unlike                      | approximate mouse placement                                                                              |
| our solution                | every move lands on an integer, guides and snapping help                                                 |
| Business outcomes           | Objects are selected, moved, snapped, aligned, distributed, undone and redone; the canvas zooms and pans |
| Leading indicators          | interaction features validated in review                                                                 |
| Non-functional requirements | snapping tolerance in screen pixels; snapping priorities as in Inkscape (`REF-INKSCAPE-SNAP`)            |
| In scope                    | selector, marquee, snapping targets, align and distribute, undo / redo (Q7), zoom and pan                |
| Out of scope                | —                                                                                                        |
| Closure criteria            | the interaction scenarios of `interaction.md` are demonstrated                                           |

## Candidate features

To be turned into feature files during refinement.

| Candidate               | Benefit hypothesis                                   |
| ----------------------- | ---------------------------------------------------- |
| Selection and transform | click, shift-click, marquee, integer move and resize |
| Snapping                | grid, objects, alignment and distribution snapping   |
| Align and distribute    | alignment commands across groups                     |
| History and navigation  | undo, redo, zoom, pan                                |
