# Versions and security

## Latest versions

- `npm run deps:outdated` runs npm-check-updates with `.ncurc.cjs`: every package must be on its **latest** version, except TypeScript, limited to patch upgrades of 6.0 (ADR-0009). Any available upgrade makes the command fail.
- It runs in CI (`check:all`) and before every `git push` (`.husky/pre-push`).
- Upgrading: `npx ncu -u`, `npm install`, then `npm run check:all`. A plugin upgrade may add ESLint rules: decide them (see [lint](../conventions/lint.md)).
- Pre-releases are not proposed by npm-check-updates; VitePress 2.0 alpha is the documented exception (ADR-0009).

## Vulnerabilities

- `npm run deps:audit` (`npm audit --audit-level=low`): **any** advisory fails.
- It runs in `npm run check`, before `npm run build`, and in CI: a vulnerable dependency tree cannot be checked nor built.
- Fixing: upgrade the direct dependency; otherwise force the transitive one through `overrides` in `package.json` and document it in [dependencies](./dependencies.md#overrides).
- Install scripts of dependencies are blocked by npm unless approved (`npm install-scripts`); none is needed today.

## Packages blocked by an advisory

| Package                                                                                                  | Blocked by                                                                                                          | Since      | Decision                                                                             |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `stylelint` (+ `stylelint-config-standard-scss`, `stylelint-order`, `stylelint-config-concentric-order`) | `braces` ≤ 3.0.3, GHSA-vfj7-8cjw-p6xm (high, stack-exhaustion DoS), no patched version, pulled through `micromatch` | 2026-10-08 | not installed; waiting for a fix or for a Product Owner decision on audit exceptions |
| `markdownlint-cli2`                                                                                      | same advisory                                                                                                       | 2026-10-08 | replaced by `@eslint/markdown`                                                       |
