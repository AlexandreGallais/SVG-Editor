---
id: E06
title: Connect symbols with orthogonal pipes
status: draft
---

# E06 — Connect symbols with orthogonal pipes

> Draft proposed by Claude Code from `docs/domain/`, to be reviewed by the Product Owner.

| Field                       | Content                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| For                         | synoptic view designers                                                                                      |
| who                         | need readable connections between equipment                                                                  |
| the solution                | orthogonal pipes                                                                                             |
| is a                        | connectors routed automatically between ports, made of horizontal and vertical segments                      |
| that                        | pipes follow the symbols and avoid them                                                                      |
| unlike                      | manual polylines redrawn after every move                                                                    |
| our solution                | routing from the literature (`REF-WYBROW-2009`, `REF-MARRIOTT-2014`) with P&ID conventions                   |
| Business outcomes           | Pipes are created port to port, routed around symbols, follow moves and can be adjusted by dragging segments |
| Leading indicators          | pipes demonstrated on a reference view                                                                       |
| Non-functional requirements | orthogonal only (ADR-0004); routing fast enough for interactive editing                                      |
| In scope                    | automatic routing, following moves, segment dragging, rounded bends, crossing convention                     |
| Out of scope                | diagonals                                                                                                    |
| Closure criteria            | a reference circuit is connected and stays orthogonal through symbol moves                                   |

## Candidate features

To be turned into feature files during refinement.

| Candidate                   | Benefit hypothesis                       |
| --------------------------- | ---------------------------------------- |
| Port-to-port pipe           | creating a pipe between two ports        |
| Obstacle-avoiding routing   | routes go around symbols                 |
| Manual adjustment           | dragging a segment perpendicularly       |
| Rounded bends and crossings | bend radius and line-crossing convention |
