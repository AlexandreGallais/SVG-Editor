---
name: review
description: Run the epic review (REV story) — plain-language epic report, guided user test, Product Owner feedback, backlog adjustments. Use when all features of an epic are validated, or for a story of type REV. Also use for the demo page of a feature validation (VAL).
argument-hint: "[REV id, or VAL id for a feature demo]"
---

# Epic review (and feature demo)

Target: $ARGUMENTS. Decision: ADR-0023. Writing rules: `docs/guide/README.md`.

## Feature demo (VAL)

1. Write `docs/guide/<feature-slug>.md` from `docs/guide/_feature-demo.md`: what the user can do, the ideas with every term explained, pictures produced by the library, a guided test with expected results, limits.
2. Check every step of the guided test yourself in the playground (`npm run dev`) or by tests; replay the feature's acceptance criteria.
3. List the page in `docs/guide/README.md`; open the pull request; ask the Product Owner to run the guided test and to write their feedback (in French if they prefer: it is quoted, not translated).
4. Feedback that reveals a misunderstanding: record it, propose stories or domain changes, never adjust silently.

## Epic review (REV)

1. Write `docs/guide/<epic-slug>.md` from `docs/guide/_epic-report.md`: one paragraph summary, feature by feature with links to their demo pages, terms, a user test crossing all features, decisions in plain words, limits.
2. Re-run every guided test of the epic's features on the current `main`: a regression is a finding.
3. Prepare questions for the Product Owner: closure criteria of the epic met? anything built that they did not mean? next epic still the right one?
4. Record the answers in the report's feedback section; turn changes into backlog items and domain updates (Product Owner decides priority).
5. Explain to the Product Owner in French, in plain words, in the summary message; offer to walk through the playground together.
