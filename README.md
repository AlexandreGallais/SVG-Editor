# synoptic-studio

[![CI](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/ci.yml/badge.svg)](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/ci.yml)
[![CodeQL](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/codeql.yml/badge.svg)](https://github.com/AlexandreGallais/synoptic-studio/actions/workflows/codeql.yml)
[![Release](https://img.shields.io/github/v/release/AlexandreGallais/synoptic-studio)](https://github.com/AlexandreGallais/synoptic-studio/releases)

Dependency-free TypeScript library to draw **SVG symbols** for synoptic views: integer, orthogonal shapes, everything as `<path>`, every function documented and backed by a source.

**Documentation site: <https://alexandregallais.github.io/synoptic-studio/>** — domain, decisions, conventions, backlog and API reference.

```sh
npm install
npm run dev        # playground on http://localhost:5173
npm run docs:dev   # documentation site
npm run fix        # Prettier + ESLint --fix
npm run check      # Prettier, ESLint, secrets, tsc, Vitest (100 % coverage), npm audit
npm run build      # dist/
```

Rules for Claude Code: `CLAUDE.md`. Security: `SECURITY.md`. License: Apache-2.0 (`LICENSE`, `NOTICE`).
