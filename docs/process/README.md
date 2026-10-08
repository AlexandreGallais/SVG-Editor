# Process

How the project inspects itself and adapts (ADR-0023). The backlog method is in [backlog](../backlog/); the feature frame in ADR-0020.

## Cadences

| When               | What                                                                                   | Who                       | Output                                                                             |
| ------------------ | -------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------- |
| any time           | write an idea, an irritant or a lesson                                                 | both                      | a row in the [improvement log](./improvements.md)                                  |
| start of a feature | refinement interview, research spike `SP`                                              | both, then agent          | stories, sources                                                                   |
| end of a feature   | audit `AUD` (with light evolvability check), validation `VAL` (demo page, guided test) | agent, then Product Owner | findings, [guide](../guide/) page, feedback                                        |
| end of an epic     | review `REV`: epic report and user test                                                | agent, then Product Owner | guide report, backlog and domain changes                                           |
| end of an epic     | retrospective `RET`: way of working, evolvability, playbook                            | both                      | [retrospective record](./retrospectives/), ADRs, stories, [playbook](../playbook/) |

## Evolvability review (in every `RET`, light in every `AUD`)

Questions asked as the project grows — each answer is "nothing yet", a story, or an ADR:

1. **Size**: files and functions per layer, longest procedures, test duration, `check:all` duration. Is a layer becoming a package (monorepo ADR)?
2. **Tools**: each row of "considered for later" in [dependencies](../tooling/dependencies.md) — has its trigger happened (e.g. StrykerJS issue fixed, first npm publication, API stabilized)?
3. **Fitness functions** (`REF-FITNESS-FUNCTIONS`): which architecture rule is still only written and could be tested (layer imports, purity, size, performance budget)?
4. **Patterns**: duplicated shapes of code or docs that ask for a shared abstraction; abstractions no longer used.
5. **Agent configuration**: `CLAUDE.md` under 200 lines, rules and skills still true, guards still useful, recurring mistakes not yet covered by a check.
6. **Process**: cadences kept or too heavy; backlog tool still fit (Markdown, board, GitHub Projects).

## Folders

| Page                                 | Content                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| [improvements.md](./improvements.md) | improvement log, fed continuously, emptied by each retrospective |
| [retrospectives](./retrospectives/)  | one record per retrospective                                     |
