# Symbols, views and pipes

## 1. Symbol

- A symbol = a `<g>` group containing:
  - a **shape tree** (see `interaction.md` §6)
  - **ports**
  - **parameters** with default values
- No SVG `<symbol>` / `<use>` element: symbol behavior is carried by the model, rendering stays a `<g>`.
- Symbol origin: integer reference point for placement.

## 2. Ports (connection points)

| Property       | Description                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | unique identifier within the symbol                                                                                                            |
| Position       | integer point, relative to the symbol origin                                                                                                   |
| Exit direction | `N`, `E`, `S`, `W` — needed by orthogonal routing (the pipe leaves the port perpendicularly to the edge); rotates with the instance (ADR-0008) |
| Count          | free; e.g. a pump usually has 2, sometimes more                                                                                                |

## 3. Parameters

A parameter = name, type, default value, **binding** to a property of a shape of the symbol.

| Type      | Binding example                                                |
| --------- | -------------------------------------------------------------- |
| `color`   | fill or stroke of a shape                                      |
| `number`  | stroke width, text size                                        |
| `text`    | content of a text                                              |
| `boolean` | visibility of a shape or sub-group                             |
| `enum`    | state (e.g. running / stopped / fault) → set of applied values |

The Symbol Editor declares the parameters. The View Editor only fills them in.

## 4. Presets (business types)

- Preset = symbol + set of parameter values + **business name**.
- Example: symbol "text box" → presets "Pressure sensor", "Temperature sensor", "Flow sensor".
- Goal: the view designer handles business objects, not shapes.
- An instance of a preset can still have its parameters changed.

## 5. Synoptic view (View Editor)

- Contains: instances of symbols or presets, pipes.
- Allowed on an instance: position (integer), parameter values.
- Forbidden: changing the symbol's geometry.
- Duplicating instances: yes (e.g. N sensors from the same symbol).
- Instance rotation: **quarter turns only** (ADR-0008).
  - Stored as an integer `q ∈ {0, 1, 2, 3}`.
  - Pivot: the symbol origin, to stay on integers.
  - Port directions rotate with the instance.

## 6. Pipes

### Drawing

- **Orthogonal only**: horizontal and vertical segments (ADR-0004).
- Creation: click a port → click another port.
- Initial path: automatic routing avoiding the symbols (`REF-WYBROW-2009`, `REF-MARRIOTT-2014`).
- The pipe stays attached to its ports and **follows the symbols when they move**.
- Manual editing: dragging a segment moves it **perpendicularly** to its direction (draw.io behavior); neighboring segments adapt.
- Rounded bends: optional, same mechanism as the corner radius of shapes.

### Conventions from industrial diagrams (P&ID)

| Convention                                                              | Source                             |
| ----------------------------------------------------------------------- | ---------------------------------- |
| Process lines horizontal and vertical, drawn cleanly                    | `REF-PID-LECTURE`                  |
| Crossing: the horizontal line is continuous, the vertical one is broken | `REF-PID-LECTURE`                  |
| Horizontal lines dominate; main flow from left to right                 | `REF-PID-LECTURE`, `REF-EDRAW-PID` |
| Line weight by hierarchy (main process > secondary > utilities)         | `REF-EDRAW-PID`                    |

Standards to consult to go further: `REF-ISO-10628`, `REF-ISA-5-1`, `REF-ISA-101`, `REF-TOGHRAEI`.

### Diagonals (45°)

Excluded in v1:

- Process diagram conventions use horizontal and vertical lines.
- The reference routing algorithms are orthogonal.
- Can be reintroduced later through a dedicated ADR, as an explicit option.

## 7. Export (Q5)

To be defined: symbol format (SVG + JSON metadata? JSON only?) and view format.
