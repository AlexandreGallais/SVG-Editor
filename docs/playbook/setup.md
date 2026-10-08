# Setting up a new project

In this order; each step points to the file to copy and the decision that justifies it.

| #   | Step                                                                                                           | Copy from this repository                                       | Why                                  |
| --- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------ |
| 1   | Repository, license, `main` only, rebase merges, branch protection                                             | `docs/tooling/ci.md` (settings)                                 | linear history, review before merge  |
| 2   | TypeScript strict, ESLint as strict as possible with every rule decided, Prettier, EditorConfig                | `tsconfig.json`, `eslint/`, `.prettierrc*`, `.editorconfig`     | ADR-0009, ADR-0010                   |
| 3   | Custom lint rules for the project's structure (one export per file, barrels, kinds, sources)                   | `eslint/plugin/`                                                | ADR-0011, ADR-0012, ADR-0019         |
| 4   | Vitest, 100 % coverage of the library, property-based tests                                                    | `vite.config.ts`, `vitest.setup.ts`                             | ADR-0022                             |
| 5   | Dependency policy: tested documentation of each package, latest versions, audit                                | `package.test.ts`, `.ncurc.cjs`, `docs/tooling/dependencies.md` | supply chain                         |
| 6   | Git hooks: lint-staged, commitlint with closed scopes and backlog footers, branch names, pre-push full check   | `.husky/`, `commitlint.config.ts`, `package.json`               | `docs/tooling/git-workflow.md`       |
| 7   | CI: full check, commits, branch, dependency review, CodeQL, weekly links                                       | `.github/workflows/`                                            | `docs/tooling/ci.md`                 |
| 8   | Releases: release-please with a token, auto-merge of release pull requests, docs and demo deployed on release  | `.github/workflows/release.yml`, `release-please-config.json`   | `docs/tooling/releases.md`           |
| 9   | Documentation site (VitePress + TypeDoc), one folder per section                                               | `docs/.vitepress/`                                              | `docs/tooling/documentation-site.md` |
| 10  | Docs skeleton: domain, ADRs, conventions, references, derivations, research, backlog, process, guide, playbook | `docs/*/README.md` and templates `_*.md`                        | this playbook                        |
| 11  | Backlog with tests: ids, statuses, parents' tables, feature frame                                              | `backlog.test.ts`, `references.test.ts`                         | ADR-0017, ADR-0020                   |
| 12  | Agent configuration: short `CLAUDE.md`, rules, skills, auditor, hooks                                          | `CLAUDE.md`, `.claude/`                                         | ADR-0021                             |
| 13  | First epic: vision, glossary, open questions answered by the Product Owner before any code                     | `docs/domain/README.md`                                         | principle 6                          |

Adapt, do not copy blindly: remove what the new project does not need (e.g. geometry kinds), and write an ADR for each difference.
