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

All under the repository page → **Settings**.

1. **General → Pull Requests**: uncheck _Allow merge commits_ and _Allow squash merging_; keep **Allow rebase merging** only; check **Automatically delete head branches** and **Always suggest updating pull request branches**.
2. **Actions → General → Workflow permissions**: keep _Read repository contents and packages permissions_ (each workflow declares its own); check **Allow GitHub Actions to create and approve pull requests** (release-please).
3. **Pages → Build and deployment → Source**: **GitHub Actions** (the `docs` job deploys the site).
4. **Advanced Security**: enable **Dependency graph** (done), **Dependabot alerts**, **Dependabot security updates**, **Secret Protection** with **Push protection**. Code scanning: leave the CodeQL _Default setup_ **off** — the `codeql.yml` workflow is the advanced setup, both would conflict.
5. **Rules → Rulesets → New ruleset → New branch ruleset**:
   - name `main`, enforcement **Active**;
   - target branches: **Include default branch**;
   - bypass list: **Repository admin**, mode _Always_ — so that tooling and backlog commits can still go straight to `main` on request; story work always goes through a pull request;
   - rules: **Restrict deletions**, **Block force pushes**, **Require linear history**, **Require a pull request before merging** (required approvals: 0 — one cannot approve one's own pull request; allowed merge method: Rebase), **Require status checks to pass** with _Require branches to be up to date_, checks: `Format, lint, secrets, types, tests, audit, versions, docs, build`, `Commit messages (commitlint)`, `Branch name`, `Dependency review`, `Analyze` (they appear in the search box once they have run on a pull request).

Dependabot (`.github/dependabot.yml`) opens weekly update pull requests for npm packages and actions; they pass the same CI.
