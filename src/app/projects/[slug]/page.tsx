// ─────────────────────────────────────────────────────────────────────────────
// Project Case Study
// ─────────────────────────────────────────────────────────────────────────────
// Full case study for one project (flagship or freelance). Statically
// generated for every project via generateStaticParams — there is no
// dynamic/unknown slug at request time.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LivePreview from "@/components/shared/LivePreview";
import { getProjectBySlug, PROJECTS } from "@/content/projects";
import { buildBreadcrumbJsonLd, buildMetadata, buildProjectJsonLd } from "@/lib/seo";
import { getAccentBgClass, getAccentTextClass } from "@/utils/accent.utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = [
    buildProjectJsonLd(project),
    buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path: `/projects/${project.slug}` },
    ]),
  ];

  return (
    <article className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        / <Link href="/projects" className="hover:text-foreground">Projects</Link> /{" "}
        <span className="text-foreground">{project.name}</span>
      </nav>

      <p className={`text-eyebrow uppercase ${getAccentTextClass(project.accent)}`}>
        {project.tagline}
      </p>
      <h1 className="mt-2 text-heading">{project.name}</h1>
      <p className="mt-4 text-body text-muted-foreground">{project.description}</p>

      <Button variant="primary-pill" size="pill" asChild className="mt-6">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
          Visit Live Site
        </a>
      </Button>

      <div className="mt-10 overflow-hidden rounded-lg border border-hairline">
        <LivePreview url={project.url} poster={project.poster} title={project.name} priority />
      </div>

      <h2 className="mt-10 text-card-title">Highlights</h2>
      <ul className="mt-4 space-y-3">
        {project.highlights.map((point) => (
          <li key={point} className="flex gap-3 text-body text-muted-foreground">
            <span
              className={`mt-2.5 size-1.5 shrink-0 rounded-full ${getAccentBgClass(project.accent)}`}
              aria-hidden
            />
            {point}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-card-title">Stack</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4">
        {project.stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-hairline bg-surface-1 p-6">
            <p className={`text-2xl font-bold ${getAccentTextClass(project.accent)}`}>
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
