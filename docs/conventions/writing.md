# Writing documentation

Short pages, one purpose each, nothing the reader does not need. Sources: Diátaxis (`REF-DIATAXIS`), Google developer documentation style guide (`REF-GOOGLE-DEV-STYLE`).

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

## Where things go

| Content                                  | Place                                                  |
| ---------------------------------------- | ------------------------------------------------------ |
| business rule                            | `docs/domain/`                                         |
| structural decision and its alternatives | new ADR                                                |
| code rule                                | `docs/conventions/` (and the ESLint rule enforcing it) |
| tooling procedure                        | `docs/tooling/`                                        |
| planned work                             | `docs/backlog/`                                        |
| source                                   | `docs/references.md` row, cited by ID                  |
