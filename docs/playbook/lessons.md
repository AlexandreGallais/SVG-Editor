# Lessons

What went wrong in this project, and the check that now prevents it. Newest first; added at each retrospective, or as soon as a lesson is clear.

| Date       | What happened                                                                                | Now prevented by                                                           |
| ---------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 2026-10-08 | Story statuses drifted in a feature table (four stories shown `draft` after being done)      | `backlog.test.ts` checks parents' tables                                   |
| 2026-10-08 | Dates written one day off in docs                                                            | session-start state; dates read from the environment, never guessed        |
| 2026-10-08 | A mutation tool (StrykerJS) reported 4 % because, with Vitest 5, no test ran against mutants | trial before adoption; tool deferred with its tracking issue (ADR-0022)    |
| 2026-10-08 | A commit refused (unknown scope) let the next commit swallow its files                       | commit one by one, stop at the first failure; `git status` before retrying |
| 2026-10-08 | A guard hook denied text quoting a guarded command inside a heredoc                          | known false positive, documented in `.claude/rules/tooling.md`             |
| 2026-10-08 | A cited reference (Graphics Gems) could not be read                                          | derivation from read sources (`DERIV-fillet-setback`); never cite unread   |
| 2026-10-08 | A stacked pull request was merged into another story branch                                  | one branch per story from `main`, never stacked                            |
| 2026-10-08 | Release pull requests opened with `GITHUB_TOKEN` triggered no CI                             | release-please with a personal token, auto-merge when green                |
| 2026-10-08 | TypeDoc failed in CI on undocumented type members, after a green local check                 | pre-push runs `check:all`, including the docs build                        |
| 2026-10-08 | Barrel autofix kept `export type *` once a folder held values                                | `barrels.test.ts`                                                          |
| 2026-10-08 | A status test silently skipped one index                                                     | every index tested to list its items; mutation-check of file-reading tests |
| 2026-10-07 | Plausible but invented details (an author name, a "holes counter-clockwise" rule)            | sources recorded before use; business rules only from the Product Owner    |
| 2026-10-07 | Linters pulled a vulnerable transitive package (`braces`)                                    | `npm audit` blocking; alternative chosen (`@eslint/markdown`)              |
| 2026-10-07 | An autofix removed a trailing slash and broke paths                                          | paths built with `join()`; pitfall in rules                                |
