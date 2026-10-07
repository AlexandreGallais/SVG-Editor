import { RuleConfigSeverity } from "@commitlint/types";

import type { UserConfig } from "@commitlint/types";

/** Maximum length of the commit header and body lines (same as `max_line_length`). */
const MAX_LINE_LENGTH = 100;

/** Allowed commit scopes: one per layer, plus project-wide areas. */
const SCOPES = [
  "adr",
  "deps",
  "docs",
  "eslint",
  "geometry",
  "interaction",
  "io",
  "math",
  "model",
  "playground",
  "render",
  "routing",
  "tooling",
];

/**
 * Commit message policy: Conventional Commits (`type(scope): subject`).
 *
 * @see docs/tooling/git-workflow.md
 */
const CONFIG: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [RuleConfigSeverity.Error, "always", MAX_LINE_LENGTH],
    "header-max-length": [RuleConfigSeverity.Error, "always", MAX_LINE_LENGTH],
    "scope-enum": [RuleConfigSeverity.Error, "always", SCOPES],
  },
};

export default CONFIG;
