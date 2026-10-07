# CLAUDE.md — SVG Editor

## Project

TypeScript library `editor` to create **SVG symbols** for **synoptic views**, and two applications built on it:

- **Symbol Editor**: draws shapes, ports, parameters.
- **View Editor**: assembles symbols, sets parameters, draws pipes.

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
- **One export per file, the file named like it** (ADR-0015); a type may sit next to a function only if it is part of its signature.
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
- Bézier curves, freehand; SVG primitives other than `svg`, `g`, `path`, `text`, `defs`; native SVG `stroke` (ADR-0001, ADR-0002).
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
5. Update the docs, summarize. Commit with Conventional Commits (`docs/tooling/git-workflow.md`) only when asked, with `Refs:` / `Closes:` footers citing the backlog items.

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
- Open domain questions blocking the first shapes: **Q10** (`SVG_DECIMALS`, `EPSILON`) and **Q11** (contour orientation, starting vertex) in `docs/domain/README.md`.

## When the repository is pushed to GitHub (not before)

The user asked to postpone release automation until after the initial commit. Then:

- Set up **release-please** (GitHub Action, by Google): it reads the Conventional Commits on `main`, opens a release pull request that bumps `package.json`'s version (SemVer: `fix` → patch, `feat` → minor, `!` / `BREAKING CHANGE` → major), writes `CHANGELOG.md`, and tags the GitHub release when merged. Alternative: `semantic-release` (fully automatic publish). Record the choice in an ADR, the package in `docs/tooling/dependencies.md`.
- Enable branch protection on `main` (CI `check:all` required).
- Branching model: `main` + short-lived work branches `<type>/<topic>` only. **No `develop` branch** (user decision).
- Commits are made by Claude Code only when asked; their messages drive the version, so types and `!` must be exact.
