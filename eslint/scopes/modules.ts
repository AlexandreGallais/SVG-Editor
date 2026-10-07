import {
  LIBRARY_FILES,
  LIBRARY_RESTRICTED_SYNTAX,
  SINGLE_EXPORT_EXEMPT_FILES,
  SINGLE_EXPORT_FILES,
} from "../settings";

import type { TSESLint } from "@typescript-eslint/utils";

/** Library and playground modules: one export per file, named like it (ADR-0015). */
export const SINGLE_EXPORT_MODULES: TSESLint.FlatConfig.Config = {
  files: SINGLE_EXPORT_FILES,
  ignores: SINGLE_EXPORT_EXEMPT_FILES,
  name: "scopes/single-export-modules",
  rules: {
    "local/one-export-per-file": "error",
  },
};

/** File names of library and playground modules follow their export, not kebab-case. */
export const EXPORT_NAMED_FILES: TSESLint.FlatConfig.Config = {
  files: SINGLE_EXPORT_FILES,
  name: "scopes/export-named-files",
  rules: {
    // Superseded by local/one-export-per-file: the file name is the export name (ADR-0015).
    "unicorn/filename-case": "off",
  },
};

/** Library code: no default nor optional parameter (ADR-0016). */
export const LIBRARY_SIGNATURES: TSESLint.FlatConfig.Config = {
  files: LIBRARY_FILES,
  name: "scopes/library-signatures",
  rules: {
    "no-restricted-syntax": ["error", ...LIBRARY_RESTRICTED_SYNTAX],
  },
};
