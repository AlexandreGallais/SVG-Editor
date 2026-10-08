import {
  contourToPathData,
  createPathElement,
  createSvgElement,
  isValidRectangle,
  rectangleContour,
} from "../src";

import type { Rectangle } from "../src";

/** Distance from the canvas top-left corner to the shape origin, in user units (= CSS pixels). */
const MARGIN = 10;

/** Indentation of the JSON shown in the pipeline panel. */
const JSON_INDENT = 2;

/** Message shown when a size is not an integer ≥ 0. */
const INVALID_MESSAGE = "Width and height must be integers ≥ 0.";

/** Specification of the story demonstrated by this page. */
const STORY = "docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md";

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
 * Reads the rectangle typed in the width and height inputs.
 *
 * @kind procedure
 * @param document - page document
 * @returns the rectangle, possibly invalid (checked by `isValidRectangle`)
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function readRectangle(document: Document): Rectangle {
  return {
    height: readNumber(document, "height"),
    radius: 0,
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
  for (const id of ["width", "height"]) {
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
 * Draws a rectangle at a fixed scale (1 user unit = 1 CSS pixel, US-004) and shows each
 * pipeline stage: model, contour, path data.
 *
 * @kind procedure
 * @param document - page document
 * @param rectangle - valid rectangle to draw
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function showRectangle(document: Document, rectangle: Rectangle): void {
  const contour = rectangleContour(rectangle);
  const pathData = contourToPathData(contour);
  const viewBox = { ...readCanvasSize(document), x: -MARGIN, y: -MARGIN };
  const svg = createSvgElement(document, viewBox);

  svg.append(createPathElement(document, pathData));
  selectElement(document, "canvas").replaceChildren(svg);
  writeText(document, "model", JSON.stringify(rectangle, undefined, JSON_INDENT));
  writeText(document, "contour", JSON.stringify(contour, undefined, JSON_INDENT));
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
  }
}

/**
 * Mounts the playground: redraws on every input and window resize, then draws the initial
 * rectangle.
 *
 * @kind procedure
 * @param document - page document
 * @see docs/backlog/stories/E01-F01-US-002-sharp-rectangle-in-playground.md
 */
function mountPlayground(document: Document): void {
  for (const id of ["width", "height"]) {
    selectElement(document, id).addEventListener("input", () => {
      updatePlayground(document);
    });
  }

  document.defaultView?.addEventListener("resize", () => {
    updatePlayground(document);
  });

  updatePlayground(document);
}

mountPlayground(document);
