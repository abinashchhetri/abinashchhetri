// ─────────────────────────────────────────────────────────────────────────────
// Projects Index
// ─────────────────────────────────────────────────────────────────────────────
// Lists every project, grouped into personal (the current full-stack build),
// flagship (the production XDezo platforms), and freelance (self-shipped
// client/side work). No fetch needed — content is static and typed, so this
// stays a Server Component.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

import ProjectCard from "@/components/shared/ProjectCard";
import { FLAGSHIP_PROJECTS, FREELANCE_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import type { IProject } from "@/types/projects/projects.types";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Real, shipped work — a current full-stack finance app, production marketplace and booking platforms, plus freelance client projects.",
  path: "/projects",
});

const ProjectGroup = ({
  eyebrow,
  heading,
  projects,
}: {
  eyebrow: string;
  heading: string;
  projects: IProject[];
}) => (
  <div>
    <p className="text-eyebrow uppercase text-accent-primary">{eyebrow}</p>
    <h2 className="mt-2 text-2xl font-bold tracking-tight">{heading}</h2>
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  </div>
);

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-eyebrow uppercase text-accent-primary">Projects</p>
      <h1 className="mt-2 text-heading">Everything I&apos;ve shipped</h1>

      <div className="mt-14 space-y-16">
        <ProjectGroup
          eyebrow="Production platforms · XDezo"
          heading="Flagship work"
          projects={FLAGSHIP_PROJECTS}
        />
        <ProjectGroup
          eyebrow="Currently building"
          heading="Latest project"
          projects={PERSONAL_PROJECTS}
        />
        <ProjectGroup
          eyebrow="Freelance & client work"
          heading="Side projects"
          projects={FREELANCE_PROJECTS}
        />
      </div>
    </section>
  );
}
