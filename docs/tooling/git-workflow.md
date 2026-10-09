# Git workflow

## Branches and pull requests

- `main` is always green and protected; nothing lands on it without a pull request, except tooling and backlog work done on the owner's request.
- **One branch = one feature** (ADR-0028): `feature/f<nn>-<topic>`, created from `main` when the feature starts, merged into `main` by the Product Owner at the feature's validation, then deleted. It is the only branch that outlives a story.
- **One branch = one story**: `<type>/<story-id>-<topic>`, e.g. `feat/us-004-rectangle-contour`, `docs/en-002-fillet-derivation`, created from the up-to-date feature branch. The type is the Conventional Commits type of the story's main change.
- **One commit = one task** of the story, with the task ID in a footer (`Refs: US-004.T2`).
- When the story's Definition of Done is met, Claude Code pushes the branch and opens a pull request **into the feature branch** (template `.github/pull_request_template.md`). Merge: **rebase merge** once CI is green — by the Product Owner, or, in an authorized autonomous run, by GitHub itself: the pull request carries the label `autonomous` and `story-automerge.yml` enables auto-merge (ADR-0028).
- At the feature's validation (`VAL`), Claude Code rebases the feature branch on `main`, does the validation work on a `VAL` branch made from it, and opens **one feature pull request** from that branch into `main` (it holds the whole feature and its validation); the Product Owner merges it (rebase: every task commit reaches `main`). Nothing reaches `main` without the Product Owner.
- No `develop` branch; no long-lived branch other than the current feature's.
- Branch names are checked by `validate-branch-name` (pattern in `package.json`): `main`, `feature/f<nn>-<kebab-case>`, `<type>/<kebab-case>`, plus the bots' `dependabot/…` and `release-please--…`.

## After a merge

```sh
git switch feature/f<nn>-<topic>   # or main, after the feature pull request
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
| `pre-push`   | branch name, `npm run check:all` (check, latest versions, docs build)                          |

Hooks are installed by `npm install` (`prepare` script). Bypassing them (`--no-verify`) is not allowed.
