// ─────────────────────────────────────────────────────────────────────────────
// Project Types
// ─────────────────────────────────────────────────────────────────────────────
// Shape of the projects, statically authored in content/projects/*.ts — there
// is no CMS or API backing this content. Projects split into two categories:
// "flagship" (the production XDezo platforms) and "freelance" (self-shipped
// client/side projects surfaced from the personal site).
// ─────────────────────────────────────────────────────────────────────────────

import type { TProjectAccent } from "@/types/global.types";

export type TProjectCategory = "flagship" | "freelance";

export interface IProjectStat {
  label: string;
  value: string;
}

export interface IProject {
  slug: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
  category: TProjectCategory;
  accent: TProjectAccent;
  stack: string[];
  highlights: string[];
  stats: IProjectStat[];
  /**
   * Poster image shown behind / before the live <iframe> preview loads and as
   * the fallback if a site can't be framed. A themed Pexels CDN URL.
   */
  poster: string;
  /** Timeframe — surfaced for freelance projects only. */
  period?: string;
}
