# Research protocol

Goal: every function, rule or decision is justified by an identified source. This page says **where to look**, **in which order**, and **when to stop and ask**.

## 1. Search order (escalation)

| Level | Where                                                                     | If insufficient |
| ----- | ------------------------------------------------------------------------- | --------------- |
| 1     | `docs/domain/`                                                            | level 2         |
| 2     | `docs/adr/`                                                               | level 3         |
| 3     | `docs/derivations/`, `docs/references.md`, `docs/research/notes/`         | level 4         |
| 4     | Primary external sources through WebSearch / WebFetch (when available)    | level 5         |
| 5     | Reference implementations, **read only** (see §4)                         | level 6         |
| 6     | **STOP.** Write a request in `research/requests/` and hand it to the user | —               |

Every level-4 or level-5 finding is recorded in `research/notes/` and in `docs/references.md` **before** writing code.

## 2. Source reliability hierarchy

1. Normative specification (W3C, ISO, ISA)
2. Peer-reviewed paper
3. Reference book
4. Official software documentation (Figma, Inkscape, draw.io)
5. Open-source code
6. Blog, forum, course material — **never as the only source**

Two concurring sources of level ≥ 4 are required for an interface behavior rule.

## 3. Topic map

| Topic                            | Internal first                       | External next                                                                           |
| -------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| Vectors, orientation, predicates | `math/`                              | `REF-SHEWCHUK-1997`, `REF-KETTNER-2008`, `REF-OROURKE`                                  |
| Segment / arc intersections      | —                                    | `REF-SCHNEIDER-EBERLY`, `REF-BOURKE-CIRCLES`                                            |
| Corner radius, fillet            | ADR-0007, `DERIV-local-radius-clamp` | `REF-GG-FILLET`, `REF-CSS-BR`, `REF-FIGMA-CR`                                           |
| Regular polygon                  | `DERIV-regular-polygon-fit`          | `REF-INKSCAPE-POLYGON`                                                                  |
| Boolean operations               | ADR-0006                             | `REF-MARTINEZ-2009`, `REF-GREINER-HORMANN`, `REF-DEBERG`, `REF-CLIPPER2`, `REF-PAPERJS` |
| Offset, aligned strokes          | ADR-0002                             | `REF-SVG-STROKES`, `REF-SVG2-PAINT`, `REF-CHEN-MCMAINS-2005`, `REF-CLIPPER2`            |
| SVG arcs (`A`)                   | —                                    | `REF-SVG2-PATHS`, `REF-SVG2-IMPLNOTE`                                                   |
| Pipe routing                     | ADR-0004                             | `REF-WYBROW-2009`, `REF-MARRIOTT-2014`, `REF-LIBAVOID`                                  |
| P&ID / synoptic conventions      | `symbols-and-views.md`               | `REF-ISO-10628`, `REF-ISA-5-1`, `REF-ISA-101`, `REF-TOGHRAEI`                           |
| Snapping, alignment              | `interaction.md`                     | `REF-INKSCAPE-SNAP`                                                                     |
| Shape builder                    | ADR-0006                             | `REF-INKSCAPE-SHAPEBUILDER`                                                             |
| Undo / redo                      | `interaction.md`                     | `REF-GOF` (Command pattern)                                                             |
| Tooling, code style              | ADR-0009 to ADR-0016                 | [note 0001](./notes/0001-tooling-practices.md)                                          |

## 4. Licenses of reference implementations

| Project            | License     | Rule                                                           |
| ------------------ | ----------- | -------------------------------------------------------------- |
| Inkscape, libavoid | GPL / LGPL  | read to understand; **no copy, no line-by-line translation**   |
| Clipper2, Paper.js | Boost / MIT | same rule on principle: reimplement from the paper or the spec |

Project code is always justified by a level 1 to 4 source or a derivation, never by "it is done this way in X".

## 5. Research request (level 6)

When the documentation is insufficient, Claude Code:

1. stops implementing;
2. copies `requests/_template.md` to `requests/NNNN-topic.md` and fills it in;
3. asks the user to run the research in Claude (chat, web research), see §6;
4. records the answer in `notes/NNNN-topic.md`, updates `docs/references.md`, then resumes.

## 6. Running a research in Claude (chat)

Claude Code does not always have web access, and a serious bibliographic search takes reading time. When a request is open (§5), the user runs it in **claude.ai**:

| Setting                | Value                                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| Model                  | the most capable one available (Claude Opus family)                                                     |
| Mode                   | **Research** enabled, to read online sources                                                            |
| Input                  | the "Precise question" section of the request, pasted as is, followed by the "Expected deliverable"     |
| Requirement to restate | primary sources (spec, paper, book) with DOI or URL; say explicitly when a source was not read directly |

On receiving the answer, Claude Code:

1. summarizes it in its own words in `notes/NNNN-topic.md` (no copy of source text);
2. adds every source to `docs/references.md`: **`[verified] YYYY-MM-DD`** only if it was read (by Claude Code through WebFetch, or attested as read by the answer); otherwise **`[unverified]`**;
3. sets the request status to "done".

## 7. Research done by Claude Code itself

When WebSearch / WebFetch are available, Claude Code may do levels 4 and 5 without a request. Same recording: note in `notes/`, dated entry in `docs/references.md`, **before** the code. Example: [note 0001](./notes/0001-tooling-practices.md).
