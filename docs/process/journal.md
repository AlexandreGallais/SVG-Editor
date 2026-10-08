# Journal

What each working session dealt with, in the agent's words: requests of the Product Owner (paraphrased), decisions, where they were recorded. Newest first. Written by the agent at the end of each session or before a long pause (ADR-0024); searched with `grep` (tags written `#tag`). The full conversations stay in the local transcripts (see [agent configuration](../tooling/agent.md#searching-past-conversations)).

## 2026-10-08 — Feature branches and autonomous runs

- `#process` Autonomous runs authorized by the Product Owner: stories chain overnight on the feature branch `feature/f01-…`, each reviewed by the auditor and merged by GitHub when green (label `autonomous`); the feature pull request into `main` is merged by the Product Owner at `VAL`, after testing on local previews; one release per feature (ADR-0028). Direct auto-merge into `main` was refused by the agent's safety classifier and dropped.
- `#github` Ruleset `feature branches` created (same five checks, rebase only); branch names `feature/f01-…` allowed.
- `#backlog` Checkpoint story `CHK` in the middle of each feature (CHK-001 in F01); a Product Owner test card in every user story.
- `#process` After `RET`: fresh research on agent-built projects, playbook and starter kit.

## 2026-10-08 — Requirements and traceability

- `#github` Topics added (svg, typescript, geometry, synoptic, hmi, scada, vector-graphics, library), wiki disabled; pull requests restricted to collaborators by the owner.
- `#process` V-model functions mapped onto the repository: criteria as requirements `F01.ACn`, tests tagged with them, JUnit report attached to each release, test strategy (ADR-0027). E12 validated in principle and order by the Product Owner.
- `#process` Work-centered interview planned before the business epics.

## 2026-10-08 — Contributions, privacy, portable core, product goal

- `#github` External pull requests refused: owner setting "Collaborators only" plus the `external-prs.yml` workflow; issues triaged by the agent with `/triage`, presented to the Product Owner, untrusted data (ADR-0026).
- `#privacy` No personal information about the Product Owner in the repository; personal details removed from the docs.
- `#architecture` Core runnable in any JavaScript engine and transcribable to another language: host globals banned by lint, mathematical intent stated in TSDoc (ADR-0025).
- `#product` Goal: a product teams can trust, with summary documentation for humans; draft epic E12 "Release a product people can trust".

## 2026-10-08 — Cadences, playbook, writing rules, GitHub presentation

- `#process` The Product Owner never edits the repository: their feedback is written by the agent, quoted.
- `#process` Inspection cadence adopted: demo page and guided test at each feature, epic review and retrospective at each epic, improvement log (ADR-0023). Sections `guide/`, `process/`, `playbook/` created.
- `#backlog` F01 and E01 set `in-progress` (Product Owner's agreement); rule: in-progress at the first story.
- `#agent` Session journal and transcript search instead of a database (ADR-0024).
- `#docs` Writing rules extended: voice, word list, page skeletons, messages to the Product Owner.
- `#github` Contributing guide, code of conduct, issue forms, README; repository topics and wiki proposed to the Product Owner.
- `#term` The Product Owner calls this mode "vibe coding"; here every change is still reviewed, tested and sourced.

## 2026-10-08 — Agent environment and verification tools

- `#agent` Skills, path-scoped rules, auditor subagent, guard and session-state hooks (ADR-0021).
- `#test` fast-check properties adopted; StrykerJS tried and deferred (stryker-js issue 6210); weekly lychee link check (ADR-0022).
- `#backlog` Parent-table status drift found (four F01 stories) and now tested.

## 2026-10-08 — Feature research and audit

- `#process` Every feature opens with a research spike and closes with an audit (ADR-0020); SP-001 and AUD-001 added to F01.
- `#docs` `CLAUDE.md` reorganized; stale statements fixed.

## 2026-10-07 / 2026-10-08 — Foundations and first stories

- `#tooling` Toolchain: TypeScript 6.0, ESLint 10 with every rule decided, custom rules, Prettier, Vitest 100 % coverage, VitePress + TypeDoc, commitlint, husky, release-please with auto-merge, GitHub Pages (ADR-0009 to ADR-0019).
- `#domain` Q10–Q15 answered by the Product Owner (`SVG_DECIMALS = 5`, `EPSILON = 1e-9`, clockwise contours, Béziers in drawings only, animation remapping, configuration inheritance, sizes ≥ 0).
- `#backlog` Epics rewritten for the Symbol Editor, Configurator and View Editor; F01 split into stories.
- `#code` EN-001, US-001, EN-002, US-002, US-004, EN-003, EN-004 merged (fixed precision, rectangle contour, path data, playground, fixed scale, turning angle, fillet setback with `DERIV-fillet-setback`).
- `#github` Repository renamed synoptic-studio, Apache-2.0, `RELEASE_PLEASE_TOKEN` (expires 2026-12-31).
