# Shapes

## 1. Shape model

Processing chain: typed numbers → integer model → computed geometry → `<path>` (ADR-0005).

- A shape = one or more **closed contours** (the first is the outside, the next ones are holes, produced by booleans).
- A contour = ordered list of **vertices** with integer coordinates.
- Each vertex carries an integer **corner radius** (0 = sharp corner).
- The shape is rendered as a single `<path>` (ADR-0002).
- Geometric primitives: segments and circular arcs only (ADR-0001).

Consequence: every shape is described by numbers. The drawing is **determined**, not drawn by hand.

### Contour orientation (Q11)

- Contours are listed **clockwise on screen** (SVG frame, y pointing down), **starting at the top-left vertex**.
- A contour is **cyclic**: the last vertex joins the first; every per-vertex computation (corner radius, clamping) wraps around, so the first vertex sees the last edge and the last vertex sees the first edge.

### Precision (Q10)

- `SVG_DECIMALS = 5`: derived coordinates are written with at most 5 decimals, in their shortest form: no trailing zeros (`2.5`, not `2.50000`), never a negative zero (`-0.000001` is written `0`).
- `EPSILON = 1e-9`: tolerance of floating-point comparisons.
- The user only ever enters integers; decimals only appear in derived geometry and output.

### Rotation of shapes

- In the Symbol Editor, a shape may be rotated by **any integer angle in degrees** (e.g. a rectangle tilted by 45°). The angle is stored; the rotated vertices are derived (ADR-0003).
- Instances in the View Editor only rotate by quarter turns (ADR-0008).

## 2. Corner radius

Reference behavior: Figma.

- Radius entered **numerically**, never with the mouse.
- Radius **per vertex**: select one or more vertices → type a value.
- Global radius: applied to every vertex of the shape.
- Geometry: arc tangent to both edges; setback `d = r / tan(θ/2)` (`DERIV-fillet-setback`).

### Radius clamping (ADR-0007)

Rule: **local proportional reduction per edge** (`DERIV-local-radius-clamp`).

- Two corners with the same radius on a too-short edge → each stops at the middle.
- A single corner pushed to the maximum → the arc covers the whole edge, and goes no further.
- Never an "anti-corner": the arcs of one edge never overlap.
- No error message: the effective value simply caps.
- Only the vertices adjacent to a conflicting edge are reduced.
- A spike — a vertex where the contour turns back on itself — is today consumed by its fillet; whether it should keep its point is open (Q16).

Storing the value (Q8, settled):

- The model keeps the **requested** radius (e.g. 1000).
- The **effective** radius is derived at every evaluation (e.g. 100 on a 100 square), never stored (ADR-0003).
- Enlarging the shape makes the rounding grow up to the requested value.
- Interface: show the requested value and signal the effective value when they differ.

### Useful special case

- Square of side `c` + radius `c/2` on all 4 corners = **circle**. The circle is therefore not a primitive: it is a rounded square.
- Same for a regular polygon with maximal radius: it tends to its inscribed circle.

## 3. Creation tools

### Rectangle

- Parameters: `width`, `height` (integers ≥ 0; negative forbidden, 0 allowed — Q15) and a global corner `radius` (integer ≥ 0; 0 = sharp corners). A radius larger than the rectangle is valid: it is clamped, not refused (ADR-0007); the requested value is kept (Q8).
- Result: contour of 4 vertices.

### Regular polygon

Functional reference: Inkscape's Star/Polygon tool.

- Parameters: number of corners `n ≥ 3`, maximum `width` and `height` (integers), optional global radius.
- Examples: `n=3` equilateral triangle, `n=4` square, `n=5` pentagon, `n=6` hexagon.
- Rule: the shape fills as much of the `width × height` box as possible **without exceeding it**.
- Derived vertices (cos/sin): not integers. They are **computed**, not stored (ADR-0003). `n`, `width`, `height` are stored.

