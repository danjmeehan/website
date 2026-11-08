import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownEssay } from "@/components/markdown-essay";
import { getEssay, getEssays } from "@/lib/essays";

type EssayRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const essays = await getEssays();
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: EssayRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};

  return {
    description: essay.description || undefined,
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export const instant = false;

export default async function EssayPage({ params }: EssayRouteProps) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  return (
    <article>
      <p className="font-sans text-sm">
        <Link
          href="/"
          className="link-mark text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-ink"
        >
          Home
        </Link>
      </p>
      <header className="mt-10">
        <h1 className="text-4xl font-medium tracking-tight text-balance sm:text-5xl sm:leading-[1.1]">
          {essay.title}
        </h1>
        {essay.date ? (
          <p className="mt-4 font-sans text-sm text-muted">
            <time dateTime={essay.date}>{formatDate(essay.date)}</time>
          </p>
        ) : null}
      </header>
      <div className="mt-10">
        <MarkdownEssay content={essay.content} />
      </div>
    </article>
  );
}
