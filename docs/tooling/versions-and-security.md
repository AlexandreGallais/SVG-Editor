# Versions and security

## Latest versions

- `npm run deps:outdated` runs npm-check-updates with `.ncurc.cjs`: every package must be on its **latest** version, except TypeScript, limited to patch upgrades of 6.0 (ADR-0009). Any available upgrade makes the command fail.
- It runs in CI (`check:all`) and before every `git push` (`.husky/pre-push`).
- Upgrading: `npx ncu -u`, `npm install`, then `npm run check:all`. A plugin upgrade may add ESLint rules: decide them (see [lint](../conventions/lint.md)).
- `npm run deps:tools` (`scripts/tool-versions.ts`) does the same for the tools outside npm: every GitHub Action of `.github/workflows/` must be on its latest major version (a tag `vN+1` fails the check), and `.nvmrc` on the latest Node.js LTS major (official release index). It runs in `check:all`, with `GITHUB_TOKEN` in CI and `gh auth token` locally. Dependabot proposes the action upgrades weekly; this check fails as soon as one is out (Product Owner, 2026-10-09: "all the tools", not only npm packages).
- Pre-releases are not proposed by npm-check-updates; VitePress 2.0 alpha is the documented exception (ADR-0009).

## Vulnerabilities

- `npm run deps:audit` (`npm audit --audit-level=low`): **any** advisory fails.
- It runs in `npm run check`, before `npm run build`, and in CI: a vulnerable dependency tree cannot be checked nor built.
- Fixing: upgrade the direct dependency; otherwise force the transitive one through `overrides` in `package.json` and document it in [dependencies](./dependencies.md#overrides).
- Install scripts of dependencies are blocked by npm unless approved (`npm install-scripts`); none is needed today.

## Packages blocked by an advisory

| Package                                                                                              | Blocked by                                                                                                          | Since      | Decision                                                                                                                                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `stylelint` (+ `stylelint-config-standard-scss`, `stylelint-order`, `stylelint-config-recess-order`) | `braces` ≤ 3.0.3, GHSA-vfj7-8cjw-p6xm (high, stack-exhaustion DoS), no patched version, pulled through `micromatch` | 2026-10-08 | not installed. Product Owner decision (2026-10-08): install it when SCSS starts, with `stylelint-order` and `stylelint-config-recess-order`, through a documented audit exception list (dev tools only, with a review date) unless `braces` is fixed by then |
| `markdownlint-cli2`                                                                                  | same advisory                                                                                                       | 2026-10-08 | replaced by `@eslint/markdown`                                                                                                                                                                                                                               |
