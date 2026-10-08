# synoptic-studio

[![CI](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/ci.yml)
[![CodeQL](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/codeql.yml/badge.svg)](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/codeql.yml)
[![Links](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/links.yml/badge.svg)](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/links.yml)
[![Release](https://img.shields.io/github/v/release/AlexandreGallais/synoptic-studio)](https://github.com/AlexandreGallais/synoptic-studio/releases)
[![License](https://img.shields.io/github/license/AlexandreGallais/synoptic-studio)](./LICENSE)

Dependency-free TypeScript library to draw **SVG symbols** for synoptic views: integer, orthogonal shapes, everything as `<path>`, every function documented and backed by a source it cites.

|                   |                                                                                                                                         |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Documentation** | <https://alexandregallais.github.io/synoptic-studio/> — guide, domain, decisions, conventions, API                                      |
| **Playground**    | <https://alexandregallais.github.io/synoptic-studio/playground/> — the library at work, as of the last release                          |
| **Status**        | epic E01 "Draw symbol shapes from numbers" in progress — see the [backlog](https://alexandregallais.github.io/synoptic-studio/backlog/) |

## Why it is different

- **Integer model, exact output**: every size, radius and angle is an integer; derived geometry is computed, never stored; 5 decimals in SVG.
- **Sourced**: each function names its source (specification, paper, book) or a derivation from read sources; nothing from memory.
- **Built by an agent, reviewed by a person**: Claude Code designs and implements, the Product Owner reviews, tests and merges; the method is the [playbook](https://alexandregallais.github.io/synoptic-studio/playbook/).

## Develop

```sh
npm install
npm run dev        # playground on http://localhost:5173
npm run docs:dev   # documentation site
npm run fix        # Prettier + ESLint --fix
npm run check:all  # everything CI runs: lint, types, tests (100 % coverage), audit, docs build
npm run build      # dist/
```

[Contributing](./.github/CONTRIBUTING.md) · [Code of conduct](./.github/CODE_OF_CONDUCT.md) · [Security](./SECURITY.md) · License: Apache-2.0 ([LICENSE](./LICENSE), [NOTICE](./NOTICE)) · Rules for Claude Code: [CLAUDE.md](./CLAUDE.md)
