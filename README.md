# Personal site

A single-page index and Markdown essays. Content lives in `content/`. Images live in `public/images/`.

## Edit

- Bio and footer links: `lib/site.ts`. Email should use a `mailto:` address. LinkedIn and GitHub need full `https://` URLs before those labels become links.
- Project copy and stack: `lib/projects.ts`.
- Essays: one `.md` file per piece in `content/`, with `title` and optional `description` and `date` in front matter. The filename is the URL slug.
- Figures inside an essay: `![Alt text](/images/your-file.png)` or a remote `https` URL.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push this project to a Git repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new). Framework preset: Next.js. Leave the build command as `next build` and the output as the framework default.
3. In the Vercel project, open **Settings → Domains** and add the Squarespace domain, including `www` if you want that host too.
4. Vercel shows the DNS records to create. Use those values if they differ from the defaults below.

## Point a Squarespace domain at Vercel

Squarespace keeps the registration. Vercel serves the site. In Squarespace: **Domains → your domain → DNS → DNS Settings**.

Remove any existing website records that already claim the apex (`@`) or `www` host. Then add:

| Host | Type | Value |
| --- | --- | --- |
| `@` | A | `76.76.21.21` |
| `www` | CNAME | `cname.vercel-dns.com` |

Save, then wait for Vercel to mark the domain as valid. DNS can take a few minutes and sometimes longer. After it validates, set the primary host in Vercel (apex or `www`) so the other host redirects to it.
