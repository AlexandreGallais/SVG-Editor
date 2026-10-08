import {
  LIBRARY_FILES,
  LIBRARY_RESTRICTED_SYNTAX,
  SINGLE_EXPORT_EXEMPT_FILES,
  SINGLE_EXPORT_FILES,
} from "../settings";

import type { TSESLint } from "@typescript-eslint/utils";

/** Library and playground modules: one export per file, named like it (ADR-0019). */
export const SINGLE_EXPORT_MODULES: TSESLint.FlatConfig.Config = {
  files: SINGLE_EXPORT_FILES,
  ignores: SINGLE_EXPORT_EXEMPT_FILES,
  name: "scopes/single-export-modules",
  rules: {
    "local/one-export-per-file": "error",
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
