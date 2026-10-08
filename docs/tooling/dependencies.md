# Dependencies

## Policy

- **Zero runtime dependency**: `dependencies` stays empty; the published library has no `import` of any package (`import-x/no-extraneous-dependencies` in `src/`).
- Every development package is pinned to an **exact version** (`npm install -D --save-exact`).
- Every package has **one row below** stating why it is needed and why this one rather than an alternative. The test `package.test.ts` fails when a package of `package.json` has no row here, or when a row names a package that is not installed.
- Adding a package: search alternatives (official docs, maintenance date, weekly use, license), check `npm audit`, add the row **in the same change**, mention it in the commit (`build(deps): …`). A package bringing a structural choice also gets an ADR.
- Removing a package: remove its row.

## Packages

### Language and build

| Package       | Why                                                                                             | Alternatives rejected             |
| ------------- | ----------------------------------------------------------------------------------------------- | --------------------------------- |
| `typescript`  | compiler and type checker; pinned to 6.0 because `typescript-eslint` requires `<6.1` (ADR-0009) | TypeScript 7: no typed lint yet   |
| `@types/node` | Node.js types for the tooling (ESLint plugin, configuration files)                              | —                                 |
| `vite`        | development server of the playground and library build (user requirement)                       | —                                 |
| `vitest`      | tests, sharing Vite's configuration and transforms                                              | Jest: separate transform pipeline |

### Lint

| Package                          | Why                                                                                                                                          | Alternatives rejected                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `eslint`                         | the linter; every rule decided explicitly (ADR-0010)                                                                                         | —                                                                                                          |
| `@eslint/js`                     | lists the live core rules for the completeness audit (`eslint/config.test.ts`)                                                               | deprecated `builtinRules` API                                                                              |
| `typescript-eslint`              | TypeScript parser and type-aware rules                                                                                                       | —                                                                                                          |
| `@typescript-eslint/utils`       | typed helpers to write the custom `local/*` rules                                                                                            | untyped `Rule.RuleModule`                                                                                  |
| `@typescript-eslint/rule-tester` | tests of the custom rules with Vitest                                                                                                        | ESLint's untyped RuleTester                                                                                |
| `jiti`                           | loads `eslint.config.ts`, the method documented by ESLint (`REF-ESLINT-TS-CONFIG`)                                                           | experimental native flag                                                                                   |
| `eslint-plugin-jsdoc`            | mandatory, well-formed TSDoc                                                                                                                 | —                                                                                                          |
| `eslint-plugin-import-x`         | cycles, layer boundaries, import order and resolution                                                                                        | `eslint-plugin-import`: slower, less maintained; a home-made cycle checker: re-inventing a maintained tool |
| `eslint-plugin-unused-imports`   | **removes** unused imports on save (core and typescript-eslint only report)                                                                  | —                                                                                                          |
| `eslint-plugin-functional`       | immutability and no classes: "a function never modifies its arguments" (ADR-0014)                                                            | —                                                                                                          |
| `eslint-plugin-unicorn`          | ~370 modern best-practice rules                                                                                                              | `eslint-plugin-sonarjs`: overlaps unicorn and complexity rules                                             |
| `@stylistic/eslint-plugin`       | blank lines between statements and comment style, which Prettier does not decide                                                             | —                                                                                                          |
| `eslint-config-prettier`         | turns off the ESLint rules that conflict with Prettier (ADR-0013)                                                                            | `eslint-plugin-prettier`: discouraged by Prettier (`REF-PRETTIER-LINTERS`)                                 |
| `@eslint/markdown`               | lints the structure of every Markdown page (headings, links, code languages, tables) inside ESLint, with the same "every rule decided" audit | `markdownlint-cli2`: depends on `braces`, vulnerable without fix (GHSA-vfj7-8cjw-p6xm)                     |
| `prettier`                       | code formatting                                                                                                                              | —                                                                                                          |

### Documentation site

| Package                   | Why                                                                                                                       | Alternatives rejected                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `vitepress`               | Markdown documentation site built on Vite (`REF-VITEPRESS`); 2.0 alpha because 1.6 bundles a vulnerable Vite 5 (ADR-0009) | Docusaurus: React and webpack/rspack toolchain, no native PDF either |
| `typedoc`                 | generates the API reference from the TSDoc; supports TypeScript 6.0                                                       | —                                                                    |
| `typedoc-plugin-markdown` | TypeDoc output as Markdown pages (`REF-TYPEDOC-MARKDOWN`)                                                                 | TypeDoc's HTML site: separate from the docs                          |
| `typedoc-vitepress-theme` | VitePress-flavored Markdown and sidebar for the API pages                                                                 | —                                                                    |

### Git workflow

| Package                           | Why                                                               | Alternatives rejected                     |
| --------------------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| `husky`                           | installs the Git hooks (`.husky/`) on `npm install`               | `lefthook`: equally good, less widespread |
| `lint-staged`                     | runs Prettier and ESLint on staged files only, before each commit | —                                         |
| `@commitlint/cli`                 | checks commit messages                                            | —                                         |
| `@commitlint/config-conventional` | Conventional Commits rule set (`REF-CONVENTIONAL-COMMITS`)        | —                                         |
| `@commitlint/types`               | types of `commitlint.config.ts`                                   | —                                         |
| `validate-branch-name`            | checks the branch name before pushing                             | a home-made script                        |

### Security

| Package                                        | Why                                                                                      | Alternatives rejected                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `secretlint`                                   | detects keys, tokens and passwords in any file, before commit and in CI                  | `gitleaks`: a Go binary outside npm; GitHub secret scanning also runs, server side |
| `@secretlint/secretlint-rule-preset-recommend` | secretlint's recommended rule set (cloud keys, GitHub, Slack, npm tokens, private keys…) | —                                                                                  |

### Maintenance

| Package             | Why                                                                           | Alternatives rejected                                                 |
| ------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `npm-check-updates` | `npm run deps:outdated`: fails when a dependency is not on its latest version | `npm outdated`: no per-package target (TypeScript limited to patches) |

## Overrides

| Override                  | Why                                                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `deepmerge-ts` → `^8.0.0` | `eslint-plugin-functional` pulls a version affected by GHSA-ggr8-5vv4-36mx; 8.x fixes it                        |
| `katex` → `^0.19.0`       | `@eslint/markdown` pulls a version affected by GHSA-238p-pmpm-9mq7 (math rendering, unused here); 0.19 fixes it |
