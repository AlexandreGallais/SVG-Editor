---
id: E05
title: Assemble synoptic views from symbols
status: draft
---

# E05 — Assemble synoptic views from symbols

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                |
| --------------------------- | ---------------------------------------------------------------------- |
| For                         | synoptic view designers                                                |
| who                         | need to compose views from validated symbols                           |
| the solution                | the View Editor                                                        |
| is a                        | instances of symbols or presets placed on a view                       |
| that                        | views are built without touching symbol geometry                       |
| unlike                      | drawing every view by hand                                             |
| our solution                | instances are positioned, rotated by quarter turns and parameterized   |
| Business outcomes           | A view with several instances, rotated and parameterized, is assembled |
| Leading indicators          | views assembled for a reference circuit                                |
| Non-functional requirements | integer positions; quarter-turn rotation around the origin (ADR-0008)  |
| In scope                    | instancing, duplication, quarter-turn rotation, parameter values       |
| Out of scope                | editing symbol geometry from a view                                    |
| Closure criteria            | a reference view assembled and re-opened identically                   |

## Candidate features

To be turned into feature files during refinement.

| Candidate           | Benefit hypothesis                          |
| ------------------- | ------------------------------------------- |
| Instances           | placing and duplicating symbols and presets |
| Rotation            | quarter-turn rotation with ports following  |
| Instance parameters | setting parameter values per instance       |
