// ─────────────────────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────────────────────
// Two aligned responsive grids: the flagship XDezo platforms first, then
// freelance / self-shipped side projects. Everything lives inside the same
// centered container as the heading so the cards line up with it (a horizontal
// rail was left-bleeding past the heading and trapping vertical scroll).
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/shared/ProjectCard";
import { FLAGSHIP_PROJECTS, FREELANCE_PROJECTS, PERSONAL_PROJECTS } from "@/content/projects";
import { ROUTES } from "@/lib/constants/routes.constants";
import type { IProject } from "@/types/projects/projects.types";

const ProjectGrid = ({ label, projects }: { label: string; projects: IProject[] }) => (
  <div>
    <h3 className="text-eyebrow uppercase text-text-faint">{label}</h3>
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow uppercase text-accent-primary">Featured Projects</p>
          <h2 className="mt-2 text-heading">Shipped, not just built</h2>
        </div>
        <Button variant="link" asChild className="hidden shrink-0 sm:inline-flex">
          <Link href={ROUTES.PROJECTS}>View all →</Link>
        </Button>
      </div>

      <div className="mt-12 space-y-14">
        <ProjectGrid label="Production platforms · XDezo" projects={FLAGSHIP_PROJECTS} />
        <ProjectGrid label="Currently building" projects={PERSONAL_PROJECTS} />
        <ProjectGrid label="Freelance & client work" projects={FREELANCE_PROJECTS} />
      </div>
    </section>
  );
};

export default Projects;
