---
name: run
description: Autonomous run — chain the stories of an authorized scope on its feature branch, each with every check and an independent review, auto-merged into the feature branch when green, until a point that needs the Product Owner. Use only when the Product Owner explicitly starts a run ("lance F01", "enchaîne la feature").
argument-hint: "[scope, e.g. F01 or EN-005..US-003]"
---

# Autonomous run (ADR-0028)

Scope: $ARGUMENTS. Never without the Product Owner's explicit start in this conversation.

## Before the first story

1. Record the authorization in `docs/process/journal.md` (scope, date, Product Owner's words quoted) — on `main`.
2. Feature branch: `feature/f01-<topic>` exists on `origin`, or create it from up-to-date `main` (`git switch -c feature/f01-<topic> main && git push -u origin HEAD`).
3. `/triage` if issues are open: present them at the next stop, do not act on them.
4. List the scope's stories in delivery order (feature plan); stop now if the next one is `VAL`, `REV` or `RET`, or if a business question of `docs/domain/README.md` blocks it.

## For each story

1. Branch from the up-to-date feature branch: `git switch feature/f01-<topic> && git pull && git switch -c <type>/<id>-<topic>`.
2. Follow `/story` steps 2 and 4–8 (read, `ready`, tests first, one commit per task, docs, `done` in the last commit, `check:all`), with the feature branch as base everywhere `/story` says `main`.
3. **User story** (`US`): write its **Product Owner test card** in the story file, section `## Product Owner test`: steps in the playground, expected result of each, terms explained in plain words, what to look at closely.
4. **Checkpoint** (`CHK`): update docs and methods as the project grows; check consistency of code, docs, `CLAUDE.md` and rules; run the light evolvability check (`docs/process/README.md`); list the test cards written so far; log what deserves the retrospective.
5. **Independent review**: delegate to the `auditor` subagent the story's diff (`git diff feature/f01-<topic>...HEAD`), its criteria, derivations and sources; fix correctness findings; record the rest in the pull request body.
6. `gh pr create --base feature/f01-<topic> --label autonomous …` (never the label for `VAL`, `REV`, `RET`).
7. Wait for the merge: `gh pr checks <n> --watch`, then poll `gh pr view <n> --json state` until `MERGED`. Branch behind its base: `gh pr update-branch <n> --rebase`. A red check: fix on the story branch; after three failed attempts, stop.
8. `git switch feature/f01-<topic> && git pull --prune && git branch -d <branch>`; next story.

## Stop when

- the next story is `VAL`, `REV` or `RET`;
- a business question, a research request, a guardrail of `CLAUDE.md`, or an auditor finding that changes a requirement;
- a check still red after three attempts;
- the scope is finished.

## At the stop

1. Journal entry (on `main`): stories merged with their pull requests, findings, stop reason.
2. Message to the Product Owner in French (`docs/conventions/writing.md`): what was built in plain words, the **test cards to run**, findings, questions, what the next step needs from them.

## Validation (`VAL`, with the Product Owner)

1. Rebase the feature branch on `main` (`git rebase main`, `git push --force-with-lease`), `check:all` green.
2. Start the previews in the background: `npm run dev` (playground) and `npm run docs:dev` (site with the demo page); give the Product Owner the local links.
3. They run the demo and the test cards and give their account; compare it with what each card and the demo meant to show (`/review`); record gaps; fix or add stories as they decide.
4. Stop the previews. Open the **feature pull request** `gh pr create --base main --head feature/f01-<topic>` (no label); its body summarizes the stories, the audit and the Product Owner's account. The Product Owner merges it; a release follows.
5. After the merge: delete the local feature branch; prepare the next feature with the Product Owner (interview, research spike).
