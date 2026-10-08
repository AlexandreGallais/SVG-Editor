# Tests

## Tool

Vitest, without globals (`import { describe, expect, it } from "vitest"`). Files `<module>.test.ts` **next to** the tested module.

## Rules

- `math` / `geometry`: **tests first** (CLAUDE.md workflow) — nominal case, degenerate cases, reference values.
- Every non-obvious expected value is **computed by hand** and justified in a comment above the assertion:

```ts
it("returns the height of an equilateral triangle", () => {
  // 100 × √3 / 2 (DERIV-regular-polygon-fit, n = 3).
  expect(equilateralHeight(100)).toBeCloseTo(86.602_540_378, 9);
});
```

- When the expected value cannot be computed by hand: **stop** (research request or derivation to validate).
- Float comparisons: `toBeCloseTo` with a justified number of decimals, or the project's `EPSILON` (once defined, question Q10).
- DOM tests (`src/render/`, `src/interaction/`): start the file with `// @vitest-environment happy-dom`; the shell stays thin, the logic lives in the core.

## Coverage

`npm run test` measures the coverage of `src/` (`@vitest/coverage-v8`) and fails below **100 %** of lines, branches, functions and statements. Barrels and tests are excluded. An uncovered branch is either a missing test or dead code.

## ESLint relaxations in tests (`eslint/scopes/tests.ts`)

Literal numbers allowed, free function length, callback nesting up to 4, dev dependencies allowed, no `@kind`. Every other rule applies, including naming and JSDoc of module constants.
