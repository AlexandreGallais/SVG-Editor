# Continuous integration

GitHub Actions, on every pull request and on `main`. A pull request can be merged only when every check is green (branch protection of `main`).

| Workflow      | Job            | Checks                                                                                                                                                                                                                    |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`      | quality        | `npm run check:all`: Prettier, ESLint (0 warning), secretlint, `tsc`, Vitest (library, custom rules, ESLint audit, dependency and backlog tests), `npm audit`, latest versions, documentation build; then `npm run build` |
| `ci.yml`      | commits        | commitlint on every commit of the pull request                                                                                                                                                                            |
| `ci.yml`      | branch         | branch name (`validate-branch-name`)                                                                                                                                                                                      |
| `ci.yml`      | dependencies   | GitHub dependency review: a new vulnerable dependency fails                                                                                                                                                               |
| `codeql.yml`  | analyze        | CodeQL security and quality queries on the TypeScript code (also weekly)                                                                                                                                                  |
| `release.yml` | release-please | on `main` only: versioning and changelog ([releases](./releases.md))                                                                                                                                                      |

Secrets are checked three times: `secretlint` on staged files before each commit, `secretlint` in CI, and GitHub's secret scanning with push protection (repository setting).

Code hygiene beyond lint is covered by ESLint rules: no `console`, no `debugger`, no `TODO`/`FIXME` comments, no unused code, no disabled rule without justification (see [lint](../conventions/lint.md)).

## Repository settings (done once, by the owner)

| Setting                            | Value                                                                                                                                                            |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch protection on `main`        | require a pull request; require status checks `quality`, `commits`, `branch`, `dependencies`, `analyze`; require branches up to date; no force push; no deletion |
| Merge methods                      | **rebase merge only**: the story's commits (one per task) land on `main` as they are, so the changelog lists them                                                |
| Automatically delete head branches | on                                                                                                                                                               |
| Actions → workflow permissions     | allow GitHub Actions to create pull requests (release-please)                                                                                                    |
| Code security                      | Dependabot alerts and security updates, secret scanning, push protection, CodeQL (default or this workflow)                                                      |

Dependabot (`.github/dependabot.yml`) opens weekly update pull requests for npm packages and actions; they pass the same CI.