**Chosen mode: uniform** (`DERIV-regular-polygon-fit`).

- The shape stays regular.
- It touches the width, the height, or both, depending on `n` and the ratio `w/h`.
- Default orientation: **flat base** (horizontal bottom edge). `n=4` gives a square, not a diamond.
- Fitted on the sharp-cornered polygon; the corner radius then rounds inwards.

### Text

- Exception to "everything is a path": native `<text>` (ADR-0002).
- Parameters: content, font, integer size, anchor (start / middle / end), color.
- Reason: converting text to paths requires reading font files, hence a library or a heavy home-made parser.

### Out of scope (symbols)

- **Pen** and **freeform drawing** in the Symbol Editor: contrary to the "logical" principle.
- **Bézier curves**, Figma's **Bend** tool, handle **mirroring** in symbols (ADR-0001).
- **Corner smoothing** (Figma squircle smoothing): produces Béziers.

Static drawings of the View Editor follow other rules (§8).

## 4. Node editing

See `interaction.md` §3.

## 5. Boolean operations

Functional reference: Inkscape's Path menu (`REF-INKSCAPE-BOOL`).

| Operation    | French            | Result                                          |
| ------------ | ----------------- | ----------------------------------------------- |
| Union        | Union             | area covered by at least one shape              |
| Difference   | Différence        | bottom shape minus top shape                    |
| Intersection | Intersection      | common area                                     |
| Exclusion    | Exclusion         | area covered by exactly one shape (XOR)         |
| Division     | Division          | bottom shape cut into pieces by the top outline |
| Cut path     | Découpe de chemin | outlines cut at intersections, without fill     |

Reference algorithms: `REF-MARTINEZ-2009` (sweep line, O((n+k) log n), holes and multiple shapes), `REF-GREINER-HORMANN` (simpler, tricky degenerate cases). An extension to circular arcs is needed.

**Chosen mode: non-destructive** (ADR-0006).

- An operation creates a boolean node `{ operation, operands[] }`; the operands stay integer and editable.
- The result (fractional vertices) only exists in the derived geometry, never in the model.
- The operands' corner radius is applied before the operation.
- **Shape Builder** tool (reference: Inkscape 1.3, `REF-INKSCAPE-SHAPEBUILDER`): non-destructive version, a region is stored as "inside A, outside B…".
- No destructive flattening in v1.
- Corner radius on the new vertices of a result: not available in v1 (Q9).

## 6. Strokes

The stroke is **computed as a path**, not through the SVG `stroke` property (ADR-0002).

| Property            | Values                     | Note                                                          |
| ------------------- | -------------------------- | ------------------------------------------------------------- |
| Width               | integer ≥ 0                | —                                                             |
| Alignment           | `inner`, `center`, `outer` | model of the W3C `stroke-alignment` draft (`REF-SVG-STROKES`) |
| Join                | `miter`, `round`, `bevel`  | + miter limit, as in SVG (`REF-SVG2-PAINT`)                   |
| Cap (open contours) | `butt`, `round`, `square`  | —                                                             |
| Dashes              | pattern of integers        | exact arc length: `r × θ`                                     |

Rules:

- Open contour: alignment ignored (no inside), as in design tools (`REF-SVGWG-957`).
- Advantage of the segments + arcs scope: **the offset of a circular arc is a concentric circular arc**. The offset is therefore exact, without approximation.
- Geometry: offset of the contour at ±width, then the ring between both contours.

## 7. Shape tree

See `interaction.md` §6.

## 8. Static drawings

- Made by business users in the View Editor, with **more freedom** than symbols but few options.
- A drawing has no parameter and no animation. Selecting a group and saving it creates a drawing.
- Drawings go into a **drawing library shared between projects**, so that the same drawings are reused from one synoptic view to another.
- Curves are allowed **only** in drawings (Q12, ADR-0018): a Figma-like pen places points, and dragging a point pulls Bézier handles. Symbols keep ADR-0001 (segments and arcs only).
