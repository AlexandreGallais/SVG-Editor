# Backlog

The project's work is planned **in the repository**, as Markdown files: no Jira, no Azure DevOps. The method is the four-level hierarchy Epic → Feature → Story → Task (SAFe levels on top of Scrum, as in Azure Boards' Agile process), adapted from the user's methodological note.

**No iterations.** The project is run at home, without sprints: items flow through their statuses one at a time. Scrum's events (planning, review, retrospective) are replaced by two moments: **refinement** (writing and splitting) and **acceptance** (the Product Owner accepts a story or validates a feature).

The structure is **checked by a test** (`backlog.test.ts`): unique IDs, valid statuses, every story has a feature, every feature has an epic.

## Roles in this project

| Role          | Who                         | Does                                                                                              |
| ------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| Product Owner | the user                    | writes and prioritizes epics, defines features with the team, accepts stories, validates features |
| Scrum Master  | Claude Code                 | keeps the backlog and its links, prepares refinement, checks the method                           |
| Developers    | Claude Code (with the user) | split features into stories and stories into tasks, implement, test, demonstrate                  |

The Product Owner is one person (`REF-SCRUM-GUIDE`). Claude Code never sets an epic or a feature to `ready`, nor a story to `done`, without the user's explicit agreement.

## The four levels

```
EPIC          complete business need
└─ FEATURE    capability the user can see and test
   ├─ STORY   one behavior, finished and accepted on its own
   │  └─ TASK one unit of work (≤ 1 day)
```

| Level   | File                                              | Written by                                            | Validated by  |
| ------- | ------------------------------------------------- | ----------------------------------------------------- | ------------- |
| Epic    | `epics/E01-slug.md`                               | Product Owner (drafts may be proposed by Claude Code) | Product Owner |
| Feature | `features/F01-slug.md`                            | Product Owner with the team                           | Product Owner |
| Story   | `stories/US-001-slug.md`, `EN-…`, `SP-…`, `VAL-…` | developers                                            | Product Owner |
| Task    | checklist inside its story file                   | developers                                            | the developer |

## Rules

1. **Every item has a parent**: story → feature → epic.
2. **Vertical slice**: a feature or a user story describes an observable behavior, never an isolated layer ("the geometry", "the tests").
3. **A story is small**: finished, tested and accepted on its own, in a few working sessions at most. Without sprints, this replaces Scrum's "done within one sprint" (`REF-SCRUM-GUIDE`). It meets INVEST (`REF-HUMANIZING-SPLITTING`). Too big → split by behavior (simple case first, then variants), never "part 1 / part 2".
4. **Story types** (`REF-SAFE-STORY`): `US` user story (user-visible behavior), `EN` enabler (exploration, architecture, infrastructure, compliance — e.g. a geometric function and its derivation), `SP` spike (time-boxed study, its acceptance criteria are the questions), `VAL` feature validation (end-to-end check of a feature's criteria).
5. **Acceptance criteria**: Given / When / Then, one block per case, each observable.
6. **Feature plan**: once a feature is refined, a table maps each acceptance criterion to the stories that realize it and to the story that verifies it, in delivery order.
7. **A task is ≤ 1 day**, one verifiable result, estimated in hours (`REF-SCRUM-GUIDE`: work items of one day or less); stories are estimated in points.
8. **Definition of Done**: [conventions](../conventions/) — `npm run check` green, docs updated, demonstrated in the playground or by tests, accepted by the Product Owner.
9. **One story in progress at a time**; an abandoned story is set to `dropped` with the reason, never renamed "part 2".
10. **Commits reference the backlog** through footers (`Refs:`, `Closes:`, see [Git workflow](../tooling/git-workflow.md)).

## Statuses

| Item          | Statuses                                                  |
| ------------- | --------------------------------------------------------- |
| Epic, feature | `draft` → `ready` → `in-progress` → `done`                |
| Story         | `draft` → `ready` → `in-progress` → `done` (or `dropped`) |

The order of the files in a folder is not the priority: the Product Owner's order lives in the parent's table (epics in `epics/README.md`, features in their epic, stories in their feature).

## Files

Every item is a Markdown file starting with a front-matter block (`key: value` lines, no nesting). Templates: `_epic.md`, `_feature.md`, `_story.md` in this folder (not published on the site).

| Field    | Epic  | Feature     | Story                                   |
| -------- | ----- | ----------- | --------------------------------------- |
| `id`     | `E01` | `F01`       | `US-001`, `EN-001`, `SP-001`, `VAL-001` |
| `title`  | ✔     | ✔           | ✔                                       |
| `status` | ✔     | ✔           | ✔                                       |
| parent   | —     | `epic: E01` | `feature: F01`                          |
| other    | —     | —           | `points`                                |

## Workflow

1. **Write** (now): epics, then features, then stories — everything is written before implementation starts.
2. **Refine**: split the next feature into stories, write its feature plan, set what the Product Owner agrees to `ready`.
3. **Implement**: one `ready` story at a time, tasks checked off, Definition of Done.
4. **Accept**: the Product Owner accepts the story; when a feature's `VAL` story is accepted, the feature is `done`.

| Index                   | Content                                |
| ----------------------- | -------------------------------------- |
| [epics](./epics/)       | business needs                         |
| [features](./features/) | capabilities                           |
| [stories](./stories/)   | small, accepted-on-their-own behaviors |
