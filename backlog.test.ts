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
  stories: /^(?:US|EN|SP|VAL)-\d{3}$/u,
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

      return [key.trim(), value.join(":").trim()];
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

describe("backlog", () => {
  it("gives every item a well-formed id, a title and an allowed status", () => {
    expect(
      items()
        .filter((item) => !isWellFormed(item))
        .map((item) => item.file),
    ).toEqual([]);
  });

  it("names every file after its id", () => {
    expect(
      items()
        .filter((item) => !item.file.startsWith(`${item.fields["id"] ?? ""}-`))
        .map((item) => item.file),
    ).toEqual([]);
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
