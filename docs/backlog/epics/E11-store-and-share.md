---
id: E11
title: Store and share through a local server
status: draft
---

# E11 — Store and share through a local server

| Field                       | Content                                                                     |
| --------------------------- | --------------------------------------------------------------------------- |
| For                         | every user                                                                  |
| who                         | need their work persisted and shared                                        |
| the solution                | local storage server                                                        |
| is a                        | files read and written through a local server                               |
| that                        | symbols, configurations, libraries, drawings and views reloaded identically |
| unlike                      | no persistence                                                              |
| our solution                | local first, online later                                                   |
| Business outcomes           | everything saved is reloaded identically through the local server           |
| Leading indicators          | round trip demonstrated for each kind of file                               |
| Non-functional requirements | lossless round trip of the integer model                                    |
| In scope                    | file formats, local server, import and export                               |
| Out of scope                | online service                                                              |
| Closure criteria            | every kind of file survives a save / load round trip                        |

## Candidate features

| Feature      | Status    |
| ------------ | --------- |
| File formats | to refine |
| Local server | to refine |

## Ideas for refinement

- **Import of SVG from other sources** (Product Owner, 2026-10-09): a shape far larger than a screen (over a million units) is accepted without loss of data, with a warning; the tool offers to simplify it and scale it down to a sensible size when it can (straight lines, resizable); beyond a level of complexity it is refused — synoptic views are schematic, not realistic drawings (Q20: one unit is one screen pixel).
