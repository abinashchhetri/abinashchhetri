// ─────────────────────────────────────────────────────────────────────────────
// Projects Index
// ─────────────────────────────────────────────────────────────────────────────
// Aggregates every project for the /projects index and generateStaticParams on
// /projects/[slug]. Three groups: personal (the current full-stack build),
// flagship (the production XDezo platforms), and freelance (self-shipped
// client/side projects).
// ─────────────────────────────────────────────────────────────────────────────

import { bookMyMassage } from "@/content/projects/book-my-massage";
import { restronow } from "@/content/projects/restronow";
import { rrInterior } from "@/content/projects/rr-interior";
import { rupakNepali } from "@/content/projects/rupak-nepali";
import { sajiloKhata } from "@/content/projects/sajilo-khata";
import { trigon } from "@/content/projects/trigon";
import { xdpage } from "@/content/projects/xdpage";
import type { IProject } from "@/types/projects/projects.types";

export const PERSONAL_PROJECTS: IProject[] = [sajiloKhata];

export const FLAGSHIP_PROJECTS: IProject[] = [restronow, xdpage, bookMyMassage];

export const FREELANCE_PROJECTS: IProject[] = [rrInterior, trigon, rupakNepali];

export const PROJECTS: IProject[] = [
  ...PERSONAL_PROJECTS,
  ...FLAGSHIP_PROJECTS,
  ...FREELANCE_PROJECTS,
];

export const getProjectBySlug = (slug: string): IProject | undefined =>
  PROJECTS.find((project) => project.slug === slug);
