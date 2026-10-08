# Writing documentation

Short pages, one purpose each, nothing the reader does not need. Sources: Diátaxis (`REF-DIATAXIS`), Google developer documentation style guide (`REF-GOOGLE-DEV-STYLE`), Microsoft Writing Style Guide (`REF-MS-STYLE`), Write the Docs (`REF-WTD-STYLE`), plain language (`REF-PLAIN-LANGUAGE`). A style guide records decisions so that every page sounds the same (`REF-WTD-STYLE`): when in doubt, follow this page, then Google's guide.

## One page, one type (Diátaxis)

| Type        | Answers                | Here                                                                        |
| ----------- | ---------------------- | --------------------------------------------------------------------------- |
| Reference   | "What is it, exactly?" | API pages (TSDoc), [references](../references.md), tables in `conventions/` |
| Explanation | "Why is it like this?" | ADRs, derivations, `domain/`                                                |
| How-to      | "How do I do X?"       | `tooling/`, "Changing a rule" sections                                      |
| Tutorial    | "Teach me"             | none yet                                                                    |

Do not mix them: a reference page does not explain, it **links** to the explanation.

## API reference (TSDoc) — austere

Clicking a function shows only what is needed to use it:

1. one sentence saying what it returns or does;
2. the formula, when there is one;
3. `@param` / `@returns` fragments (unit, range, convention: `radians, in ]0, π[`);
4. `@see` to the source — the reader follows it for the "why" and the "how".

No tutorial, no history, no design discussion, no restating of the name (`jsdoc/informative-docs`). If more is needed, it belongs in an ADR, a derivation or the domain, cited by `@see`.

## Style

- English, present tense, active voice, second person for instructions ("run `npm run fix`").
- Sentence-case headings; one `#` title per page.
- Short sentences; one idea per bullet; tables for comparisons and catalogs.
- Code, file names, commands and identifiers in `code font`.
- Dates as `YYYY-MM-DD`.
- No filler ("simply", "just", "obviously"), no marketing, no speculation.
- Link instead of repeating: each fact lives in one place (CLAUDE.md summarizes and links).

## Voice

- **Lead with the point**: the first sentence says what the page or section gives; keywords first, for scanning (`REF-MS-STYLE`).
- **Start statements with a verb** when giving an action ("Run…", "Set…"); cut "you can", "there is", "there are".
- **Sentence-case headings, no end punctuation**; serial comma in lists of three or more (`REF-MS-STYLE`, `REF-GOOGLE-DEV-STYLE`).
- **Same thing, same word**: use the word list below; never vary a term for style.
- Reference and convention pages: austere, no contractions. Guide pages: plain language, contractions allowed, a definition at the first use of each term (`REF-PLAIN-LANGUAGE`).
- House style (deliberate deviation from Microsoft and Google): the em dash keeps a space on each side ( — ), as already used across the docs.

## Word list

The [glossary](../domain/) defines the domain terms; this list fixes the words used to write about them.

| Use              | Not                                         | Note                                                                                                                                     |
| ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| corner radius    | border radius, rounding                     | the requested value; "effective radius" for the clamped one                                                                              |
| fillet           | round, curve                                | the arc replacing a corner                                                                                                               |
| setback          | offset, inset                               | distance from a corner to a tangent point                                                                                                |
| contour          | outline, polygon (for the list of vertices) | closed list of vertices, clockwise; in French messages say « contour fermé de sommets »: the glossary translates _stroke_ as « contour » |
| vertex, vertices | point, node (in geometry)                   | the glossary pairs Vertex / Node; in prose write "vertex", "node" only for node editing                                                  |
| path data        | `d` string, path string                     | the `d` attribute of `<path>`                                                                                                            |
| Product Owner    | PO, client, user (for the Product Owner)    | "user" means the end user of the tools                                                                                                   |
| story, task      | ticket, issue (for backlog items)           | "issue" only for GitHub issues                                                                                                           |
| pull request     | PR, merge request                           |                                                                                                                                          |
| playground       | demo app, sandbox                           |                                                                                                                                          |

## Page skeletons

| Page               | Sections, in order                                                               |
| ------------------ | -------------------------------------------------------------------------------- |
| folder `README.md` | one sentence of purpose; table of pages                                          |
| ADR                | Status; Context; Decision; Consequences; References                              |
| derivation         | statement and domain; steps, each citing a read source; cross-check; check table |
| research note      | date and origin; findings per topic with `REF-*`; retained table                 |
| guide page         | templates `docs/guide/_feature-demo.md`, `_epic-report.md`                       |
| backlog item       | templates `docs/backlog/_*.md`                                                   |

## Messages to the Product Owner

The Product Owner reads in French and dictates by voice; every end-of-task message has the same shape:

1. **Result** in one sentence: done, partly done, or blocked.
2. **What changed**: bullets or a table, user-visible effect first; each technical word explained at first use.
3. **Evidence**: checks run and their result (`check:all`, CI, a guided test), links to the pull request or commits.
4. **Decisions needed**: numbered questions, each answerable by yes / no or a choice, with a recommendation.
5. **Next step**, and what is waiting for the Product Owner.

No raw logs; quote the one line that matters. Questions that need an answer come last, so they are not lost.

## Checked by ESLint

Markdown pages are linted by `@eslint/markdown` (`eslint/rules/markdown/structure.ts`): heading levels, one `#` title, code block languages, no bare URL, no missing link fragment, table column counts. Layout is Prettier's.

## Where things go

| Content                                  | Place                                                  |
| ---------------------------------------- | ------------------------------------------------------ |
| business rule                            | `docs/domain/`                                         |
| structural decision and its alternatives | new ADR                                                |
| code rule                                | `docs/conventions/` (and the ESLint rule enforcing it) |
| tooling procedure                        | `docs/tooling/`                                        |
| planned work                             | `docs/backlog/`                                        |
| source                                   | `docs/references.md` row, cited by ID                  |
