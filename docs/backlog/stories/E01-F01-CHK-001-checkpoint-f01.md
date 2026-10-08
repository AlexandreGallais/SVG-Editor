---
id: CHK-001
epic: E01
feature: F01
title: Checkpoint in the middle of F01
status: ready
points: 1
---

# E01 · F01 · CHK-001 — Checkpoint in the middle of F01

Pause between the geometry and the rendering stories of F01: bring documentation and methods up to date as the project grows, before going on (ADR-0028, `/run` skill).

## Acceptance criteria

- Given the stories merged since the spike, when the checkpoint runs, then `docs/domain/`, derivations, references, conventions, `CLAUDE.md` and `.claude/rules/` describe the code as it is.
- Given the light evolvability check, when it runs, then each of its six questions has a one-line answer and anything worth acting on is in the improvement log.
- Given the user stories merged so far, when the checkpoint ends, then their Product Owner test cards are listed for the next stop.

## Tasks

One task = one commit, referenced as `CHK-001.Tn`.

- [ ] T1 — Consistency of code, docs and agent configuration; fixes (1 h)
- [ ] T2 — Light evolvability check; improvement log; test cards listed (0.5 h)

## Light evolvability check (2026-10-09)

| Question            | Answer                                                                                                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Size                | 39 modules in `src/` (geometry 18, math 11, render 4, io 3, model 3); `check:all` 23 s; no layer close to a package split                                   |
| Tools               | StrykerJS still blocked (stryker-js issue 6210 open); the auditor subagent plays the mutation role meanwhile (one real defect found per code story)         |
| Fitness functions   | layer imports and purity already linted; next candidate: a test that every exported function of `geometry` has a property test (AUD-001)                    |
| Patterns            | the same rectangle fixture is rebuilt in four test files; `CornerPoints` and `turningAngle(previous, vertex, next)` carry the same triple — improvement log |
| Agent configuration | `CLAUDE.md` + rules 179 lines; two lessons added to the library rules; guards never hit in this run                                                         |
| Process             | autonomous run working: 3 stories merged by GitHub after the auditor and the checks; each audit changed the story before merge                              |

## Product Owner test cards so far

None yet: US-003 is the first user story of this run; its card comes with it.
