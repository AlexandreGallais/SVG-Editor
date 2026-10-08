# Domain — index

The project's business source of truth. Every idea, rule or business decision is recorded here and kept up to date.

## Vision

Four tools built on the same `editor` library, from geometry to business use:

| Tool                                   | User                                   | Does                                                                                                                                                                 | Does not                                                                          |
| -------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Symbol Editor**                      | symbol designer                        | draws the shapes of a symbol with strict, numeric tools; places ports; declares the animatable parts                                                                 | business meaning, business rules                                                  |
| **Configurator**                       | business configurator                  | builds configuration trees: interfaces, property groups, default values, rules driving the symbol's animations; defines business types and business symbol libraries | change a symbol's geometry                                                        |
| **View Editor**                        | business user (synoptic view designer) | places business symbols (quarter turns), overrides default values with a live preview, chooses which configured properties show in pop-ups, draws pipes              | add a property that the configuration does not define; change a symbol's geometry |
| **Drawing tools** (in the View Editor) | business user                          | draws static drawings with more freedom; saves them into a drawing library shared between projects                                                                   | parameters, animations                                                            |

From one project to another, the same symbols can be used by different business libraries: the library gives the symbol its business meaning for that project.

## Principles

- **Schematic**: a synoptic view must stay readable.
- **Logical**: every symbol shape is described by numbers (corners, sizes, radii, angles), not by a hand gesture.
- **Orthogonal**: pipes are horizontal and vertical.
- **Integer**: every input value is an integer; derived geometry and animation values may not be.
- **Configured, not hand-made**: a view only uses what the configuration defines.

## Files

| File                                           | Content                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [shapes.md](./shapes.md)                       | shape model, rotation, corner radius, shape tools, booleans, strokes, text, static drawings |
| [symbols-and-views.md](./symbols-and-views.md) | symbols, ports, animations, views, pipes                                                    |
| [configuration.md](./configuration.md)         | configurator, configuration trees, interfaces, property groups, business types, libraries   |
| [interaction.md](./interaction.md)             | tools, selection, node editing, snapping, alignment, colors, tree                           |

## Glossary

The French term is kept: it is the user's working vocabulary.

| Term               | French                  | Definition                                                                                                       |
| ------------------ | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Shape              | Forme                   | closed contour of vertices with a radius per vertex, rendered as a `<path>`                                      |
| Vertex / Node      | Sommet / Nœud           | point of the contour, integer coordinates                                                                        |
| Corner radius      | Rayon de coin           | radius of the arc rounding a vertex                                                                              |
| Fillet             | Congé                   | arc tangent to both edges of a vertex                                                                            |
| Setback            | Recul                   | distance from the vertex to the fillet's tangent point, `r / tan(θ/2)`                                           |
| Stroke             | Contour                 | band of fixed width along the outline                                                                            |
| Stroke alignment   | Alignement du contour   | `inner`, `center`, `outer`                                                                                       |
| Boolean operation  | Opération booléenne     | union, difference, intersection, exclusion, division, cut path                                                   |
| Shape builder      | Shape builder           | tool building regions from the edges and intersections of selected shapes                                        |
| Symbol             | Symbole                 | group (`<g>`) of shapes + ports + animatable parts, without business meaning                                     |
| Animation          | Animation               | change of a symbol part driven by a property value: color, blinking, opacity, visibility, partial fill, rotation |
| Port               | Point de connexion      | point of a symbol where a pipe connects                                                                          |
| Configuration tree | Arbre de configuration  | tree of configuration nodes carrying interfaces and property groups                                              |
| Interface          | Interface               | named set of properties with rules driving a symbol's animations (e.g. `isRunning` → a zone changes color)       |
| Property           | Propriété               | typed value with a default value, member of an interface or a property group                                     |
| Property group     | Groupe de propriétés    | named list of properties used together (e.g. the pop-up group)                                                   |
| Business type      | Type métier             | node of a configuration tree, e.g. Pump → Positive displacement pump → Gear pump                                 |
| Business symbol    | Symbole métier          | symbol + selected configuration sub-trees + business name, e.g. "gear pump"                                      |
| Business library   | Bibliothèque métier     | set of business symbols used by a project                                                                        |
| Instance           | Instance                | occurrence of a business symbol in a view                                                                        |
| View               | Vue synoptique          | assembly of instances, pipes and static drawings                                                                 |
| Pipe               | Tuyau                   | orthogonal connector between two ports                                                                           |
| Waypoint           | Point de passage        | bend of a pipe                                                                                                   |
| Static drawing     | Dessin                  | static, non-parameterized drawing made in the View Editor, reusable through the drawing library                  |
| Drawing library    | Bibliothèque de dessins | drawings shared between projects                                                                                 |
| Snapping           | Magnétisme              | automatic attachment to a remarkable position                                                                    |
| Bounding box       | Boîte englobante        | smallest axis-aligned rectangle containing an object                                                             |

## Settled questions

| #   | Question                                | Decision                                                                                                                                                                      | Trace                       |
| --- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Q1  | Regular polygon inside w×h              | uniform, stays regular, flat base                                                                                                                                             | `DERIV-regular-polygon-fit` |
| Q2  | Booleans                                | non-destructive                                                                                                                                                               | ADR-0006                    |
| Q3  | Radius conflict                         | local proportional reduction                                                                                                                                                  | ADR-0007                    |
| Q5  | Storage and exchange                    | files read through a **local server** (a database of symbols, configurations, libraries, drawings); an online service may come later                                          | `configuration.md` §6       |
| Q6  | Instance rotation                       | quarter turns, pivot = origin                                                                                                                                                 | ADR-0008                    |
| Q8  | Radius entered too large                | requested value stored, effective value derived                                                                                                                               | `shapes.md` §2              |
| Q10 | Output precision and tolerance          | `SVG_DECIMALS = 5`; `EPSILON = 1e-9`                                                                                                                                          | `shapes.md` §1              |
| Q11 | Contour orientation and starting vertex | clockwise on screen (SVG frame, y down), starting at the top-left vertex; a contour is cyclic: the last vertex joins the first, and every per-vertex computation wraps around | `shapes.md` §1              |

## Open questions

| #   | Question                                                                                                 | File                      |
| --- | -------------------------------------------------------------------------------------------------------- | ------------------------- |
| Q4  | Ellipses: needed? (elliptical arcs are outside the ADR-0001 scope)                                       | `shapes.md`               |
| Q7  | Undo / redo: command-based history, confirmed?                                                           | `interaction.md`          |
| Q9  | Corner radius on vertices created by a boolean                                                           | `shapes.md`               |
| Q12 | Pen of the drawing tools: Bézier handles (Figma-like), or segments and arcs only, or no pen              | `shapes.md` §8            |
| Q13 | Rotation animation: a property value mapped to an angle, a continuous spin, or both                      | `symbols-and-views.md` §3 |
| Q14 | Configuration tree semantics: which options a selected node brings, combining sub-trees of several trees | `configuration.md` §2     |
