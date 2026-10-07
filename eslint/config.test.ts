import js from "@eslint/js";
import { describe, expect, it } from "vitest";

import { PRETTIER_OWNED, RULE_THEMES } from "./config";
import { LANGUAGE, SCOPES } from "./scopes";

/**
 * Whether a rule module is still maintained (`meta.deprecated` absent or `false`).
 *
 * @param rule - rule module, or legacy rule function
 * @returns `true` unless the rule is flagged as deprecated
 */
function isLive(rule: object): boolean {
  const meta: unknown = Reflect.get(rule, "meta");
  const deprecated: unknown =
    typeof meta === "object" && meta !== null ? Reflect.get(meta, "deprecated") : undefined;

  return deprecated === undefined || deprecated === false;
}

/**
 * Names of the non-deprecated rules of every registered plugin, prefixed as in the configuration.
 *
 * Core rules come from `@eslint/js`'s `all` preset, which lists exactly the live core rules.
 *
 * @returns sorted rule names
 */
function liveRules(): string[] {
  const pluginRules = Object.entries(LANGUAGE.plugins ?? {}).flatMap(([prefix, plugin]) =>
    Object.entries(plugin.rules ?? {})
      .filter(([, rule]) => isLive(rule))
      .map(([name]) => `${prefix}/${name}`),
  );

  return [...Object.keys(js.configs.all.rules), ...pluginRules].toSorted((left, right) =>
    left.localeCompare(right, "en"),
  );
}

/**
 * Rule names configured by a list of configuration objects, one entry per occurrence.
 *
 * @param configs - flat configuration objects
 * @returns rule names, duplicates included
 */
function configuredRules(configs: readonly { readonly rules?: object }[]): string[] {
  return configs.flatMap((config) => Object.keys(config.rules ?? {}));
}

/** Rules decided by the themes of `eslint/rules/`, duplicates included. */
const THEME_RULES = configuredRules(RULE_THEMES);

/** Formatting rules switched off by eslint-config-prettier. */
const PRETTIER_RULES = new Set(configuredRules([PRETTIER_OWNED]));

describe("ESLint configuration audit", () => {
  it("decides every live rule of every plugin, in a theme or through Prettier", () => {
    const themeRules = new Set(THEME_RULES);
    const decided = themeRules.union(PRETTIER_RULES);

    expect(liveRules().filter((rule) => !decided.has(rule))).toEqual([]);
  });

  it("decides each rule in exactly one theme", () => {
    const duplicates = THEME_RULES.filter((rule, index) => THEME_RULES.indexOf(rule) !== index);

    expect(duplicates).toEqual([]);
  });

  it("only configures rules that exist and are not deprecated", () => {
    const live = new Set(liveRules());

    expect(THEME_RULES.filter((rule) => !live.has(rule))).toEqual([]);
  });

  it("re-enables no Prettier-owned rule except `curly` (Prettier-compatible in `all` mode)", () => {
    expect(THEME_RULES.filter((rule) => PRETTIER_RULES.has(rule))).toEqual(["curly"]);
  });

  it("only overrides, in scopes, rules already decided in a theme", () => {
    const decided = new Set(THEME_RULES);

    expect(configuredRules(SCOPES).filter((rule) => !decided.has(rule))).toEqual([]);
  });
});
