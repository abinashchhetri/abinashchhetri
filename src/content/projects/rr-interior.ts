// ─────────────────────────────────────────────────────────────────────────────
// RR Interior
// ─────────────────────────────────────────────────────────────────────────────
// Freelance/side project — backend development for RRINTERIOR. Real, live at
// rr-interior-frontend.vercel.app. Sourced from the personal site.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const rrInterior: IProject = {
  slug: "rr-interior",
  name: "RR Interior",
  url: "https://rr-interior-frontend.vercel.app/",
  tagline: "Backend for an interior-design studio",
  description:
    "Built and maintained the backend for RR Interior using TypeScript, Node.js, Express, and MongoDB — focused on a fast, scalable, and secure API. Collaborated with designers and product managers, and took part in code reviews throughout.",
  category: "freelance",
  accent: "primary",
  period: "May 2023 – Dec 2023",
  stack: ["TypeScript", "Node.js", "Express", "MongoDB"],
  highlights: [
    "Developed and maintained the backend with TypeScript, MongoDB, Express, and Node.js",
    "Implemented a fast, scalable, and secure API",
    "Collaborated with designers, product managers, and developers on a high-quality product",
    "Participated in code reviews and gave constructive feedback to other developers",
  ],
  stats: [
    { label: "Role", value: "Backend" },
    { label: "Type", value: "Freelance" },
  ],
  poster:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
