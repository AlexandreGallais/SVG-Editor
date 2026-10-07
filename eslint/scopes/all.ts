import { AGGREGATORS, BARRELS } from "./barrels";
import { DOM_LAYERS } from "./dom-layers";
import { EXPORT_NAMED_FILES, LIBRARY_SIGNATURES, SINGLE_EXPORT_MODULES } from "./modules";
import { PLAYGROUND_ENTRY } from "./playground";
import { PURE_LAYERS } from "./pure-layers";
import { TESTS } from "./tests";
import { ROOT_CONFIGS, TOOLING } from "./tooling";

import type { TSESLint } from "@typescript-eslint/utils";

/** File-scoped overrides, applied after the rule themes (later entries win). */
export const SCOPES: readonly TSESLint.FlatConfig.Config[] = [
  PURE_LAYERS,
  LIBRARY_SIGNATURES,
  SINGLE_EXPORT_MODULES,
  EXPORT_NAMED_FILES,
  DOM_LAYERS,
  PLAYGROUND_ENTRY,
  BARRELS,
  AGGREGATORS,
  TOOLING,
  TESTS,
  ROOT_CONFIGS,
];
