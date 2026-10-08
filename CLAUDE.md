# CLAUDE.md — SVG Editor

## Project

TypeScript library `editor` to create **SVG symbols** for **synoptic views**, and the tools built on it (`docs/domain/README.md`):

- **Symbol Editor**: strict numeric shapes, ports, animatable parts.
- **Configurator**: configuration trees, interfaces, property groups, business types and libraries.
- **View Editor**: places business symbols, overrides defaults, chooses pop-up lines, draws pipes and static drawings.

A library of small named functions, each backed by a source, composed so that they read like formulas. A dev server (`playground/`) lets the user play with it.

Non-negotiable principles: schematic, orthogonal, integer, documented, dependency-free.

**Current phase: planning.** `src/` is empty on purpose. Write the backlog first (`docs/backlog/`); implement only stories the Product Owner (the user) has set to `ready`.

## Read BEFORE any task

| Topic                                        | File                                            |
| -------------------------------------------- | ----------------------------------------------- |
| Domain: vision, glossary, open questions     | `docs/domain/README.md`, then the relevant file |
| Architecture decisions (the "why")           | `docs/adr/`                                     |
| **Code rules** (the "how")                   | `docs/conventions/` — start with `README.md`    |
| Writing documentation                        | `docs/conventions/writing.md`                   |
| Planned work, agile method                   | `docs/backlog/README.md`                        |
| Tooling, dependencies, Git workflow          | `docs/tooling/`                                 |
| Bibliography `REF-*` / derivations `DERIV-*` | `docs/references.md`, `docs/derivations/`       |
| Where to look, when to stop, how to ask      | `docs/research/README.md`                       |

## Golden rules

- **English everywhere**: code, comments, TSDoc, docs, commit messages. Only the glossary keeps a French column.
- **Every business rule lives in `docs/domain/`**, updated in the same change as the code. Business ambiguity → **ask the user**, never invent.
- Every structural technical decision → new ADR. An accepted ADR is never rewritten: it is superseded.
- Pipeline (ADR-0005): typed integers → model (integers) → evaluated geometry (floats, segments + arcs) → SVG. The SVG is an output: never read the DOM back.
- **Functional core, imperative shell** (ADR-0014): `math` → `io` are pure; `render`, `interaction`, `playground` carry the effects.
- **A function never modifies its arguments**: it takes values and returns a result.
- **One export per file, the file named in kebab-case after it** (`formatSvgNumber` → `format-svg-number.ts`, ADR-0019); a type may sit next to a function only if it is part of its signature.
- **No default nor optional parameter** in `src/` (ADR-0016): defaults belong to the model.
- **Every function**: exactly one `@kind` (`math`, `geometry`, `domain`, `format`, `procedure`), one `@see` to a **verified** source, complete and austere TSDoc. Size limits per kind (ADR-0011).
- **Never invent a reference.** No verifiable source → derivation in `docs/derivations/` or research request.
- Value and type imports on separate lines (`import` / `import type`), autofixed.

## Key decisions (reminder — the ADR is the source)

- **Numbers** (ADR-0003): every input is an integer; derived geometry is float and never written back into the model; comparisons through a named `EPSILON`; robust orientation predicates; fixed SVG precision `SVG_DECIMALS`.
- **Geometry** (ADR-0001, ADR-0002): segments and circular arcs only; an arc only exists as a fillet (corner radius); everything is a `<path>` except text; strokes computed by offset.
- Orthogonal pipes (ADR-0004). Non-destructive booleans (ADR-0006). Corner radius: local proportional reduction, requested value stored, effective value derived (ADR-0007). Uniform regular polygon with flat base (`DERIV-regular-polygon-fit`). Instance rotation by quarter turns around the origin (ADR-0008).
- **Research**: internal first (`docs/`), then spec > paper > book > official docs > code (read only, never copied, GPL included) > blog (never alone). Every source is recorded **before** the code.

## Absolute prohibitions

- Runtime dependency (`dependencies` stays empty). Any new dev package → a row in `docs/tooling/dependencies.md` (a test checks it).
- Bézier curves and freehand **in symbols** (allowed only in static drawings, ADR-0018); SVG primitives other than `svg`, `g`, `path`, `text`, `defs`; native SVG `stroke` (ADR-0001, ADR-0002).
- Function without `@kind` or `@see`; invented or `[unverified]` reference cited.
- `any`, `!`, `as` without `eslint-disable-next-line … -- justification`; classes; `enum`.
- Disabling an ESLint rule to make code pass. Fix the code; if the rule is wrong, tell the user (ADR if structural).
- Setting an epic or feature to `ready`, or a story to `done`, without the user's agreement.
- Sprints or iterations: the backlog is iteration-free (ADR-0017).

## Definition of done — MANDATORY

1. `npm run fix` (Prettier then ESLint `--fix`: barrels, import paths, type imports, unused imports, blank lines).
2. `npm run check` **green**: Prettier, ESLint (0 warning), `tsc`, Vitest, `npm audit`.
3. Docs up to date (`docs/domain/`, `docs/references.md`, ADRs, backlog item status); `npm run docs:build` green when docs changed.
4. Summary to the user: functions added with `@kind` and `@see`; backlog items touched.

Never announce a task as finished without having seen `npm run check` pass. If it fails, say so with the output.

## Workflow

1. Pick a `ready` story; read its feature, the domain file and the linked ADRs; check the guardrails below.
2. `math` / `geometry`: **Vitest tests first** (nominal, degenerate, values computed by hand and justified in a comment).
3. Implement in small documented functions, one per file; a high-level function = a sequence of named calls.
4. `npm run fix`, then `npm run check`; tick the story's tasks.
5. Update the docs, summarize. Commit per task with Conventional Commits and `Refs:` / `Closes:` footers (`docs/tooling/git-workflow.md`), open the pull request, stop for review.

