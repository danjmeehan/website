# Requirements Document: Personal Executive Hub & Portfolio

## 1. Project Overview & Objective

* **Goal:** Build a minimalist, typography-driven personal web application to serve as a digital home base for professional writing and technical project showcases.
* **Target Audience:** Executive recruiters, peer product leaders, and tech professionals evaluating a unique blend of startup execution, product economics, and technical depth.

## 2. Functional Requirements

* **Single-Page Index** `/`**):**
  * Opens directly on the Writing section. No visible hero or executive-bio heading. The Writing and Projects labels each have a small emoji to the left (✍️ and ✨).
  * The executive bio (Director of Product @ LexisNexis; bridging agile flow and enterprise governance) is the document meta description only, not page copy.
  * Features a clean list or tiled layout of long-form essays (starting with *Be Selfish for the Rest of Us*).
  * Features a dedicated project showcase section highlighting the virtual running coach app (tech stack, AI/agentic development insights).
  * Provides minimal footer links to external profiles (LinkedIn, GitHub, email), each with a small monochrome line icon to the left of the label.
* **Dedicated Essay & Project View** `/writing/[slug]`**):**
  * Renders markdown-based essays into a distraction-free, beautifully formatted reading view.
  * **Image Support:** Fully supports embedded images within Markdown posts (e.g., `![Alt Text](/images/filename.png)` or remote URLs) with responsive sizing and clean margins.
  * A blockquote that starts with an emoji renders as a callout panel. Other blockquotes stay quotations.

## 3. Non-Functional & Design Requirements

* **Aesthetics:** Clean, restrained, and intentional. Avoid heavy corporate hero sections or multi-page bloat. Focus on typography, whitespace, and high readability.
* **Tech Stack:** Next.js (App Router), TypeScript, and Tailwind CSS.
* **Content Management:** Static local Markdown files `.md`) to keep infrastructure lightweight with zero database overhead. Images stored in a public assets folder. Saving a content file during local development refreshes the open page.
* **Deployment:** Hosted on Vercel, pointing to a custom domain managed via Squarespace Domains.

## 4. Out of Scope (For Now)

* Complex CMS integrations or user authentication/commenting systems.
* Expansive multi-category archives or heavy corporate branding pages.