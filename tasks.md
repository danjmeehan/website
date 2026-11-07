# Execution Roadmap: Personal Executive Hub

- [x] **Task 1: Project Initialization**

  - Initialize Next.js project with TypeScript, Tailwind CSS, and App Router structure.

  - Install dependencies `gray-matter`, `react-markdown`, `remark-gfm`, `@tailwindcss/typography`).

- [x] **Task 2: Content & Asset Structure Setup**

  - Create `content/` directory and add the markdown file for *Be Selfish for the Rest of Us* (including sample image syntax).

  - Create `public/images/` directory for storing embedded article images.

- [x] **Task 3: Layout & Home Page `app/page.tsx`)**

  - Build the minimalist, text-first index layout.

  - Implement the writings list and project showcase card (Virtual Running Coach). The index opens on Writing; the bio is metadata only.

- [x] **Task 4: Dynamic Essay Reader & Markdown Image Handling `app/writing/[slug]/page.tsx`)**

  - Implement server-side Markdown parsing.

  - Configure custom image rendering for Markdown so images scale cleanly within the prose container.

- [x] **Task 5: Polish & Deployment Prep**

  - Verify responsive mobile/desktop typography, spacing, and image rendering.

  - Configure domain routing instructions for Vercel and Squarespace DNS setup.

- [x] **Task 6: Remove the home-page hero**

  - Drop the visible executive-bio heading so the index starts at Writing.

  - Keep the bio as the document meta description in `lib/site.ts`.

- [x] **Task 7: Section label marks**

  - Add ✍️ and ✨ to the left of Writing and Projects.

  - Add monochrome line icons to the left of LinkedIn, GitHub, and Email.

- [x] **Task 8: Sparkles for Projects**

  - Use ✨ to the left of Projects.

- [x] **Task 9: Refresh on content save**

  - Import `content/*.md` through Turbopack so a save hot-reloads the open page in development.

- [x] **Task 10: Emoji callout**

  - Render a blockquote that starts with an emoji as a callout panel. Leave other blockquotes as quotations.

- [x] **Task 11: Include essay text in the production build**

  - Read `content/*.md` from disk so the deployed pages get the title and body.

  - Keep the development file watch, and trace the Markdown files into the Vercel deployment.

- [x] **Task 12: Browser tab**

  - Set the tab title to `danjmeehan`.

  - Use the monocle emoji as the favicon.