## Guardrails — when to stop coding

| Signal                                                                            | Action                                          |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| Business rule missing from `docs/domain/`                                         | ask the user                                    |
| `math` / `geometry` function without verifiable source and non-trivial derivation | research request (`docs/research/requests/`)    |
| Expected test values impossible to compute by hand                                | research request or derivation to validate      |
| Contradiction between code, `docs/domain/` and ADRs                               | report it, decide nothing alone                 |
| Function over its kind's limits after 2 splits                                    | propose a split to the user                     |
| Same test failing after 3 attempts                                                | stop, explain the analysis                      |
| Need for a runtime dependency or a forbidden primitive                            | stop, propose an ADR                            |
| Feature absent from `docs/domain/` or from the backlog                            | ask whether it is in scope                      |
| `[unverified]` reference needed by the code                                       | verify it online (WebFetch) or request research |

Stop format: 1. what blocks, 2. what was consulted, 3. precise question or research request, 4. options considered **without choosing one**.

Research request: fill `docs/research/requests/_template.md` and ask the user to run it in claude.ai (most capable Opus model, Research mode) — `docs/research/README.md` §6.

## Commands

| Command             | Role                                             |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Vite playground                                  |
| `npm run docs:dev`  | documentation site (TypeDoc API regenerated)     |
| `npm run fix`       | Prettier + ESLint `--fix`                        |
| `npm run check`     | Prettier + ESLint + `tsc` + Vitest + `npm audit` |
| `npm run check:all` | `check` + latest-version check + docs build (CI) |

## Known pitfalls (notes for Claude Code)

- **TypeScript is pinned to 6.0**: `typescript-eslint` does not support TypeScript 7. **VitePress is on 2.0 alpha**: 1.6 bundles a vulnerable Vite 5. Do not change either without an ADR.
- New file in `src/` → `npm run fix` updates the folder's `index.ts`. Importing from another folder = importing **the folder** (`../geometry`); the autofix corrects it.
- A new layer (`src/model/`…) exists only with a first module + its `index.ts`, re-exported by `src/index.ts` (barrel autofix).
- Module constants: `UPPER_CASE` and documented, tests included.
- JSDoc description = sentences; `@param` / `@returns` = fragments without final period.
- `@kind` is also a standard JSDoc 3 tag: `jsdoc/check-values` is off on purpose; the tag is declared in `tsdoc.json` for TypeDoc.
- Procedure verbs: `eslint/settings/verbs.ts`. Per-kind limits: `eslint/settings/kinds.ts` (+ ADR).
- A plugin upgrade makes `eslint/config.test.ts` fail until its new rules are decided in `eslint/rules/`: intended.
- Autofix trap: `unicorn/prefer-import-meta-properties` turns `new URL(".", import.meta.url)` (trailing slash) into `import.meta.dirname` (none). Build paths with `join()`.
- Docs pages: never write double curly braces (VitePress evaluates them); templates start with `_` and are not published.
- Settled: Q10 (`SVG_DECIMALS = 5`, `EPSILON = 1e-9`), Q11 (clockwise from the top-left vertex, cyclic contours), Q12 (Béziers in drawings only, ADR-0018), Q13 (animation remapping), Q14 (node = own + ancestors' options), Q15 (size ≥ 0).
- Stylelint is planned for SCSS but not installed: `braces` advisory GHSA-vfj7-8cjw-p6xm. When SCSS starts: install `stylelint`, `stylelint-config-standard-scss`, `stylelint-order`, `stylelint-config-recess-order`, after the audit exception list (documented, dev tools only, review date) — see `docs/tooling/versions-and-security.md`.

## Lessons from EN-001 (notes for Claude Code)

- Tests are written first, but committed **with** the implementation: the pre-commit hook lints a compiling tree only.
- When a commit is rejected by lint-staged, check `git status` for files left **staged** by a previous attempt before retrying (a staged stale file comes back after each revert).
- A tooling change that makes existing files invalid must be committed together with the fix of those files.
- After the user merges a pull request: `git switch main && git pull --prune && git branch -d <branch>`, then set the story to `done` on `main`.
- release-please uses the secret `RELEASE_PLEASE_TOKEN` (expires 2026-12-31: remind the user in December).
- Docs site: <https://alexandregallais.github.io/synoptic-studio/>, published on each release (or _Actions → Release → Run workflow_).
- `npm run test` requires 100 % coverage of `src/`.

## Branches, commits, pull requests (user decision, 2026-10-08)

- **Story work** (anything under `src/`, `playground/`, or a story's docs): one branch per story `<type>/<story-id>-<topic>` (e.g. `feat/us-004-rectangle-contour`), **one commit per task** with `Refs: US-004.T2`, last commit `Closes: US-004`. When done: `npm run check:all`, push, open a pull request on GitHub (`gh pr create`, template `.github/pull_request_template.md`), then **stop**: the user reviews and merges (rebase merge). Never merge a story branch yourself.
- **Tooling, CI and backlog writing**: may be committed directly on `main` when the user asks for it.
- No `develop` branch, no long-lived branch. Remote: `origin` = github.com/AlexandreGallais/synoptic-studio (public).
- Versions and changelog: release-please on `main` (`docs/tooling/releases.md`); commit types and `!` must therefore be exact.
- Repository settings (branch protection, rebase-only merges…) are listed in `docs/tooling/ci.md`; they need the owner's GitHub rights.
