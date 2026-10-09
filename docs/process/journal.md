# Journal

What each working session dealt with, in the agent's words: requests of the Product Owner (paraphrased), decisions, where they were recorded. Newest first. Written by the agent at the end of each session or before a long pause (ADR-0024); searched with `grep` (tags written `#tag`). The full conversations stay in the local transcripts (see [agent configuration](../tooling/agent.md#searching-past-conversations)).

## 2026-10-09 — Autonomous run of F02: refinement first

- `#run` The Product Owner started the run with `/run F02`. F02 is still `draft` without stories: the run opens with its refinement interview, then the research spike; no code before the Product Owner sets the stories `ready`.
- `#backlog` Refinement: Q18 settled, Q19 open (SP-002), eight stories. The Product Owner relaunched `/run F02` right after being asked to agree: F02 set `in-progress`, its stories `ready`.
- `#run` Feature branch `feature/f02-regular-polygon`. SP-002 done up to its last criterion (#43, not labeled): derivation completed, eight sources read, auditor found no correctness error and eight accuracy points, fixed. Stop: Q19 (largest number of corners) is the Product Owner's decision; the symbol standards are paid, request 0004 is optional.
- `#tooling` The Product Owner asked that every tool be on its latest version, not only npm packages: `npm run deps:tools` (`scripts/tool-versions.ts`) in `check:all` fails when a GitHub Action has a newer major or `.nvmrc` is behind the latest Node.js LTS; made to fail on purpose once (Node 22, checkout v6).
- `#tooling` Before the run: `eslint-plugin-jsdoc` 65.2.2 (a patch had turned `check:all` red); the feature branch pattern is written `feature/f<nn>-<topic>` in `CLAUDE.md`, the skills and the Git workflow (ADR-0028 keeps its F01 example).

## 2026-10-09 — F01 validated, merged and released

- `#validation` The Product Owner ran the nine-step guided test in the local playground over two sessions: every step understood as intended (« tout a l'air parfait pour moi »). Q16 settled (a spike is consumed by its fillet), Q17 settled (the radius stays where nothing is rounded).
- `#release` Feature pull request #38 (from the `VAL` branch, holding the whole feature) merged by the Product Owner; release v0.7.0 with its test report; docs site and playground published.
- `#cleanup` All story and feature branches deleted (auto-merges had left the story branches on GitHub); only `main` remains.
- `#process` Learned for the next features: guided test inside the playground, a playground test for the criteria only it can show, one feature pull request from the `VAL` branch, branches deleted through the API (no hook run), `/run` without argument takes the feature in progress.
- `#remarks` For later: radius per vertex by clicking a vertex (F03), browser SVG measurements (E12), specialized expert agents (E01 retrospective).

## 2026-10-09 — Autonomous run of F01: stopped at VAL-001

- `#run` Seven stories merged into `feature/f01-rectangle-with-corner-radius` by GitHub after the auditor and the checks: SP-001 (#30), EN-005 (#31), EN-006 (#32), CHK-001 (#33), EN-007 (#34), US-003 (#35), AUD-001 (#36). Stop: the next story is VAL-001, with the Product Owner.
- `#audit` Every story review found real gaps before merge: a signed-zero half turn in `turningAngle`, a radius never read by the playground, a wrong step in the test card, an untested part of F01.AC3, a test 1000 times too loose. Feature audit: 22 of 24 mutants caught, 2 equivalent.
- `#domain` Open questions raised for the Product Owner: Q16 (spike consumed by its fillet), Q17 (effective radius shown where nothing can be rounded).
- `#process` The Product Owner asked to wait for CI by reading its statuses, failing fast, with a time limit: `/run` and `/story` updated. The AUD-001 pull request had to be recreated (its creation was interrupted) and failed on a happy-dom patch published overnight.

## 2026-10-08 — Autonomous run of F01

- `#run` The Product Owner started the run with `/run FO1` (read as F01, the only feature in progress). Scope: SP-001, EN-005, EN-006, CHK-001, EN-007, US-003, AUD-001; stop at VAL-001. Feature branch `feature/f01-rectangle-with-corner-radius`. No open issue.

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
