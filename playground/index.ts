/**
 * Mounts the playground. The library has no feature yet: the page only confirms that the
 * development server, TypeScript and the public API wiring work.
 *
 * @kind procedure
 * @param document - page document
 * @see docs/tooling/commands.md
 */
function mountPlayground(document: Document): void {
  document.querySelector("#status")?.replaceChildren("Library ready — no feature implemented yet.");
}

mountPlayground(document);
