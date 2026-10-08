# Contributing

Thank you for your interest. This project is built in an unusual way: a coding agent (Claude Code) designs and implements every change, and the Product Owner reviews, tests and merges. How it works is documented on the [site](https://alexandregallais.github.io/synoptic-studio/): [playbook](https://alexandregallais.github.io/synoptic-studio/playbook/), [backlog](https://alexandregallais.github.io/synoptic-studio/backlog/), [conventions](https://alexandregallais.github.io/synoptic-studio/conventions/).

## Ways to help

- **Report a bug** or **propose an idea** with the issue forms; ideas are triaged into the backlog by the Product Owner.
- **Point to a source**: every function cites a verified reference; a better or corrected source is a welcome issue.
- **Security**: never in a public issue — see [SECURITY.md](../SECURITY.md).

## Pull requests

External pull requests are read, but changes are usually re-done through the backlog so that each one has its story, its sources and its tests. If you open one anyway:

1. One branch per change, named `<type>/<topic>` (`feat/rounded-corners`).
2. Conventional Commits, checked by commitlint.
3. `npm run check:all` green: Prettier, ESLint with zero warning, `tsc`, Vitest with 100 % coverage, `npm audit`, docs build.
4. No runtime dependency; every development dependency justified in `docs/tooling/dependencies.md`.

By contributing, you agree that your work is licensed under the [Apache License 2.0](../LICENSE) and that you follow the [code of conduct](./CODE_OF_CONDUCT.md).
