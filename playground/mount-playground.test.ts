// @vitest-environment happy-dom
import { beforeAll, describe, expect, it } from "vitest";

import page from "./index.html?raw";
import { mountPlayground } from "./mount-playground";

/**
 * Text shown in an element of the page.
 *
 * @param id - element id, without `#`
 * @returns its text content, empty when absent
 */
function text(id: string): string {
  return document.querySelector(`#${id}`)?.textContent ?? "";
}

/**
 * Types a value into an input and fires its `input` event, as a user would.
 *
 * @param id - input id
 * @param value - typed text
 */
function type(id: string, value: string): void {
  const input = document.querySelector<HTMLInputElement>(`#${id}`);

  if (input === null) {
    return;
  }

  input.value = value;
  input.dispatchEvent(new Event("input"));
}

/**
 * Clicks a button of the page.
 *
 * @param id - button id
 */
function click(id: string): void {
  document.querySelector<HTMLButtonElement>(`#${id}`)?.click();
}

describe("playground", () => {
  beforeAll(() => {
    // The page as served, without its script tag: the test mounts the playground itself.
    const parser = new DOMParser();
    const parsed = parser.parseFromString(page, "text/html");

    parsed.querySelector("script")?.remove();
    document.body.replaceChildren(...parsed.body.childNodes);
    mountPlayground(document);
  });

  it("[F01.AC1] renders the rectangle as one <path>", () => {
    type("width", "100");
    type("height", "50");
    type("radius", "0");

    expect(document.querySelectorAll("#canvas svg path")).toHaveLength(1);
    expect(text("path-data")).toBe("M0 0 L100 0 L100 50 L0 50 Z");
  });

  it("[F01.AC2] shows the effective radius next to the requested one when it was reduced", () => {
    type("height", "25");
    type("radius", "100");

    expect(text("effective")).toBe("Effective radius: 12.5 (requested 100, reduced to fit)");
  });

  it("[F01.AC2] says the radius is as requested when it fits", () => {
    type("height", "50");
    type("radius", "10");

    expect(text("effective")).toBe("Effective radius: 10 (as requested)");
    expect(text("path-data")).toContain("A10 10 0 0 1 100 10");
  });

  it("refuses a negative radius and clears the effective radius", () => {
    type("radius", "-3");

    expect(text("status")).toBe("Width, height and radius must be integers ≥ 0.");
    expect(text("effective")).toBe("");
  });

  it("walks the nine steps of the guided test, each showing what it tells to look at", () => {
    // "Previous" on the first step stays there and types its values again.
    click("guide-previous");

    // Effective radius text expected at each step, as announced by the step (US-003 card).
    const expected = [
      "Effective radius: 10 (as requested)",
      "Effective radius: 10 (as requested)",
      "Effective radius: 12.5 (requested 100, reduced to fit)",
      "Effective radius: 50 (as requested)",
      "Effective radius: 50 (requested 1000, reduced to fit)",
      "Effective radius: 50 (requested 100, reduced to fit)",
      "Effective radius: 100 (as requested)",
      "Effective radius: 0 (as requested)",
      "",
    ];

    for (const [index, effective] of expected.entries()) {
      expect(text("guide-number")).toBe(String(index + 1));
      expect(text("effective")).toBe(effective);
      click("guide-next");
    }

    // Past the last step, the guide stays on it: the wrong value is refused.
    expect(text("guide-number")).toBe("9");
    expect(text("status")).toBe("Width, height and radius must be integers ≥ 0.");
  });
});
