# Git workflow

## Branches and pull requests

- `main` is always green and protected; nothing lands on it without a pull request, except tooling and backlog work done on the owner's request.
- **One branch = one story**: `<type>/<story-id>-<topic>`, e.g. `feat/us-004-rectangle-contour`, `docs/en-002-fillet-derivation`. The type is the Conventional Commits type of the story's main change.
- **One commit = one task** of the story, with the task ID in a footer (`Refs: US-004.T2`).
- When the story's Definition of Done is met, Claude Code pushes the branch and opens a pull request (template `.github/pull_request_template.md`); the Product Owner reads it on GitHub. Merge: **rebase merge** once CI is green and the Product Owner accepts.
- No `develop` branch, no long-lived branch.
- Branch names are checked by `validate-branch-name` (pattern in `package.json`): `main`, `<type>/<kebab-case>`, plus the bots' `dependabot/…` and `release-please--…`.

## After a merge

```sh
git switch main
git pull --prune
git branch -d <story-branch>
```

The remote branch is deleted by GitHub on merge; `fetch.prune` keeps local references clean.

## Commit messages

Conventional Commits (`REF-CONVENTIONAL-COMMITS`), checked by commitlint on every commit and in CI (`commitlint.config.ts`):

```text
<type>(<scope>): <subject in imperative mood>

<body: why, wrapped at 100 columns>

<footers>
```

- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`, `style`, `revert`. They drive the version ([releases](./releases.md)).
- Scopes: one per layer (`math`, `geometry`, `model`, `routing`, `io`, `render`, `interaction`), plus `playground`, `eslint`, `docs`, `adr`, `backlog`, `ci`, `deps`, `tooling`.
- Header and body lines: 100 characters at most.
- Breaking change: `feat(model)!: …` or a `BREAKING CHANGE:` footer.

## Footers: links to the backlog and the docs

Footers are Git trailers (`Key: value`) after a blank line:

| Footer             | Meaning                                                                             | Example                                              |
| ------------------ | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `Refs:`            | task, story, feature, ADR, domain question, research request this commit relates to | `Refs: US-004.T2, ADR-0007, Q11`                     |
| `Closes:`          | story completed by this commit (last task of the branch)                            | `Closes: US-004`                                     |
| `BREAKING CHANGE:` | incompatible API change, described                                                  | `BREAKING CHANGE: polygonToPathData takes a Contour` |
| `Co-Authored-By:`  | co-author                                                                           | added on commits written by Claude Code              |

```text
feat(geometry): add fillet setback

Setback of a corner fillet, d = r / tan(θ/2), with hand-computed tests.

Refs: EN-001.T2, DERIV-local-radius-clamp
```

## Hooks (`.husky/`)

| Hook         | Runs                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged`: Prettier + ESLint `--fix` on staged TypeScript, secretlint on every staged file |
| `commit-msg` | commitlint                                                                                     |
| `pre-push`   | branch name, `npm run check`, `npm run deps:outdated`                                          |

Hooks are installed by `npm install` (`prepare` script). Bypassing them (`--no-verify`) is not allowed.
