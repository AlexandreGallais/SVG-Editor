# Releases

Versions and changelog are produced from the commit history by **release-please** (`.github/workflows/release.yml`), from Conventional Commits.

1. Every push on `main` updates a release pull request (`chore(main): release x.y.z`) holding the next version in `package.json` and the new section of `CHANGELOG.md`.
2. Merging that pull request tags `vx.y.z` and publishes the GitHub release.

| Commits since the last release      | Next version (before 1.0.0)    | After 1.0.0 |
| ----------------------------------- | ------------------------------ | ----------- |
| only `fix`                          | patch                          | patch       |
| at least one `feat`                 | minor                          | minor       |
| `!` or `BREAKING CHANGE:`           | minor (`bump-minor-pre-major`) | major       |
| only `chore`, `ci`, `test`, `style` | no release                     | no release  |

Changelog sections: Features, Bug fixes, Performance, Refactoring, Documentation, Build and dependencies (`release-please-config.json`). Publishing to npm is not set up: the library is not published yet.
