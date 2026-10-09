import type { GuidedStep } from "./guided-step";

/**
 * The steps of the Product Owner test cards, shown one at a time: the nine of US-003 (F01,
 * VAL-001), then the ten of US-007 and the one of US-008 (F02, VAL-002).
 */
export const GUIDED_STEPS: readonly GuidedStep[] = [
  {
    explanation:
      "This is the rectangle you get when you open the page: 120 × 80 with a radius of 10.",
    look: "Four rounded corners. Under the inputs: “Effective radius: 10 (as requested)”.",
    title: "The starting rectangle",
    values: { corners: 6, height: 80, radius: 10, shape: "rectangle", width: 120 },
  },
  {
    explanation:
      "A 100 × 50 rectangle with a radius of 10: each corner is replaced by a quarter circle of radius 10.",
    look: "The four corners are rounded the same way; each curve starts 10 pixels before its corner.",
    title: "Corners rounded by 10",
    values: { corners: 6, height: 50, radius: 10, shape: "rectangle", width: 100 },
  },
  {
    explanation:
      "The rectangle is only 25 high, but you ask for 100. Two corners of 100 cannot fit on a side of 25, so the radius is reduced until they just meet: 25 / 2 = 12.5. Your 100 is kept.",
    look: "The short sides become half circles (a “pill”). The text says “Effective radius: 12.5 (requested 100, reduced to fit)”.",
    title: "A radius too big for the rectangle",
    values: { corners: 6, height: 25, radius: 100, shape: "rectangle", width: 100 },
  },
  {
    explanation:
      "A 100 × 100 square with a radius of 50, half its side: the four quarter circles join into a circle.",
    look: "A circle, and “Effective radius: 50 (as requested)”.",
    title: "A circle",
    values: { corners: 6, height: 100, radius: 50, shape: "rectangle", width: 100 },
  },
  {
    explanation:
      "The same square with a radius of 1000: far too big, so it is reduced to the most that fits, 50.",
    look: "The same circle. The text says the requested 1000 was reduced to fit, to 50.",
    title: "Much too big",
    values: { corners: 6, height: 100, radius: 1000, shape: "rectangle", width: 100 },
  },
  {
    explanation:
      "100 wide and 300 high, radius 100: the 100-pixel sides can only hold two radii of 50.",
    look: "A vertical pill, and “Effective radius: 50 (requested 100, reduced to fit)”.",
    title: "Narrow and tall",
    values: { corners: 6, height: 300, radius: 100, shape: "rectangle", width: 100 },
  },
  {
    explanation: "Now 300 wide: there is room again for the radius of 100 you asked for at step 6.",
    look: "A square with rounded corners, and “Effective radius: 100 (as requested)”: the rounding grew back to your request.",
    title: "Wider again",
    values: { corners: 6, height: 300, radius: 100, shape: "rectangle", width: 300 },
  },
  {
    explanation: "A radius of 0 means no rounding at all.",
    look: "Sharp corners, as before this feature.",
    title: "No rounding",
    values: { corners: 6, height: 300, radius: 0, shape: "rectangle", width: 300 },
  },
  {
    explanation:
      "A negative radius is refused: values must be whole numbers ≥ 0. Then type 2.5 in the radius yourself: it is refused too.",
    look: "The inputs are outlined in red, a message explains why, and the effective radius disappears.",
    title: "A wrong value",
    values: { corners: 6, height: 300, radius: -3, shape: "rectangle", width: 300 },
  },
  {
    explanation:
      "F02 starts here. A 100 × 100 box, radius 0, and the shape switched to Polygon: a regular hexagon (6 equal sides) with a flat base, as large as the box allows without being stretched.",
    look: "The hexagon touches the left and right of the box, not its top and bottom (it is 86.6 high). The Corners field appears with 6; width, height and radius kept.",
    title: "F02 · A hexagon in its box",
    values: { corners: 6, height: 100, radius: 0, shape: "polygon", width: 100 },
  },
  {
    explanation: "3 corners: a triangle, pointing up, its base flat.",
    look: "100 wide, 86.6 high, centered vertically in the box.",
    title: "F02 · A triangle",
    values: { corners: 3, height: 100, radius: 0, shape: "polygon", width: 100 },
  },
  {
    explanation: "4 corners: a square with a flat base — not a diamond.",
    look: "A 100 × 100 square.",
    title: "F02 · A square, not a diamond",
    values: { corners: 4, height: 100, radius: 0, shape: "polygon", width: 100 },
  },
  {
    explanation: "Height 50: the square shrinks to stay a square, and is centered in the width.",
    look: "A 50 × 50 square, from 25 to 75 across.",
    title: "F02 · Kept regular",
    values: { corners: 4, height: 50, radius: 0, shape: "polygon", width: 100 },
  },
  {
    explanation:
      "Back to the hexagon with a radius of 1000, far too big: every corner is rounded as much as it can be, and the hexagon becomes the circle inside it.",
    look: "A circle of diameter 86.6, and “Effective radius: 43.30127 (requested 1000, reduced to fit)”.",
    title: "F02 · The circle inside the hexagon",
    values: { corners: 6, height: 100, radius: 1000, shape: "polygon", width: 100 },
  },
  {
    explanation:
      "The same with a triangle: the circle inside a triangle is smaller, and sits lower than the middle of the box.",
    look: "A circle of radius 28.87, below the middle; “Effective radius: 28.86751 (requested 1000, reduced to fit)”.",
    title: "F02 · The circle inside the triangle",
    values: { corners: 3, height: 100, radius: 1000, shape: "polygon", width: 100 },
  },
  {
    explanation: "8 corners and a radius of 10: an octagon, slightly rounded.",
    look: "It touches all four sides of the box; “Effective radius: 10 (as requested)”.",
    title: "F02 · An octagon",
    values: { corners: 8, height: 100, radius: 10, shape: "polygon", width: 100 },
  },
  {
    explanation:
      "13 corners is refused: a polygon has 3 to 12 corners (Q19). Then type 2, and 2.5, yourself: refused too.",
    look: "The inputs are outlined in red and a message says corners must be an integer from 3 to 12.",
    title: "F02 · Too many corners",
    values: { corners: 13, height: 100, radius: 10, shape: "polygon", width: 100 },
  },
  {
    explanation: "Back to the rectangle: the same width, height and radius.",
    look: "The 100 × 100 rectangle with radius 10; the Corners field disappears.",
    title: "F02 · Back to the rectangle",
    values: { corners: 8, height: 100, radius: 10, shape: "rectangle", width: 100 },
  },
  {
    explanation:
      "A width of 250 000 is more than any screen: the interface caps it at 100 000 (Q20). The calculations themselves have no limit.",
    look: "The width input shows 100000; the rectangle runs far off the canvas.",
    title: "F02 · A size capped at 100 000",
    values: { corners: 8, height: 100, radius: 10, shape: "rectangle", width: 250_000 },
  },
];
