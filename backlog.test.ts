import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/** Backlog item: its folder and its front-matter fields. */
type Item = {
  readonly fields: Readonly<Record<string, string>>;
  readonly file: string;
  readonly folder: string;
};

/** Root of the backlog. */
const BACKLOG = join(import.meta.dirname, "docs", "backlog");

/** Allowed statuses per folder. */
const STATUSES: Readonly<Record<string, readonly string[]>> = {
  epics: ["draft", "ready", "in-progress", "done"],
  features: ["draft", "ready", "in-progress", "done"],
  stories: ["draft", "ready", "in-progress", "done", "dropped"],
};

/** Identifier pattern per folder. */
const ID_PATTERNS: Readonly<Record<string, RegExp>> = {
  epics: /^E\d{2}$/u,
  features: /^F\d{2}$/u,
  stories: /^(?:US|EN|SP|AUD|VAL)-\d{3}$/u,
};

/**
 * Front-matter fields of a Markdown file (`key: value` lines between `---` fences).
 *
 * @param text - file content
 * @returns the fields, empty without front matter
 */
function frontMatter(text: string): Record<string, string> {
  const block = /^---\n(?<body>[\s\S]*?)\n---\n/u.exec(text)?.groups?.["body"] ?? "";

  return Object.fromEntries(
    block.split("\n").map((line) => {
      const [key = "", ...value] = line.split(":");

      return [
        key.trim(),
        value
          .join(":")
          .trim()
          .replace(/^"(?<inner>.*)"$/u, "$<inner>"),
      ];
    }),
  );
}

/**
 * Every backlog item, templates and folder indexes excluded.
 *
 * @returns items of all folders
 */
function items(): Item[] {
  return Object.keys(STATUSES).flatMap((folder) =>
    readdirSync(join(BACKLOG, folder))
      .filter((file) => file.endsWith(".md") && file !== "README.md")
      .map((file) => ({
        fields: frontMatter(readFileSync(join(BACKLOG, folder, file), "utf8")),
        file,
        folder,
      })),
  );
}

/**
 * Identifiers of the items of one folder.
 *
 * @param folder - backlog folder
 * @returns their `id` fields
 */
function idsOf(folder: string): ReadonlySet<string> {
  return new Set(
    items()
      .filter((item) => item.folder === folder)
      .map((item) => item.fields["id"] ?? ""),
  );
}

/**
 * Whether an item has a well-formed id, a title and a status allowed in its folder.
 *
 * @param item - backlog item
 * @returns `true` when its identity fields are valid
 */
function isWellFormed(item: Item): boolean {
  return hasValidId(item) && (item.fields["title"] ?? "") !== "" && hasValidStatus(item);
}

/**
 * Whether an item's id matches the pattern of its folder.
 *
 * @param item - backlog item
 * @returns `true` for a well-formed id
 */
function hasValidId(item: Item): boolean {
  const pattern = ID_PATTERNS[item.folder] ?? /^$/u;

  return pattern.test(item.fields["id"] ?? "");
}

/**
 * Whether an item's status is allowed in its folder.
 *
 * @param item - backlog item
 * @returns `true` for an allowed status
 */
function hasValidStatus(item: Item): boolean {
  const statuses = STATUSES[item.folder] ?? [];

  return statuses.includes(item.fields["status"] ?? "");
}

/** Parent field of each child folder. */
const PARENT_FIELDS: Readonly<Record<string, string>> = { features: "epic", stories: "feature" };

/**
 * Whether an item is attached to an existing parent (features to epics, stories to features).
 *
 * @param item - backlog item
 * @param parents - existing parent ids, by parent field
 * @returns `true` when the item needs no parent or its parent exists
 */
function hasParent(item: Item, parents: Readonly<Record<string, ReadonlySet<string>>>): boolean {
  const field = PARENT_FIELDS[item.folder];

  return field === undefined || (parents[field]?.has(item.fields[field] ?? "") ?? false);
}

