// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard
// ─────────────────────────────────────────────────────────────────────────────
// One project tile. Each project carries exactly one accent hue (Spotify's
// "album art provides the color" rule) — never a second accent on the same
// card. The media is a live scaled preview of the real site (LivePreview).
// Links through to the full case study at /projects/[slug].
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import LivePreview from "@/components/shared/LivePreview";
import { ROUTES } from "@/lib/constants/routes.constants";
import type { IProject } from "@/types/projects/projects.types";
import { getAccentBorderClass, getAccentTextClass } from "@/utils/accent.utils";

interface Props {
  project: IProject;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Link
      href={ROUTES.PROJECT_DETAIL(project.slug)}
      className={`group flex h-full w-full flex-col overflow-hidden rounded-md border border-hairline bg-surface-1 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-level-1)] ${getAccentBorderClass(
        project.accent,
      )} hover:border-2`}
    >
      <LivePreview url={project.url} poster={project.poster} title={project.name} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-card-title">{project.name}</h3>
          {project.period && (
            <span className="shrink-0 pt-1 text-xs text-text-faint">{project.period}</span>
          )}
        </div>
        <p className={`mt-1 text-sm font-medium ${getAccentTextClass(project.accent)}`}>
          {project.tagline}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>

        {/* mt-auto pins the badge row to the card's bottom so cards of
            differing description length still line their footers up. */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
