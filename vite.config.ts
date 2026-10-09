import { join } from "node:path";

import { defineConfig } from "vitest/config";

import type { BuildEnvironmentOptions } from "vite";

/** Absolute path of the repository root (this file's directory). */
const ROOT = import.meta.dirname;

/** Vite mode building the playground app instead of the library. */
const PLAYGROUND_MODE = "playground";

/** Library build: one ESM file from `src/index.ts`, declarations emitted by `tsc`. */
const LIBRARY_BUILD: BuildEnvironmentOptions = {
  emptyOutDir: true,
  lib: {
    entry: join(ROOT, "src", "index.ts"),
    fileName: "editor",
    formats: ["es"],
  },
  minify: false,
  outDir: join(ROOT, "dist"),
};

/** Playground build: the static app, published next to the docs site. */
const PLAYGROUND_BUILD: BuildEnvironmentOptions = {
  emptyOutDir: true,
  outDir: join(ROOT, "docs", ".vitepress", "dist", "playground"),
};

/**
 * Vite configuration: dev server on `playground/`, library build of `src/` (default mode) or
 * playground build (`--mode playground`), Vitest.
 *
 * @see docs/tooling/commands.md
 */
export default defineConfig(({ mode }) => ({
  base: mode === PLAYGROUND_MODE ? (process.env["PLAYGROUND_BASE"] ?? "/") : "/",
  build: mode === PLAYGROUND_MODE ? PLAYGROUND_BUILD : LIBRARY_BUILD,
  root: join(ROOT, "playground"),
  test: {
    coverage: {
      exclude: ["src/**/index.ts", "src/**/*.test.ts"],
      include: ["src/**/*.ts"],
      provider: "v8",
      reporter: ["text-summary"],
      thresholds: { 100: true },
    },
    include: [
      "src/**/*.test.ts",
      "playground/**/*.test.ts",
      "eslint/**/*.test.ts",
      "*.test.ts",
      ".claude/hooks/*.test.ts",
      "scripts/*.test.ts",
    ],
    root: ROOT,
    setupFiles: ["vitest.setup.ts"],
  },
}));
