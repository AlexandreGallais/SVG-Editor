// PreToolUse hook (ADR-0021): denies shell commands the project forbids, whatever the instructions say.
// Input: the hook JSON on stdin. Output: a deny decision on stdout, or nothing to let the call proceed.

import { readFileSync } from "node:fs";

/** A forbidden command: what it matches and why it is denied. */
type Guard = {
  readonly pattern: RegExp;
  readonly reason: string;
};

/** Commands denied in this repository, matched against each segment of a shell command. */
const GUARDS: readonly Guard[] = [
  {
    pattern: /^gh\s+pr\s+merge\b/u,
    reason:
      "Story pull requests are merged by the Product Owner, never by the agent (CLAUDE.md, branches).",
  },
  {
    pattern: /^git\s+(?:commit|push)\b.*\s--no-verify\b/u,
    reason:
      "The Git hooks (lint-staged, commitlint, check:all) are never bypassed: fix the cause instead.",
  },
  {
    pattern: /^git\s+push\b(?=.*\s(?:--force|-f)(?:\s|$))/u,
    reason: "Force pushes use --force-with-lease, and only on the agent's own story branch.",
  },
];

/**
 * Reason for denying a shell command, if one of its segments is forbidden.
 *
 * @param command - shell command as the agent wrote it
 * @returns the reason of the first matching guard, or `undefined` when the command may run
 */
export function deniedReason(command: string): string | undefined {
  const segments = command.split(/&&|\|\||[;|\n]/u).map((segment) => segment.trim());

  return GUARDS.find((guard) => segments.some((segment) => guard.pattern.test(segment)))?.reason;
}

/**
 * Property of a parsed JSON value.
 *
 * @param value - parsed JSON
 * @param key - property name
 * @returns the property, or `undefined` when `value` is not an object
 */
export function field(value: unknown, key: string): unknown {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }

  const property: unknown = Reflect.get(value, key);

  return property;
}

/**
 * Shell command carried by a hook input.
 *
 * @param input - parsed hook JSON
 * @returns `tool_input.command`, or an empty string when absent
 */
export function commandOf(input: unknown): string {
  const command = field(field(input, "tool_input"), "command");

  return typeof command === "string" ? command : "";
}

if (import.meta.main) {
  const input: unknown = JSON.parse(readFileSync(0, "utf8"));
  const reason = deniedReason(commandOf(input));

  if (reason !== undefined) {
    const decision = {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason,
    };

    process.stdout.write(JSON.stringify({ hookSpecificOutput: decision }));
  }
}
