import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Turbopack watches these imports in development, so saving a Markdown file
// refreshes the open page. Production reads the files from disk instead.
const watchedEssayFiles =
  process.env.NODE_ENV === "development"
    ? import.meta.glob("/content/*.md", {
        eager: true,
        query: "?raw",
      })
    : null;

export type Essay = {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  content: string;
};

function essayPath(slug: string) {
  const resolved = path.resolve(CONTENT_DIR, `${slug}.md`);
  const root = `${path.resolve(CONTENT_DIR)}${path.sep}`;
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function toIsoDate(value: unknown): string | null {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return null;
}

function readEssay(slug: string): Essay | null {
  if (!SLUG.test(slug)) return null;
  const fullPath = essayPath(slug);
  if (!fullPath || !fs.existsSync(fullPath)) return null;

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  return {
    slug,
    title:
      typeof data.title === "string" && data.title.trim()
        ? data.title.trim()
        : slug,
    description:
      typeof data.description === "string" ? data.description.trim() : "",
    date: toIsoDate(data.date),
    content,
  };
}

function listEssays(): Essay[] {
  if (watchedEssayFiles) {
    void Object.keys(watchedEssayFiles);
  }
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -3))
    .map((slug) => readEssay(slug))
    .filter((essay): essay is Essay => essay !== null)
    .sort((a, b) => {
      if (a.date && b.date) return b.date.localeCompare(a.date);
      if (a.date) return -1;
      if (b.date) return 1;
      return a.title.localeCompare(b.title);
    });
}

async function cachedEssays(): Promise<Essay[]> {
  "use cache";
  return listEssays();
}

async function cachedEssay(slug: string): Promise<Essay | null> {
  "use cache";
  return readEssay(slug);
}

export async function getEssays(): Promise<Essay[]> {
  if (process.env.NODE_ENV === "development") return listEssays();
  return cachedEssays();
}

export async function getEssay(slug: string): Promise<Essay | null> {
  if (process.env.NODE_ENV === "development") return readEssay(slug);
  return cachedEssay(slug);
}
