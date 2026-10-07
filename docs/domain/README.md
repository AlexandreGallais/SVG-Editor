# Domain — index

The project's business source of truth. Every idea, rule or business decision is recorded here and kept up to date.

## Vision

Two editors built on the same `editor` library:

| Editor            | User                   | Does                                                                     | Does not                   |
| ----------------- | ---------------------- | ------------------------------------------------------------------------ | -------------------------- |
| **Symbol Editor** | symbol designer        | draws shapes, places ports, declares parameters and their default values | —                          |
| **View Editor**   | synoptic view designer | instantiates symbols or presets, sets their parameters, draws pipes      | change a symbol's geometry |

## Principles

- **Schematic**: a synoptic view must stay readable. No decorative curves.
- **Logical**: every shape is described by numbers (corners, sizes, radii), not by a hand gesture.
- **Orthogonal**: pipes are horizontal and vertical.
- **Integer**: every input value is an integer.
- **Parametric**: a symbol exposes parameters; a view only fills them in.

## Files

| File                                           | Content                                                          |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [shapes.md](./shapes.md)                       | shape model, corner radius, shape tools, booleans, strokes, text |
| [symbols-and-views.md](./symbols-and-views.md) | symbols, ports, parameters, presets, views, pipes                |
| [interaction.md](./interaction.md)             | tools, selection, node editing, snapping, alignment, tree        |

## Glossary

The French term is kept: it is the user's working vocabulary.

| Term              | French                         | Definition                                                                  |
| ----------------- | ------------------------------ | --------------------------------------------------------------------------- |
| Shape             | Forme                          | closed contour of vertices with a radius per vertex, rendered as a `<path>` |
| Vertex / Node     | Sommet / Nœud                  | point of the contour, integer coordinates                                   |
| Corner radius     | Rayon de coin                  | radius of the arc rounding a vertex                                         |
| Fillet            | Congé                          | arc tangent to both edges of a vertex                                       |
| Setback           | Recul                          | distance from the vertex to the fillet's tangent point, `r / tan(θ/2)`      |
| Stroke            | Contour                        | band of fixed width along the outline                                       |
| Stroke alignment  | Alignement du contour          | `inner`, `center`, `outer`                                                  |
| Boolean operation | Opération booléenne            | union, difference, intersection, exclusion, division, cut path              |
| Port              | Point de connexion             | point of a symbol where a pipe connects                                     |
| Pipe              | Tuyau                          | orthogonal connector between two ports                                      |
| Waypoint          | Point de passage               | bend of a pipe                                                              |
| Symbol            | Symbole                        | group (`<g>`) of shapes + ports + parameters                                |
| Parameter         | Paramètre                      | adjustable value of a symbol, with a default value                          |
| Preset            | Préconfiguration / type métier | symbol + set of parameter values + business name                            |
| Instance          | Instance                       | occurrence of a symbol or preset in a view                                  |
| View              | Vue synoptique                 | assembly of instances and pipes                                             |
| Snapping          | Magnétisme                     | automatic attachment to a remarkable position                               |
| Bounding box      | Boîte englobante               | smallest axis-aligned rectangle containing an object                        |

## Settled questions

| #   | Question                   | Decision                                        | Trace                       |
| --- | -------------------------- | ----------------------------------------------- | --------------------------- |
| Q1  | Regular polygon inside w×h | uniform, stays regular, flat base               | `DERIV-regular-polygon-fit` |
| Q2  | Booleans                   | non-destructive                                 | ADR-0006                    |
| Q3  | Radius conflict            | local proportional reduction                    | ADR-0007                    |
| Q6  | Instance rotation          | quarter turns, pivot = origin                   | ADR-0008                    |
| Q8  | Radius entered too large   | requested value stored, effective value derived | `shapes.md` §2              |

## Open questions

| #   | Question                                                                                                                                                                       | File                   |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| Q4  | Ellipses: needed? (elliptical arcs are outside the ADR-0001 scope)                                                                                                             | `shapes.md`            |
| Q5  | Export format of symbols and views                                                                                                                                             | `symbols-and-views.md` |
| Q7  | Undo / redo: command-based history, confirmed?                                                                                                                                 | `interaction.md`       |
| Q9  | Corner radius on vertices created by a boolean                                                                                                                                 | `shapes.md`            |
| Q10 | Values of `SVG_DECIMALS` (output precision) and `EPSILON` (float comparisons) — ADR-0003 names them without fixing them                                                        | `shapes.md`            |
| Q11 | Contour orientation (clockwise / counter-clockwise in SVG coordinates) and starting vertex of the rectangle and of the regular polygon — needed by booleans, offsets and tests | `shapes.md`            |
