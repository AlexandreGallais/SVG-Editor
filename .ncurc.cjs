// npm-check-updates: every dependency must be on its latest version (`npm run deps:outdated`).
// TypeScript stays on 6.0.x until typescript-eslint supports 7 (ADR-0009): patch upgrades only.
module.exports = {
  target: (name) => (name === "typescript" ? "patch" : "latest"),
  errorLevel: 2,
};