/**
 * File-name prefix of an item: its ancestors' ids then its own (`E01-F01-US-001-`).
 *
 * @param item - backlog item
 * @returns `E01-`, `E01-F01-` or `E01-F01-US-001-`, ancestors first
 */
function expectedPrefix(item: Item): string {
  const { epic = "", feature = "", id = "" } = item.fields;

  return [epic, feature, id]
    .filter((part) => part !== "")
    .map((part) => `${part}-`)
    .join("");
}

/**
 * Statuses shown in a folder index (`README.md` rows `| … [ID](…) | … | status |`).
 *
 * @param folder - backlog folder
 * @returns map from item id to the status written in the index
 */
function indexStatuses(folder: string): ReadonlyMap<string, string> {
  const text = readFileSync(join(BACKLOG, folder, "README.md"), "utf8");

  return new Map(
    text
      .matchAll(/^\|[^\n[]*\[(?<id>[A-Z]+-?\d+)\]\([^)]*\)[^\n]*\|\s*(?<status>[a-z-]+)\s*\|$/gmu)
      .map((match) => [match.groups?.["id"] ?? "", match.groups?.["status"] ?? ""] as const),
  );
}

/** Story kinds every feature needs: research spike, audit, validation (ADR-0020). */
const FRAME_PREFIXES = ["SP-", "AUD-", "VAL-"];

/**
 * Whether a feature has a research spike, an audit and a validation story.
 *
 * @param stories - every story item
 * @param feature - feature id
 * @returns `true` when the three framing stories exist
 */
function isFramed(stories: readonly Item[], feature: string): boolean {
  const ids = stories
    .filter((story) => story.fields["feature"] === feature)
    .map((story) => story.fields["id"] ?? "");

  return FRAME_PREFIXES.every((prefix) => ids.some((id) => id.startsWith(prefix)));
}

describe("backlog", () => {
  it("gives every item a well-formed id, a title and an allowed status", () => {
    expect(
      items()
        .filter((item) => !isWellFormed(item))
        .map((item) => item.file),
    ).toEqual([]);
  });

  it("names every file after its parents and its id", () => {
    expect(
      items()
        .filter((item) => !item.file.startsWith(expectedPrefix(item)))
        .map((item) => item.file),
    ).toEqual([]);
  });

  it("quotes front-matter values containing a colon (YAML)", () => {
    const unquoted = Object.keys(STATUSES).flatMap((folder) =>
      readdirSync(join(BACKLOG, folder))
        .filter((file) => file.endsWith(".md"))
        .filter((file) =>
          /^\w+: [^"\n]*: /mu.test(readFileSync(join(BACKLOG, folder, file), "utf8")),
        ),
    );

    expect(unquoted).toEqual([]);
  });

  it("lists every item in its folder index", () => {
    const unlisted = items().filter(
      (item) => !indexStatuses(item.folder).has(item.fields["id"] ?? ""),
    );

    expect(unlisted.map((item) => item.file)).toEqual([]);
  });

  it("shows in every folder index the status written in each file", () => {
    const mismatches = items().filter(
      (item) => indexStatuses(item.folder).get(item.fields["id"] ?? "") !== item.fields["status"],
    );

    expect(mismatches.map((item) => item.file)).toEqual([]);
  });

  it("frames every feature with a research spike, an audit and a validation (ADR-0020)", () => {
    const stories = items().filter((item) => item.folder === "stories");
    const features = [...new Set(stories.map((story) => story.fields["feature"] ?? ""))];

    expect(features.filter((feature) => !isFramed(stories, feature))).toEqual([]);
  });

  it("uses each id once", () => {
    const ids = items().map((item) => item.fields["id"] ?? "");

    expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);
  });

  it("attaches every feature to an existing epic and every story to an existing feature", () => {
    const parents = { epic: idsOf("epics"), feature: idsOf("features") };

    expect(
      items()
        .filter((item) => !hasParent(item, parents))
        .map((item) => item.file),
    ).toEqual([]);
  });
});
