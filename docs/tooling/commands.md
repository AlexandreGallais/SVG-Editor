# Commands

| Command                                            | Role                                                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                                      | Vite server on `playground/` (`http://localhost:5173`)                                                              |
| `npm run build`                                    | `npm audit`, then library build (`dist/editor.js`) + declarations (`dist/types/`)                                   |
| `npm run test` / `test:watch`                      | Vitest with coverage of `src/` (100 % required) — library, custom rules, ESLint audit, dependency and backlog tests |
| `npm run lint` / `lint:fix`                        | ESLint, zero warning tolerated                                                                                      |
| `npm run lint:secrets`                             | secretlint: no key, token or password in any file                                                                   |
| `npm run format` / `format:check`                  | Prettier                                                                                                            |
| `npm run typecheck`                                | `tsc --noEmit`                                                                                                      |
| `npm run fix`                                      | Prettier then ESLint `--fix`: **run before `check`**                                                                |
| `npm run check`                                    | Prettier + ESLint + secretlint + `tsc` + Vitest + `npm audit`: **must be green to finish a task**                   |
| `npm run deps:audit`                               | `npm audit`, any severity fails                                                                                     |
| `npm run deps:outdated`                            | fails when a dependency is not on its latest version                                                                |
| `npm run check:all`                                | `check` + `deps:outdated` + documentation build (what CI runs)                                                      |
| `npm run docs:dev` / `docs:build` / `docs:preview` | documentation site (TypeDoc API generated first)                                                                    |
| `npm run docs:api`                                 | regenerate `docs/api/` from the TSDoc                                                                               |

## Playground

`playground/index.html` loads `playground/index.ts`, which may only import the public API (`../src`). It will show each pipeline stage (integer model → `d` → `<path>`) as features arrive.

## Build

Vite library mode (`build.lib`), a single unminified ESM output; `tsc -p tsconfig.build.json` emits the `.d.ts`. `package.json`: `"sideEffects": false`, `exports` points to `dist/`.

## CI

See [ci.md](./ci.md).

## IDE

See [formatting](../conventions/formatting.md#format-on-save). WebStorm and VS Code settings are in the repository (`.idea/`, `.vscode/`).
