import Link from "next/link";
import { getEssays } from "@/lib/essays";
import { projects } from "@/lib/projects";

export default async function Home() {
  const essays = await getEssays();

  return (
    <div>
      <section aria-labelledby="writing-heading">
        <h1
          id="writing-heading"
          className="inline-flex items-center gap-2 font-sans text-xs font-medium text-muted"
        >
          <span aria-hidden="true">✍️</span>
          <span className="uppercase tracking-[0.18em]">Writing</span>
        </h1>
        {essays.length > 0 ? (
          <ul className="mt-5 divide-y divide-rule border-y border-rule">
            {essays.map((essay) => (
              <li key={essay.slug}>
                <Link
                  href={`/writing/${essay.slug}`}
                  className="group block py-5"
                >
                  <span className="text-xl tracking-tight underline decoration-transparent underline-offset-4 group-hover:decoration-ink">
                    {essay.title}
                  </span>
                  {essay.description ? (
                    <span className="mt-1 block text-base leading-relaxed text-muted">
                      {essay.description}
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-lg text-muted">Essays will be listed here.</p>
        )}
      </section>

      <section className="mt-16" aria-labelledby="projects-heading">
        <h2
          id="projects-heading"
          className="inline-flex items-center gap-2 font-sans text-xs font-medium text-muted"
        >
          <span aria-hidden="true">✨</span>
          <span className="uppercase tracking-[0.18em]">Projects</span>
        </h2>
        <ul className="mt-5">
          {projects.map((project) => (
            <li key={project.title}>
              <article className="rounded-md border border-rule px-5 py-5 sm:px-6">
                <h3 className="text-xl tracking-tight">{project.title}</h3>
                <p className="mt-3 text-lg leading-relaxed">{project.summary}</p>
                {project.stack ? (
                  <p className="mt-4 font-sans text-sm text-muted">
                    {project.stack}
                  </p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
