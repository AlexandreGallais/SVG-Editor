# Git workflow

## Branches

`main`, or `<type>/<kebab-case-topic>` with a Conventional Commits type: `feat/corner-radius`, `fix/barrel-order`, `docs/english-translation`.
Checked by `validate-branch-name` before every push (pattern in `package.json`).

## Commit messages

Conventional Commits (`REF-CONVENTIONAL-COMMITS`), checked by commitlint on every commit (`commitlint.config.ts`):

```
<type>(<scope>): <subject in imperative mood>

<body: why, wrapped at 100 columns>
```

- Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`, `style`, `revert`.
- Scopes: one per layer (`math`, `geometry`, `model`, `routing`, `io`, `render`, `interaction`), plus `playground`, `eslint`, `docs`, `adr`, `deps`, `tooling`.
- Header and body lines: 100 characters at most.
- Breaking change: `feat(model)!: …` or a `BREAKING CHANGE:` footer.

## Footers: links to the backlog and the docs

Footers are Git trailers (`Key: value`) after a blank line, at the end of the body:

| Footer             | Meaning                                                                                     | Example                                              |
| ------------------ | ------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `Refs:`            | items this commit relates to: backlog IDs, ADRs, domain questions, research requests        | `Refs: US-012, ADR-0007, Q11`                        |
| `Closes:`          | backlog items this commit completes (they become `done` once accepted by the Product Owner) | `Closes: EN-004`                                     |
| `BREAKING CHANGE:` | incompatible API change, with a description                                                 | `BREAKING CHANGE: polygonToPathData takes a Contour` |
| `Co-Authored-By:`  | co-author of the commit                                                                     | added on commits written by Claude Code              |

```
feat(geometry): add fillet setback

Setback of a corner fillet, d = r / tan(θ/2), with its derivation tests.

Refs: F01, DERIV-local-radius-clamp
Closes: EN-001
```

## Hooks (`.husky/`)

| Hook         | Runs                                                     |
| ------------ | -------------------------------------------------------- |
| `pre-commit` | `lint-staged`: Prettier + ESLint `--fix` on staged files |
| `commit-msg` | commitlint                                               |
| `pre-push`   | branch name, `npm run check`, `npm run deps:outdated`    |

Hooks are installed by `npm install` (`prepare` script). Bypassing them (`--no-verify`) is not allowed.
