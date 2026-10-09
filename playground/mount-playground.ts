import {
  EPSILON,
  contourPiecesToPathData,
  createPathElement,
  createSvgElement,
  effectiveCornerRadius,
  formatSvgNumber,
  isValidRectangle,
  rectangleContour,
  rectangleCorners,
  roundedContour,
} from "../src";

import { GUIDED_STEPS } from "./guided-steps";

import type { Rectangle } from "../src";

/** Distance from the canvas top-left corner to the shape origin, in user units (= CSS pixels). */
const MARGIN = 10;

/** Indentation of the JSON shown in the pipeline panel. */
const JSON_INDENT = 2;

/** Message shown when a value is not an integer ≥ 0. */
const INVALID_MESSAGE = "Width, height and radius must be integers ≥ 0.";

/** Specification of the story demonstrated by this page. */
const STORY = "docs/backlog/stories/E01-F01-US-003-round-rectangle-corners.md";

/** Inputs of the rectangle, in display order. */
const INPUTS = ["width", "height", "radius"];

/**
 * Selects a required element of the page by its id.
 *
 * @kind procedure
 * @param document - page document
 * @param id - `id` attribute, without `#`
 * @returns the HTML element carrying this `id`
 * @throws {Error} when the page has no element with this id
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function selectElement(document: Document, id: string): HTMLElement {
  const element = document.querySelector<HTMLElement>(`#${id}`);

  if (element === null) {
    throw new Error(`Playground page without #${id} (${STORY}).`);
  }

  return element;
}

/**
 * Reads the number typed in an input, `NaN` when it is empty or not a number.
 *
 * @kind procedure
 * @param document - page document
 * @param id - id of the input
 * @returns the typed value
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function readNumber(document: Document, id: string): number {
  const input = selectElement(document, id);

  return input instanceof HTMLInputElement ? input.valueAsNumber : NaN;
}

/**
 * Reads the rectangle typed in the width, height and radius inputs.
 *
 * @kind procedure
 * @param document - page document
 * @returns the rectangle, possibly invalid (checked by `isValidRectangle`)
 * @see docs/backlog/stories/E01-F01-US-003-round-rectangle-corners.md
 */
function readRectangle(document: Document): Rectangle {
  return {
    height: readNumber(document, "height"),
    radius: readNumber(document, "radius"),
    width: readNumber(document, "width"),
  };
}

/**
 * Writes a text into the element of the given id.
 *
 * @kind procedure
 * @param document - page document
 * @param id - id of the target element
 * @param text - text to display
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function writeText(document: Document, id: string, text: string): void {
  selectElement(document, id).textContent = text;
}

/**
 * Shows the validity of the inputs: invalid ones are outlined and a message explains why.
 *
 * @kind procedure
 * @param document - page document
 * @param isValid - whether the typed rectangle is valid
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function setValidity(document: Document, isValid: boolean): void {
  for (const id of INPUTS) {
    selectElement(document, id).setAttribute("aria-invalid", String(!isValid));
  }

  writeText(document, "status", isValid ? "" : INVALID_MESSAGE);
}

/**
 * Reads the size of the drawing area in CSS pixels.
 *
 * @kind procedure
 * @param document - page document
 * @returns width and height of the `#canvas` element
 * @see docs/backlog/stories/E01-F01-US-004-fixed-scale-playground.md
 */
function readCanvasSize(document: Document): { readonly height: number; readonly width: number } {
  const { height, width } = selectElement(document, "canvas").getBoundingClientRect();

  return { height, width };
}

/**
 * Shows the effective corner radius next to the requested one, and says when it was reduced to
 * fit the rectangle (Q8: the requested value is kept, the effective one is derived).
 *
 * @kind procedure
 * @param document - page document
 * @param rectangle - valid rectangle
 * @see docs/backlog/stories/E01-F01-US-003-round-rectangle-corners.md
 */
function writeEffectiveRadius(document: Document, rectangle: Rectangle): void {
  const effective = effectiveCornerRadius(rectangle);
  const isReduced = rectangle.radius - effective >= EPSILON;
  const text = isReduced
    ? `Effective radius: ${formatSvgNumber(effective)} (requested ${String(rectangle.radius)}, reduced to fit)`
    : `Effective radius: ${formatSvgNumber(effective)} (as requested)`;

  writeText(document, "effective", text);
}

