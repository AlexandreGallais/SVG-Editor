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
 * Chooses a shape in the selector and fires its `change` event, as a user would.
 *
 * @param value - `rectangle` or `polygon`
 */
function chooseShape(value: string): void {
  const select = document.querySelector<HTMLSelectElement>("#shape");

  if (select === null) {
    return;
  }

  select.value = value;
  select.dispatchEvent(new Event("change"));
}

/**
 * Whether the field of the number of corners is out of sight: its computed display, so that a
 * style rule overriding the `hidden` attribute is caught.
 *
 * @returns `true` when `#corners-field` is not displayed
 */
function isCornersFieldHidden(): boolean {
  const field = document.querySelector("#corners-field");

  return field !== null && getComputedStyle(field).display === "none";
}

/**
 * Value shown in an input.
 *
 * @param id - input id
 * @returns its value, empty when absent
 */
function valueOf(id: string): string {
  return document.querySelector<HTMLInputElement>(`#${id}`)?.value ?? "";
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
    // The head carries the page's style: visibility is checked as the browser computes it.
    document.head.replaceChildren(...parsed.head.childNodes);
    document.body.replaceChildren(...parsed.body.childNodes);
    mountPlayground(document);
  });

  it("[F02.AC4] opens on the rectangle, the selector on Rectangle, without the number of corners", () => {
    expect(document.querySelector<HTMLSelectElement>("#shape")?.value).toBe("rectangle");
    expect(isCornersFieldHidden()).toBe(true);
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

  it("[F02.AC4] stays on the rectangle after the steps of the F01 guided test", () => {
    click("guide-previous");

    expect(document.querySelector<HTMLSelectElement>("#shape")?.value).toBe("rectangle");
    expect(isCornersFieldHidden()).toBe(true);
  });

  it("[F02.AC4] draws a polygon in the same box, keeping width, height and radius", () => {
    type("width", "100");
    type("height", "100");
    type("radius", "0");
    chooseShape("polygon");

    // Hexagon (6 corners by default) in 100 × 100: flat top and bottom at (100 − 50√3)/2.
    expect(isCornersFieldHidden()).toBe(false);
    expect([valueOf("width"), valueOf("height"), valueOf("radius")]).toEqual(["100", "100", "0"]);

    expect(text("path-data")).toBe(
      "M25 6.69873 L75 6.69873 L100 50 L75 93.30127 L25 93.30127 L0 50 Z",
    );
  });

  it("[F02.AC3] writes the polygon with at most 5 decimals, clockwise from its top-left vertex", () => {
    // Hexagon of the previous step: 6.69873 is (100 − 50√3)/2 = 6.698729… rounded to 5 decimals.
    const numbers = text("path-data").match(/-?\d+(?:\.\d+)?/gu) ?? [];

    expect(numbers.every((number) => (number.split(".", 2)[1] ?? "").length <= 5)).toBe(true);
    expect(text("path-data").startsWith("M25 6.69873 L75 6.69873")).toBe(true);
  });

  it("[F02.AC4] follows the number of corners: a triangle pointing up", () => {
    type("corners", "3");

    expect(text("path-data")).toBe("M50 6.69873 L100 93.30127 L0 93.30127 Z");
  });

  it("[F02.AC2] shows the incircle radius when the radius is too big", () => {
    type("corners", "6");
    type("radius", "1000");

    // Inradius of the hexagon: 50 cos(π/6) = 43.30127.
    expect(text("effective")).toBe("Effective radius: 43.30127 (requested 1000, reduced to fit)");
    // The circle of the hexagon: six arcs of radius 43.30127 and no line, from the top middle.
    expect(text("path-data")).toMatch(/^M50 6\.69873 (?:A43\.30127 43\.30127 0 0 1 [\d. ]+){6}Z$/u);
  });

  it("[F02.AC1] refuses 13, 2, 2.5 and no corners", () => {
    type("corners", "13");

    expect(text("status")).toBe(
      "Width, height and radius must be integers ≥ 0, and corners an integer from 3 to 12.",
    );

    expect(document.querySelector("#corners")?.getAttribute("aria-invalid")).toBe("true");
    expect(text("effective")).toBe("");

    for (const corners of ["2", "2.5", ""]) {
      type("corners", corners);

      expect(text("status")).toContain("corners an integer from 3 to 12");
      expect(document.querySelector("#corners")?.getAttribute("aria-invalid")).toBe("true");
    }
  });

  it("[F02.AC4] goes back to the rectangle, the number of corners hidden and ignored", () => {
    type("radius", "0");
    chooseShape("rectangle");

    expect(isCornersFieldHidden()).toBe(true);
    expect(text("status")).toBe("");
    expect(text("path-data")).toBe("M0 0 L100 0 L100 100 L0 100 Z");
  });

  it("returns to the rectangle when a step of the F01 guided test is shown", () => {
    chooseShape("polygon");
    click("guide-previous");

    // The steps of F01 show rectangles: the selector follows, whatever was chosen before.
    expect(document.querySelector<HTMLSelectElement>("#shape")?.value).toBe("rectangle");
    expect(isCornersFieldHidden()).toBe(true);
  });
});
