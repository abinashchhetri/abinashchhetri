// ─────────────────────────────────────────────────────────────────────────────
// Trigon Tours & Travel
// ─────────────────────────────────────────────────────────────────────────────
// Freelance/side project — a single-page tours & travel website, solo-built
// from design to deployment. Real, live at trigontoursandtravel.com.np.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const trigon: IProject = {
  slug: "trigon-tours-and-travel",
  name: "Trigon Tours & Travel",
  url: "https://www.trigontoursandtravel.com.np/",
  tagline: "Solo-built single-page travel website",
  description:
    "A single-page tours & travel website built solo from design through deployment with React.js — responsive across breakpoints, cross-browser compatible, and shipped after design reviews and quality checks with the stakeholders.",
  category: "freelance",
  accent: "violet",
  period: "Jan 2023",
  stack: ["React.js", "Responsive Design", "Cross-browser"],
  highlights: [
    "Solo-developed a responsive website from design to deployment",
    "Built with React.js and related frontend technologies",
    "Ensured responsive design and cross-browser compatibility",
    "Ran design reviews and quality checks directly with the stakeholders",
  ],
  stats: [
    { label: "Role", value: "Solo dev" },
    { label: "Type", value: "Freelance" },
  ],
  poster:
    "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
