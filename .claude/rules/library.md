---
paths:
  - "src/**"
  - "playground/**"
---

# Library and playground pitfalls

- Importing from another folder = importing **the folder** (`../geometry`); `npm run fix` corrects the path and updates the folder's `index.ts`.
- A new layer (`src/<layer>/`) exists only with a first module and its `index.ts`, re-exported by `src/index.ts`.
- Barrels: the autofix writes `export type *` for a folder holding only types and never switches back to `export *` once it holds values; `barrels.test.ts` then fails — replace the line by `export *`.
- `noUncheckedIndexedAccess`: an index read is `T | undefined`; an unreachable fallback branch breaks the 100 % coverage. Prefer an explicit, testable fallback (see `cyclicItem`).
- Module constants: `UPPER_CASE` and documented; type members documented too (TypeDoc fails otherwise).
- JSDoc description = sentences; `@param` / `@returns` = fragments without final period. `@kind` is declared in `tsdoc.json` (`jsdoc/check-values` off on purpose).
- Procedure verbs: `eslint/settings/verbs.ts` (add, sorted). Per-kind limits: `eslint/settings/kinds.ts` (change only with an ADR).
- Tests: examples with hand-computed values justified in a comment, then properties with `test.prop({ … })` from `@fast-check/vitest` (record form: `max-params` is 3). `toBe` compares with `Object.is`, so `-0` differs from `0`: use `toBeCloseTo` for computed numbers.
- DOM tests start with `// @vitest-environment happy-dom`.
- Run `npx tsc --noEmit` before each commit: Vitest strips types, and the unused-imports autofix drops a type import written before the code that uses it (EN-005).
- Zero vectors and signed zeros (ADR-0025): `atan2(+0, −0) = π`, `Math.sign(−0) = −0`, and `toEqual` tells `−0` from `0`. State the intended result for zero-length edges explicitly (see `turningAngle`, `unit`).
- More than three parameters: group them in a named type (`CornerPoints`); tests with many columns use `it.each` over objects.
