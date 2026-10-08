# CLAUDE.md — synoptic-studio

## Project

TypeScript library `editor` to create **SVG symbols** for **synoptic views**, and the tools built on it (`docs/domain/README.md`):

- **Symbol Editor**: strict numeric shapes, ports, animatable parts.
- **Configurator**: configuration trees, interfaces, property groups, business types and libraries.
- **View Editor**: places business symbols, overrides defaults, chooses pop-up lines, draws pipes and static drawings.

A library of small named functions, each backed by a verified source, composed so that they read like formulas. The playground (`playground/`) shows each stage; it is published with the docs site.

Non-negotiable principles: schematic, orthogonal, integer, documented, dependency-free.

**State**: implementation of E01 · F01 (rectangle with corner radius) is under way. The backlog (`docs/backlog/`) says what is done and what is next; implement only stories the Product Owner (the user) has set to `ready`.

## Where to read — BEFORE any task

| Need                                                 | File                                            |
| ---------------------------------------------------- | ----------------------------------------------- |
| Domain: vision, glossary, settled and open questions | `docs/domain/README.md`, then the relevant file |
| Why a choice was made                                | `docs/adr/` (index in `README.md`)              |
| How code is written                                  | `docs/conventions/` — start with `README.md`    |
| How docs are written                                 | `docs/conventions/writing.md`                   |
| What to do next, how work is split                   | `docs/backlog/README.md`, then the feature file |
| Feature audit checklist                              | `docs/conventions/audit.md`                     |
| Sources: where to look, when to stop, how to ask     | `docs/research/README.md`                       |
| Bibliography `REF-*` / derivations `DERIV-*`         | `docs/references.md`, `docs/derivations/`       |
| Tooling, dependencies, Git, CI, releases             | `docs/tooling/`                                 |

