---
id: F03
epic: E01
title: Per-vertex corner radius and node editing
status: draft
---

# E01 · F03 — Per-vertex corner radius and node editing

**Benefit hypothesis**: the designer shapes any contour vertex by vertex.

**Product Owner's wish (VAL-001, 2026-10-09)**: click a vertex to see its configuration and change its corner radius alone, as in Figma — e.g. a rectangle with a single rounded corner. The geometry of F01 already works per vertex (`Corner`); F01 gives the same radius to every corner.

## Acceptance criteria

1. Vertices can be selected, added on an edge, moved by integers and deleted.
2. Each vertex has its own radius, clamped locally (ADR-0007).

## Stories

To be written in refinement, after F01.
