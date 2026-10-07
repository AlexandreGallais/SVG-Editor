# Files

## One export per file (ADR-0015, `local/one-export-per-file`)

In `src/` and `playground/` (barrels, entry points and tests excepted):

- a module exports **exactly one value** — a function or a constant — with `export <declaration>`;
- the file is named **exactly** like it: `filletSetback.ts`, `SVG_NAMESPACE.ts`;
- no `export { … }` list, no re-export (re-exports are the barrel's job);
- a **type** may be exported next to the value only if it appears in the value's declaration (its parameter or return type): it is the function's contract;
- any other type lives in its own file, named like it (`Point.ts`), exporting only that type;
- non-exported helpers may stay in the file only if they serve its single export; a helper shared by two modules becomes its own module.

```
src/geometry/
  index.ts              export * from "./filletSetback"; …
  filletSetback.ts      export function filletSetback(…): Setback   (+ export type Setback)
  filletSetback.test.ts
  Point.ts              export type Point = …
```

## Names

- Module files: the export name, case included (`unicorn/filename-case` is off there).
- Folders and tooling files (`eslint/`, configuration files): `kebab-case`.
- Tests: `<module>.test.ts`, next to the module.

## Folders

Every code folder has an `index.ts` barrel (see [imports.md](./imports.md)). A sub-folder groups modules of one sub-concept (`geometry/intersections/`), never "utils" or "helpers" (`id-denylist`).
