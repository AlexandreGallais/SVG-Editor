---
id: F07
epic: E01
title: Polygon aligned in its box
status: draft
---

# E01 · F07 — Polygon aligned in its box

**Benefit hypothesis**: the designer chooses where a regular polygon sits in the room its box leaves, so that its flat base lies on the bottom of the box by default: the base lands on an integer coordinate, in line with the rectangles and ports drawn next to it, instead of floating at a fraction (a triangle in 100 × 100 has its base at y = 93.30127 today).

**Product Owner's idea (2026-10-10, after F02)**: « que la face plate, qui est toujours vers le bas, touche tout le temps le bas du carré », with an option « ça touche le haut, ça touche le centre, ça touche le bas », and « pareil pour droite, milieu et gauche ». A new feature: F02 is done and keeps its criteria until a story of this feature changes `F02.AC1` (« centered »).

## To refine

- Two settings stored in the model of the polygon (`RegularPolygon`): vertical alignment (top, center, bottom) and horizontal alignment (left, center, right). Only the placement of `DERIV-regular-polygon-fit` step 5 changes: the shape, its size and its corner radius stay those of F02.
- Defaults: bottom vertically (Product Owner); horizontally, center is proposed (the flat-based polygon is symmetric about its vertical axis).
- The polygon reaches the width, the height or both (F02): only the axis with room left is affected, the other alignment changes nothing. Should the interface say so (e.g. grey out the useless setting)?
- At the maximal radius the shape is its inscribed circle and no longer touches the box (F02): is the alignment applied to the sharp-cornered polygon (the circle is then lifted off the bottom, as today it is shrunk) or to the drawn rounded shape?
- With the rotation of F04, is the alignment applied before rotating (the rotated shape may leave the box) or to the rotated shape?
- With the stretched polygon of F06, both sizes are reached: the alignment has no effect there.
- Does the alignment belong to the polygon only, or later to every shape placed in a box (text of F05, symbols)?

## Acceptance criteria

To be written in refinement.

## Stories

To be written in refinement.
