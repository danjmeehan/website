import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EssayMeta } from "@/components/essay-meta";
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
        <EssayMeta date={essay.date} tags={essay.tags} className="mt-4" />
      </header>
      <div className="mt-10">
        <MarkdownEssay content={essay.content} />
      </div>
    </article>
  );
}
