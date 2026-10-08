---
name: story
description: Implement one backlog story (US, EN) from branch to pull request. Use when the Product Owner says to do the next story or names a ready story.
argument-hint: "[story id, e.g. EN-005]"
---

# Implement a story

Story: $ARGUMENTS (default: the next unfinished story of the started feature, printed by the session-start hook).

1. **Check it may start**: status `ready`, or the Product Owner's explicit go-ahead in this conversation. Otherwise stop and ask.
2. **Read**: the story, its feature (acceptance criteria, plan), the domain file, linked ADRs, derivations and `REF-*` it cites, the research note of the feature's spike. Missing business rule or source → guardrails of `CLAUDE.md`, stop format.
3. **Branch** from an up-to-date `main`, never from another story branch:
   `git switch main && git pull --prune && git switch -c <type>/<id-lowercase>-<topic>`
4. **T0 commit** if needed: status `ready` in the story file, `docs/backlog/stories/README.md` and the feature's table — `docs(backlog): set <ID> ready`, footer `Refs: <ID>`.
5. **Per task** (`T1`, `T2`…), one commit each, footer `Refs: <ID>.Tn`:
   - `math` / `geometry`: write the tests first — examples with hand-computed values justified in a comment, degenerate cases, then properties (`test.prop`); run them and see them fail;
   - implement: one function per file, kebab-case name, `@kind`, `@see` to a verified source, austere TSDoc;
   - `npm run fix`, then `npm run check`; commit tests with their implementation (the pre-commit hook needs a compiling tree).
6. **Docs** in the same task as the code they describe: `docs/domain/`, derivations, references, playground.
7. **Last commit**: tick the tasks, status `done` in the story file, the stories index and the feature's table — `docs(backlog): set <ID> done`, footer `Closes: <ID>`.
8. `npm run check:all` (the pre-push hook runs it too), `git push -u origin <branch>`, then
   `gh pr create --title "<type>(<scope>): <summary>" --body-file <filled .github/pull_request_template.md>` (not a draft).
9. Wait for the CI (`gh pr checks <n> --watch`), fix if red.
10. **Stop**: summarize to the Product Owner in French — functions with `@kind` and `@see`, sources, what was checked and how, link to the pull request. Never merge it.

After the Product Owner merged: `git switch main && git pull --prune && git branch -d <branch>`.
