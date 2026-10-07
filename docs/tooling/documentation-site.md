# Documentation site

## Stack

- **VitePress** (`REF-VITEPRESS`): the `docs/` folder is the site. `npm run docs:dev` serves it, `npm run docs:build` builds it in `docs/.vitepress/dist/`.
- **TypeDoc** + `typedoc-plugin-markdown` + `typedoc-vitepress-theme` (`REF-TYPEDOC-MARKDOWN`): one Markdown page per exported symbol of `src/index.ts`, generated in `docs/api/` (not committed) with its sidebar. Each page shows the TSDoc: description, formula, `@kind`, parameters, `@see`. Types link to their pages, so one navigates from function to function.
- TypeDoc runs with `treatWarningsAsErrors` and validation of undocumented or unexported symbols: an incomplete TSDoc fails the docs build.

## Layout

| Folder               | Section of the site |
| -------------------- | ------------------- |
| `docs/index.md`      | home                |
| `docs/domain/`       | Domain              |
| `docs/adr/`          | Decisions           |
| `docs/conventions/`  | Conventions         |
| `docs/tooling/`      | Tooling             |
| `docs/derivations/`  | Derivations         |
| `docs/research/`     | Research            |
| `docs/references.md` | References          |
| `docs/api/`          | API (generated)     |

Sidebar entries are built from the Markdown files of each folder (title = first `#` heading); `README.md` files are served as the folder's index. Dead links fail the build.

## Writing pages

- English, Markdown, one `#` title per page.
- Link with relative Markdown links (`[ADR-0011](../adr/0011-function-kinds.md)`) so that VitePress checks them.
- Never write double curly braces in a page, even in inline code: VitePress evaluates them as a Vue expression. Use a fenced code block or wrap the text in `<span v-pre>`.

## PDF

Neither VitePress nor Docusaurus exports PDF natively; both rely on community tools (`vitepress-export-pdf`, last published in 2023 as a beta). This is not a reason to switch to Docusaurus. PDF export is **not set up yet**: when needed, the options are a maintained VitePress PDF plugin, or printing the built site with a headless browser. Decision to take then, through an ADR.
