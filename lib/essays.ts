import matter from "gray-matter";

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const essaySources = import.meta.glob<string>("/content/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export type Essay = {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  content: string;
};

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

function sourceText(value: unknown): string {
  if (typeof value === "string") return value;
  if (
    value &&
    typeof value === "object" &&
    "default" in value &&
    typeof value.default === "string"
  ) {
    return value.default;
  }
  return "";
}

function slugFromKey(key: string): string | null {
  const name = key.split("/").pop() ?? "";
  if (!name.endsWith(".md")) return null;
  const slug = name.slice(0, -3);
  return SLUG.test(slug) ? slug : null;
}

function listEssays(): Essay[] {
  const essays: Essay[] = [];

  for (const [key, value] of Object.entries(essaySources)) {
    const slug = slugFromKey(key);
    if (!slug) continue;

    const { data, content } = matter(sourceText(value));
    essays.push({
      slug,
      title:
        typeof data.title === "string" && data.title.trim()
          ? data.title.trim()
          : slug,
      description:
        typeof data.description === "string" ? data.description.trim() : "",
      date: toIsoDate(data.date),
      content,
    });
  }

  return essays.sort((a, b) => {
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
  return listEssays().find((essay) => essay.slug === slug) ?? null;
}

export async function getEssays(): Promise<Essay[]> {
  if (process.env.NODE_ENV === "development") return listEssays();
  return cachedEssays();
}

export async function getEssay(slug: string): Promise<Essay | null> {
  if (process.env.NODE_ENV === "development") {
    return listEssays().find((essay) => essay.slug === slug) ?? null;
  }
  return cachedEssay(slug);
}
