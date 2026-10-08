# Process

| Level   | Opens with                                                               | Closes with                                                                                                 |
| ------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| Epic    | vision and open questions answered by the Product Owner                  | `REV` review (plain-language report, user test) and `RET` retrospective (evolvability, playbook) — ADR-0023 |
| Feature | refinement interview, `SP` research spike for all its stories — ADR-0020 | `AUD` audit with an independent reviewer, `VAL` demo page and guided test — ADR-0020, ADR-0023              |
| Story   | `ready` set by the Product Owner, its own branch                         | one commit per task, `done` in the last commit, pull request, Product Owner merges                          |

Rules that made it work:

- **No iterations**: delivery-triggered cadences instead of sprints (ADR-0017, `REF-KANBAN-GUIDE`).
- **Write everything, then implement**: epics, features and stories exist before code; refinement adjusts them.
- **Status lives in three places checked by a test**: the item, its folder index, its parent's table.
- **Merge = acceptance**: the story is `done` in its own pull request, so `main` never shows an unaccepted story as done.
- **Research before code**: a spike finds and reads every source of a feature; implementation stories are rarely blocked.
- **Audit after code**: mathematics re-derived, values recomputed, mutation spot-checks, sources re-opened, duplicates and consistency.
- **Plain language at every demo**: the Product Owner tests what they understand, not what the agent says.
- **Improvement log**: ideas are written when they happen and treated at the retrospective, not lost in a chat.
