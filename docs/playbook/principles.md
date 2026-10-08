# Principles

1. **Checks, not instructions, give control.** Every rule that matters becomes a test, a lint rule, a hook or a CI job; a written rule alone will be forgotten (ADR-0021, `REF-BOCKELER-SDD`).
2. **Every claim has a source that was read.** References are recorded with their date before the code; no source → derivation from read sources, or a research request. An agent invents plausible references: never cite from memory (ADR-0011 `@see`, ADR-0020).
3. **Evidence over assertion.** "Done" means the full check ran green and its output was seen; summaries list what was checked and how (`REF-CC-BEST-PRACTICES`).
4. **The one who did the work does not grade it.** Audits use an independent reviewer in a fresh context; tests that read files are mutation-checked (ADR-0020, ADR-0021).
5. **Small, named, pure functions.** One export per file, one kind, one source; the core is pure, effects stay in a thin shell (ADR-0011, ADR-0014, ADR-0019).
6. **Business rules belong to the Product Owner.** The agent asks instead of inventing; every answer goes to the domain docs in the same change (CLAUDE.md golden rules).
7. **Inspect at the end of every delivery.** Demo in plain language after each feature, review and retrospective after each epic (ADR-0023).
8. **Zero runtime dependency, every dev dependency justified**, latest versions, audit blocking (ADR-0009, `docs/tooling/dependencies.md`).
9. **Decisions are written once.** ADRs are superseded, never rewritten; docs say "why" once and link to it.
10. **The repository is the memory.** Backlog, decisions, sources and lessons live in versioned Markdown that the agent reloads at each session (ADR-0021, `REF-ANTHROPIC-CONTEXT`).
