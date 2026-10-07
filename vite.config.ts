import { join } from "node:path";

import { defineConfig } from "vitest/config";

/** Absolute path of the repository root (this file's directory). */
const ROOT = import.meta.dirname;

/**
 * Vite configuration: dev server on `playground/`, library build of `src/`, Vitest.
 *
 * @see docs/tooling/commands.md
 */
export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: false,
    lib: {
      entry: join(ROOT, "src", "index.ts"),
      fileName: "editor",
      formats: ["es"],
    },
    outDir: join(ROOT, "dist"),
  },
  root: join(ROOT, "playground"),
  test: {
    include: ["src/**/*.test.ts", "eslint/**/*.test.ts", "*.test.ts"],
    root: ROOT,
    setupFiles: ["vitest.setup.ts"],
  },
});