/**
 * Draws a rectangle with its rounded corners at a fixed scale (1 user unit = 1 CSS pixel, US-004)
 * and shows each pipeline stage: model, contour, evaluated contour, path data.
 *
 * @kind procedure
 * @param document - page document
 * @param rectangle - valid rectangle to draw
 * @see docs/backlog/stories/E01-F01-US-003-round-rectangle-corners.md
 */
function showRectangle(document: Document, rectangle: Rectangle): void {
  const contour = rectangleContour(rectangle);
  const pieces = roundedContour(rectangleCorners(rectangle));
  const pathData = contourPiecesToPathData(pieces);
  const viewBox = { ...readCanvasSize(document), x: -MARGIN, y: -MARGIN };
  const svg = createSvgElement(document, viewBox);

  svg.append(createPathElement(document, pathData));
  selectElement(document, "canvas").replaceChildren(svg);
  writeText(document, "model", JSON.stringify(rectangle, undefined, JSON_INDENT));
  writeText(document, "contour", JSON.stringify(contour, undefined, JSON_INDENT));
  writeText(document, "pieces", JSON.stringify(pieces, undefined, JSON_INDENT));
  writeEffectiveRadius(document, rectangle);
  writeText(document, "path-data", pathData);
}

/**
 * Updates the page from the inputs: a valid rectangle is drawn, an invalid one is refused.
 *
 * @kind procedure
 * @param document - page document
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function updatePlayground(document: Document): void {
  const rectangle = readRectangle(document);
  const isValid = isValidRectangle(rectangle);

  setValidity(document, isValid);

  if (isValid) {
    showRectangle(document, rectangle);
  } else {
    // The effective radius of the last valid rectangle would no longer match the inputs (Q8).
    writeText(document, "effective", "");
  }
}

/**
 * Types a value into an input of the page, without firing any event.
 *
 * @kind procedure
 * @param document - page document
 * @param id - `width`, `height` or `radius`
 * @param value - number to show in the input
 * @see docs/backlog/stories/E01-F01-VAL-001-validate-rectangle.md
 */
function writeInputValue(document: Document, id: string, value: number): void {
  const input = selectElement(document, id);

  if (input instanceof HTMLInputElement) {
    input.value = String(value);
  }
}

/**
 * Reads which step of the guided test is shown.
 *
 * @kind procedure
 * @param document - page document
 * @returns index of the step shown, 0 before the first one
 * @see docs/backlog/stories/E01-F01-VAL-001-validate-rectangle.md
 */
function readGuidedStep(document: Document): number {
  return Number(selectElement(document, "guide").dataset["step"] ?? "0");
}

/**
 * Shows one step of the guided test and types its values, so that the drawing follows (VAL-001).
 *
 * @kind procedure
 * @param document - page document
 * @param index - step to show, kept within the first and the last step
 * @see docs/backlog/stories/E01-F01-VAL-001-validate-rectangle.md
 */
function showGuidedStep(document: Document, index: number): void {
  const position = Math.min(Math.max(index, 0), GUIDED_STEPS.length - 1);
  const step = GUIDED_STEPS.at(position) ?? GUIDED_STEPS[0];

  if (step === undefined) {
    return;
  }

  selectElement(document, "guide").dataset["step"] = String(position);
  writeText(document, "guide-number", String(position + 1));
  writeText(document, "guide-count", String(GUIDED_STEPS.length));
  writeText(document, "guide-title", step.title);
  writeText(document, "guide-explanation", step.explanation);
  writeText(document, "guide-look", step.look);

  writeInputValue(document, "width", step.values.width);
  writeInputValue(document, "height", step.values.height);
  writeInputValue(document, "radius", step.values.radius);

  updatePlayground(document);
}

/**
 * Mounts the playground: redraws on every input and window resize, wires the guided test, then
 * shows its first step.
 *
 * @kind procedure
 * @param document - page document
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
export function mountPlayground(document: Document): void {
  for (const id of INPUTS) {
    selectElement(document, id).addEventListener("input", () => {
      updatePlayground(document);
    });
  }

  document.defaultView?.addEventListener("resize", () => {
    updatePlayground(document);
  });

  selectElement(document, "guide-previous").addEventListener("click", () => {
    showGuidedStep(document, readGuidedStep(document) - 1);
  });

  selectElement(document, "guide-next").addEventListener("click", () => {
    showGuidedStep(document, readGuidedStep(document) + 1);
  });

  showGuidedStep(document, 0);
}
