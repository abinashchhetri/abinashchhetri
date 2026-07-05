// ─────────────────────────────────────────────────────────────────────────────
// Projects Index
// ─────────────────────────────────────────────────────────────────────────────
// Aggregates every project (flagship + freelance) for the /projects index and
// generateStaticParams on /projects/[slug]. Flagship = the production XDezo
// platforms; freelance = self-shipped client/side projects.
// ─────────────────────────────────────────────────────────────────────────────

import { bookMyMassage } from "@/content/projects/book-my-massage";
import { restronow } from "@/content/projects/restronow";
import { rrInterior } from "@/content/projects/rr-interior";
import { rupakNepali } from "@/content/projects/rupak-nepali";
import { trigon } from "@/content/projects/trigon";
import { xdpage } from "@/content/projects/xdpage";
import type { IProject } from "@/types/projects/projects.types";

export const FLAGSHIP_PROJECTS: IProject[] = [restronow, xdpage, bookMyMassage];

export const FREELANCE_PROJECTS: IProject[] = [rrInterior, trigon, rupakNepali];

export const PROJECTS: IProject[] = [...FLAGSHIP_PROJECTS, ...FREELANCE_PROJECTS];

export const getProjectBySlug = (slug: string): IProject | undefined =>
  PROJECTS.find((project) => project.slug === slug);
