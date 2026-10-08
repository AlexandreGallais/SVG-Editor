---
paths:
  - "eslint/**"
  - "*.config.ts"
  - "*.test.ts"
  - "package.json"
  - ".github/**"
  - ".claude/**"
---

# Tooling pitfalls

- **TypeScript is pinned to 6.0** (`typescript-eslint` does not support 7); **VitePress is on 2.0 alpha** (1.6 bundles a vulnerable Vite 5). Change either only with an ADR.
- Any new dev package: a row in `docs/tooling/dependencies.md` (tested), latest version, `npm audit` clean.
- A plugin upgrade makes `eslint/config.test.ts` fail until its new rules are decided in `eslint/rules/`: intended.
- `unicorn/prefer-import-meta-properties` turns `new URL(".", import.meta.url)` into `import.meta.dirname` (no trailing slash): build paths with `join()`.
- A test that reads files is mutation-checked once: break its input on purpose and see it fail.
- A tooling change that makes existing files invalid is committed together with their fix.
- Hooks in `.claude/hooks/` run with `node` (type stripping): `node:` imports only, exported pure functions tested, side effects under `if (import.meta.main)`.
- Stylelint is planned for SCSS but not installed (`braces` advisory GHSA-vfj7-8cjw-p6xm): see `docs/tooling/versions-and-security.md`.
- The `guard-bash` hook reads every line of a shell command, heredoc bodies included: a text quoting a guarded command (a test case, a commit body) is denied. Write such text with the Edit or Write tool, or rephrase it.
