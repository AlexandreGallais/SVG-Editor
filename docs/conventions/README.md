# Code conventions

Technical rules of the project: **how** code is written. The business **what** lives in [domain](../domain/), the **why** of choices in [ADRs](../adr/).

Almost everything here is **checked by ESLint** (`eslint/`). When a rule is automatic, the page names the rule: when in doubt, the configuration wins.

| Page                                   | Content                                                                                   |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| [architecture.md](./architecture.md)   | layers, functional core / imperative shell                                                |
| [files.md](./files.md)                 | one export per file, file names, folders                                                  |
| [functions.md](./functions.md)         | `@kind`, size limits, immutability, explicit inputs, long procedures                      |
| [naming.md](./naming.md)               | casing, constants, booleans, names per kind                                               |
| [imports.md](./imports.md)             | `index.ts` per folder, canonical paths, `import type`, cycles, boundaries                 |
| [documentation.md](./documentation.md) | mandatory TSDoc, tag order, `@see` and references                                         |
| [typescript.md](./typescript.md)       | compiler options, TypeScript / ESLint split                                               |
| [formatting.md](./formatting.md)       | EditorConfig, Prettier, blank lines, format on save                                       |
| [lint.md](./lint.md)                   | layout of `eslint/`, adding or changing a rule, custom rules                              |
| [testing.md](./testing.md)             | Vitest, hand-computed expected values                                                     |
| [writing.md](./writing.md)             | how documentation is written: page types, austere API reference, style                    |
| [audit.md](./audit.md)                 | checklist of the feature audit: mathematics, sources, provenance, duplicates, consistency |

## Language

**English everywhere**: code, comments, TSDoc, commit messages, documentation, lint messages. The only French left is the glossary's French column (the user's working vocabulary).

## Definition of done

A task is finished only when, in order:

1. `npm run fix` has been run (Prettier then ESLint `--fix`);
2. `npm run check:all` is **green** (Prettier, ESLint with zero warnings — Markdown included, secretlint, `tsc`, Vitest with 100 % coverage of `src/`, `npm audit`, latest versions, docs and playground builds);
3. the touched documentation is up to date (`docs/domain/`, `docs/references.md`, ADRs);
4. the summary given to the user lists the added functions with their `@kind` and `@see`.
