---
id: E02
title: Combine shapes without losing their numbers
status: draft
---

# E02 — Combine shapes without losing their numbers

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                                    |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| For                         | symbol designers                                                                                           |
| who                         | need composite outlines (holes, unions, cuts)                                                              |
| the solution                | non-destructive boolean operations and the shape builder                                                   |
| is a                        | boolean nodes evaluated at each render                                                                     |
| that                        | operands stay integer and editable after the operation                                                     |
| unlike                      | destructive path operations producing fractional vertices                                                  |
| our solution                | the result is recomputed; nothing is flattened                                                             |
| Business outcomes           | Union, difference, intersection, exclusion, division and cut path work on rounded shapes and stay editable |
| Leading indicators          | operations validated in review on the reference cases                                                      |
| Non-functional requirements | exact on segments and arcs; robust predicates (ADR-0003)                                                   |
| In scope                    | the six operations of `shapes.md` §5, shape builder                                                        |
| Out of scope                | destructive flattening, corner radius on created vertices (Q9)                                             |
| Closure criteria            | each operation demonstrated on rounded operands, operands edited afterwards                                |

## Candidate features

To be turned into feature files during refinement.

| Candidate                  | Benefit hypothesis                                           |
| -------------------------- | ------------------------------------------------------------ |
| Union and difference       | the user combines two shapes and edits an operand afterwards |
| Intersection and exclusion | common and exclusive areas                                   |
| Division and cut path      | cutting a shape by another outline                           |
| Shape builder              | the user picks regions to keep                               |