`docs/` is the documentation site (<https://alexandregallais.github.io/synoptic-studio/>): every page is linked from its folder's `README.md`.

## Golden rules

- **English everywhere**: code, comments, TSDoc, docs, commit messages. Only the glossary keeps a French column.
- **Every business rule lives in `docs/domain/`**, updated in the same change as the code. Business ambiguity → **ask the user**, never invent.
- Every structural decision → new ADR. An accepted ADR is never rewritten: it is superseded.
- Pipeline (ADR-0005): typed integers → model (integers) → evaluated geometry (floats, segments + arcs) → SVG. The SVG is an output: never read the DOM back.
- **Functional core, imperative shell** (ADR-0014): `math` → `io` are pure; `render`, `interaction`, `playground` carry the effects.
- **A function never modifies its arguments**: it takes values and returns a result.
- **One export per file, the file named in kebab-case after it** (`formatSvgNumber` → `format-svg-number.ts`, ADR-0019); a type may sit next to a function only if it is part of its signature.
- **No default nor optional parameter** in `src/` (ADR-0016): defaults belong to the model.
- **Every function**: exactly one `@kind` (`math`, `geometry`, `domain`, `format`, `procedure`), one `@see` to a **verified** source, complete and austere TSDoc. Size limits per kind (ADR-0011).
- **Never invent a reference.** A source is cited only after it was read. No readable source → derivation in `docs/derivations/` (each step citing a read source) or research request.
- Value and type imports on separate lines (`import` / `import type`), autofixed.

## Key decisions (reminder — the ADR is the source)

- **Numbers** (ADR-0003): every input is an integer; derived geometry is float and never written back into the model; `EPSILON = 1e-9`, `SVG_DECIMALS = 5` (Q10).
- **Geometry** (ADR-0001, ADR-0002): segments and circular arcs only in symbols; an arc only exists as a fillet; everything is a `<path>` except text; strokes computed by offset. Béziers only in static drawings (ADR-0018).
- Contours clockwise on screen from the top-left vertex, cyclic (Q11). Orthogonal pipes (ADR-0004). Non-destructive booleans (ADR-0006). Corner radius: local proportional reduction, requested value stored, effective value derived (ADR-0007). Instance rotation by quarter turns (ADR-0008).
- Other settled questions (Q12–Q15): `docs/domain/README.md`.

## Absolute prohibitions

- Runtime dependency (`dependencies` stays empty). Any new dev package → a row in `docs/tooling/dependencies.md` (a test checks it).
- Bézier curves and freehand **in symbols**; SVG primitives other than `svg`, `g`, `path`, `text`, `defs`; native SVG `stroke`.
- Function without `@kind` or `@see`; invented or `[unverified]` reference cited.
- `any`, `!`, `as` without `eslint-disable-next-line … -- justification`; classes; `enum`.
- Disabling an ESLint rule to make code pass. Fix the code; if the rule is wrong, tell the user (ADR if structural).
- Setting an epic or feature to `ready` without the user's agreement; merging a story pull request yourself.
- Sprints or iterations (ADR-0017).

## Feature lifecycle (ADR-0020)

1. **Research spike** (`SP`): sources, derivations and research requests for all the feature's stories, before any code (`docs/research/README.md` §8).
2. **Implementation stories** (`US`, `EN`), one pull request each.
3. **Audit** (`AUD`): mathematics re-derived and recomputed, mutation spot-checks, sources re-verified, provenance, duplicates, consistency of the whole project (`docs/conventions/audit.md`).
4. **Validation** (`VAL`): the Product Owner checks the feature's criteria.

Regression and end-to-end tests come when the applications exist, not before.

## Story lifecycle

1. Pick the next `ready` story; read its feature, the domain file, the linked ADRs and derivations; check the guardrails.
2. Branch from an up-to-date `main`: `<type>/<story-id>-<topic>` (e.g. `feat/en-005-local-radius-clamp`). Never stack a branch on another story's branch.
3. First commit: set the story `ready` if not yet (with the index tables).
4. `math` / `geometry`: **tests first** (nominal, degenerate, values computed by hand and justified in a comment); see them fail.
5. Implement in small documented functions, one per file; a high-level function = a sequence of named calls.
6. **One commit per task**, Conventional Commits, footer `Refs: <ID>.Tn` (tests are committed with their implementation: the pre-commit hook needs a compiling tree).
7. Last commit: tick the tasks and set the story `done` (story file and index tables), footer `Closes: <ID>`: merging the pull request is the Product Owner's acceptance.
8. `npm run check:all`, push, `gh pr create` (template `.github/pull_request_template.md`), wait for the CI, **stop** for review.
9. After the merge: `git switch main && git pull --prune && git branch -d <branch>`.

Tooling, CI and backlog writing may be committed directly on `main` when the user asks for it. No `develop` branch, no long-lived branch; remote `origin` = github.com/AlexandreGallais/synoptic-studio (public, rebase merges only).

## Definition of done — MANDATORY

1. `npm run fix` (Prettier then ESLint `--fix`: barrels, import paths, type imports, unused imports, blank lines).
2. `npm run check:all` **green**: Prettier, ESLint (0 warning, Markdown included), secretlint, `tsc`, Vitest with 100 % coverage of `src/`, `npm audit`, latest versions, docs and playground builds.
3. Docs up to date (`docs/domain/`, `docs/references.md`, derivations, ADRs, backlog).
4. Summary to the user: functions added with `@kind` and `@see`; backlog items touched; what was checked and how.

Never announce a task as finished without having seen `npm run check:all` pass. If it fails, say so with the output. A new test that reads files must be **mutation-checked**: make it fail on purpose once.

## Guardrails — when to stop coding

| Signal                                                                            | Action                                                        |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Business rule missing from `docs/domain/`                                         | ask the user                                                  |
| `math` / `geometry` function without verifiable source and non-trivial derivation | research request (`docs/research/requests/`)                  |
| Expected test values impossible to compute by hand                                | research request or derivation to validate                    |
| Contradiction between code, `docs/domain/` and ADRs                               | report it, decide nothing alone                               |
| Function over its kind's limits after 2 splits                                    | propose a split to the user                                   |
| Same test failing after 3 attempts                                                | stop, explain the analysis                                    |
| Need for a runtime dependency or a forbidden primitive                            | stop, propose an ADR                                          |
| Feature absent from `docs/domain/` or from the backlog                            | ask whether it is in scope                                    |
| `[unverified]` reference needed by the code                                       | verify it online (WebFetch) or derive it, or request research |

Stop format: 1. what blocks, 2. what was consulted, 3. precise question or research request, 4. options considered **without choosing one**.

Research request: fill `docs/research/requests/_template.md` and ask the user to run it in claude.ai (most capable Opus model, Research mode) — `docs/research/README.md` §6.

## Commands

| Command             | Role                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `npm run dev`       | playground on <http://localhost:5173>                                     |
| `npm run docs:dev`  | documentation site (TypeDoc API regenerated)                              |
| `npm run fix`       | Prettier + ESLint `--fix`                                                 |
| `npm run check`     | Prettier, ESLint, secretlint, `tsc`, Vitest (100 % coverage), `npm audit` |
| `npm run check:all` | `check` + latest versions + docs build + playground build (CI, pre-push)  |
| `npm run build`     | library build (`dist/`)                                                   |

## Known pitfalls

Tooling:

- **TypeScript is pinned to 6.0** (`typescript-eslint` does not support 7). **VitePress is on 2.0 alpha** (1.6 bundles a vulnerable Vite 5). Do not change either without an ADR.
- Barrels: the autofix writes `export type *` for a folder that only holds types, and never switches back to `export *` once it holds values. `barrels.test.ts` fails then: replace the line by `export *`.
- Importing from another folder = importing **the folder** (`../geometry`); the autofix corrects the path.
- `unicorn/prefer-import-meta-properties` turns `new URL(".", import.meta.url)` (trailing slash) into `import.meta.dirname` (none): build paths with `join()`.
- `noUncheckedIndexedAccess`: an index read is `T | undefined`; a fallback branch that tests cannot reach breaks the 100 % coverage. Prefer an explicit, testable fallback (see `cyclicVertex`).
- A plugin upgrade makes `eslint/config.test.ts` fail until its new rules are decided in `eslint/rules/`: intended.
- Procedure verbs: `eslint/settings/verbs.ts` (add, sorted). Per-kind limits: `eslint/settings/kinds.ts` (+ ADR).

Writing:

- Module constants: `UPPER_CASE` and documented, tests included; in `src/`, type members are documented too (TypeDoc fails otherwise).
- JSDoc description = sentences; `@param` / `@returns` = fragments without final period. `@kind` is a JSDoc 3 tag redefined by the project (`jsdoc/check-values` off, declared in `tsdoc.json`).
- Markdown: a `|` inside a table cell, even in code, must be escaped `\|`; never write double curly braces (VitePress evaluates them); front-matter values containing `: ` are quoted; templates start with `_` and are not published.
- Commit scopes are a closed list (`commitlint.config.ts`): derivations use `docs(geometry)`; body lines ≤ 100 characters.

Git and GitHub:

- When lint-staged rejects a commit, check `git status` for files left **staged** by the previous attempt before retrying.
- A tooling change that makes existing files invalid is committed together with the fix of those files.
- `main` moves on its own (release commits): rebase before pushing to `main`.
- Release pull requests merge themselves once green; a release follows every merged story and publishes the docs site and the playground. Manual publication: _Actions → Release → Run workflow_.
- release-please uses the secret `RELEASE_PLEASE_TOKEN` (**expires 2026-12-31**: remind the user in December).
- Stylelint is planned for SCSS but not installed (`braces` advisory GHSA-vfj7-8cjw-p6xm): when SCSS starts, install `stylelint`, `stylelint-config-standard-scss`, `stylelint-order`, `stylelint-config-recess-order` through a documented audit exception list (`docs/tooling/versions-and-security.md`).
