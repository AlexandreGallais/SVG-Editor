# Releases

Versions and changelog are produced from the commit history by **release-please** (`.github/workflows/release.yml`), from Conventional Commits.

1. Every push on `main` updates a release pull request (`chore(main): release x.y.z`) holding the next version in `package.json` and the new section of `CHANGELOG.md`.
2. That pull request **merges itself** (GitHub auto-merge, rebase) as soon as its CI is green: every merge on `main` produces a release: one per validated feature (its feature pull request, ADR-0028), plus tooling and documentation changes made on `main` (Product Owner choice, 2026-10-08: the version keeps the changelog, the docs site and the playground up to date). Merging it tags `vx.y.z`, publishes the GitHub release, then **publishes the documentation site and the playground** to GitHub Pages (`docs` job of `release.yml`, `https://alexandregallais.github.io/synoptic-studio/`). The site can also be published by hand: _Actions → Release → Run workflow_.
3. release-please runs with the personal access token `RELEASE_PLEASE_TOKEN` (repository secret, fine-grained: Contents, Pull requests, Issues read and write; **expires 2026-12-31**, renew it before), so the CI runs on its pull requests.
4. The first version is `0.1.0` (`initial-version`): the library stays below `1.0.0` until the Product Owner decides it is stable.

| Commits since the last release      | Next version (before 1.0.0)    | After 1.0.0 |
| ----------------------------------- | ------------------------------ | ----------- |
| only `fix`                          | patch                          | patch       |
| at least one `feat`                 | minor                          | minor       |
| `!` or `BREAKING CHANGE:`           | minor (`bump-minor-pre-major`) | major       |
| only `chore`, `ci`, `test`, `style` | no release                     | no release  |

Changelog sections: Features, Bug fixes, Performance, Refactoring, Documentation, Build and dependencies (`release-please-config.json`). Publishing to npm is not set up: the library is not published yet.
