# Technical Design: Personal Executive Hub & Portfolio

## 1. Architecture & Tech Stack

* **Framework:** Next.js 14+ (App Router) using React and TypeScript.

* **Styling:** Tailwind CSS with `@tailwindcss/typography` plugin for clean editorial reading views.

* **Content Source:** Local static Markdown `.md`) files for essays.

* **Asset Management:** Public directory `/public/images/`) for storing article images referenced in Markdown files.

* **Deployment:** Vercel, mapped to custom domain managed via Squarespace Domains.

* **Browser chrome:** The document title is `danjmeehan` on every page. `app/icon.png` is the monocle emoji, used as the favicon.

## 2. Page Structure & Routing

* *`app/page.tsx` (Index / Home):**

  * Single-page editorial layout. The page opens on the Writing section; there is no hero or visible bio.

  * The executive bio in `lib/site.ts` is used only as the document meta description.

  * Featured Writing Section: Links to long-form essays. The "Writing" label is the page's `h1`, with a ✍️ mark to its left.

  * Projects Section: Highlights virtual running coach app. The label has a ✨ mark to its left.

  * Footer: Links to LinkedIn, GitHub, and email. Each label has a `currentColor` line icon (`linkedin`, `github`, `email` on the link in `lib/site.ts`), rendered in `components/site-footer.tsx`. The same footer appears on essay pages.

* *`app/writing/[slug]/page.tsx` (Essay View):**

  * Dynamic route rendering individual Markdown essays.

  * Custom component mapping for `react-markdown` to ensure images `<img>`) are rendered responsibly with Tailwind max-widths and rounded borders.

  * A blockquote whose text starts with an emoji renders as a rounded callout (`aside`). Other blockquotes keep the quotation rule.

## 3. Data Flow & Component Hierarchy

* `content/` directory holds `.md` files with front-matter. `lib/essays.ts` reads those files from disk, and the production build traces `content/**/*.md` so the essay text is included on Vercel. In development, `import.meta.glob` also watches the files so a save hot-reloads the open page. Production caches the parsed essays.

* `public/images/` holds static assets.

* Utility helper parses Markdown, passing custom renderers to handle images cleanly within the Tailwind typography container `prose`).