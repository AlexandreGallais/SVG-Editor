---
id: F07
epic: E01
title: Polygon aligned in its box
status: draft
---

# E01 · F07 — Polygon aligned in its box

**Benefit hypothesis**: the designer chooses where a regular polygon sits in the room its box leaves — e.g. its flat base on the bottom of the box — so that a face lands on an integer coordinate, in line with the rectangles and ports drawn next to it, instead of floating at a fraction (a triangle in 100 × 100 has its base at y = 93.30127 when centered).

**Product Owner's idea (2026-10-10, after F02)**: « que la face plate, qui est toujours vers le bas, touche tout le temps le bas du carré », with an option « ça touche le haut, ça touche le centre, ça touche le bas », and « pareil pour droite, milieu et gauche ». A new feature: F02 is done and keeps its criteria.

## Decided in refinement (Product Owner, 2026-10-10)

- **Anchor on a 3 × 3 grid**: « une sorte de petite grille de 9 cases »; the designer picks one of the nine cells (top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right). It is one horizontal (left, center, right) and one vertical (top, center, bottom) alignment.
- **Default: center**, « centré comme actuellement »: a polygon drawn without choosing an anchor is placed exactly as in F02 (`F02.AC1` unchanged).
- **The anchor is an intention, always stored**: the polygon reaches the width, the height or both (F02), so on one axis the alignment moves nothing (left, center and right give the same triangle in 100 × 100). The setting is still chosen and kept: « il faudrait pouvoir indiquer l'intention qu'on veut mettre derrière »; e.g. moving the anchor from top-left to center-right is a real change of the model even when the drawing does not move.
- **The anchor places the sharp-cornered polygon**: « je veux que ma forme polygone sans border radius touche l'endroit ». The corner radius then rounds inwards without moving the shape (« je ne veux pas forcément que la forme bouge »): at the maximal radius the circle no longer touches the box, as in F02.
- **Rotation comes after**: the anchor is set inside the box, then the box is rotated (F04) with its content. A triangle whose base touches the bottom, rotated by 90°, has that base on the left: « c'est la boîte du polygone qu'on fait tourner ».

## To refine

- **"Always touch" option**: a check box next to the anchor, forcing the drawn shape (rounded) to touch the box whatever its radius. The Product Owner doubts its use (« mon but, c'est juste de faire toucher une face du polygone ») and leaves it to the spike: keep it only if the UX references (Figma, Inkscape, design tools) show it is worth it; otherwise it is left out.
- Model field(s): one anchor value with nine cases, or two alignments; their names in the glossary.
- Placement: only `DERIV-regular-polygon-fit` step 5 changes (the room left, `w − s·Wᵤ` or `h − s·Hᵤ`, goes all before, half before, or all after the shape); the size and the corner radius stay those of F02. Do the anchored coordinates stay exact integers where the face touches (e.g. y = h for a bottom anchor)?
- Playground: the 3 × 3 picker, its default cell, its keyboard use.
- Later, the anchor may belong to every element placed in a box: see the layout box, open question Q21 (`docs/domain/shapes.md`). F07 stays limited to the polygon in its own box.

## Acceptance criteria

To be written in refinement.

## Stories

To be written in refinement.
