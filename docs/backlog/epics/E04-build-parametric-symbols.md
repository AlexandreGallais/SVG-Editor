---
id: E04
title: Build parametric symbols
status: draft
---

# E04 — Build parametric symbols

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| For                         | symbol designers                                                                                   |
| who                         | need reusable symbols whose appearance is driven by parameters                                     |
| the solution                | the Symbol Editor's symbol model                                                                   |
| is a                        | a group of shapes with ports, parameters and presets                                               |
| that                        | view designers handle business objects, not shapes                                                 |
| unlike                      | copying and editing raw graphics for each variant                                                  |
| our solution                | one symbol, many presets, parameters bound to shape properties                                     |
| Business outcomes           | A symbol with ports, typed parameters bound to its shapes, and business presets is built and saved |
| Leading indicators          | symbols built for the reference equipment (pump, valve, sensor box)                                |
| Non-functional requirements | integer ports; parameter types `color`, `number`, `text`, `boolean`, `enum`                        |
| In scope                    | shape tree, ports with exit direction, parameters and bindings, presets                            |
| Out of scope                | export format (E08)                                                                                |
| Closure criteria            | a pump symbol with two ports, a state parameter and two presets works end to end                   |

## Candidate features

To be turned into feature files during refinement.

| Candidate               | Benefit hypothesis                         |
| ----------------------- | ------------------------------------------ |
| Shape tree              | grouping, ordering, hiding, locking shapes |
| Ports                   | placing ports with an exit direction       |
| Parameters and bindings | parameters driving shape properties        |
| Presets                 | business names for parameter sets          |
