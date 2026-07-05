// ─────────────────────────────────────────────────────────────────────────────
// Rupak Nepali Portfolio
// ─────────────────────────────────────────────────────────────────────────────
// Freelance/side project — a personal portfolio website for Rupak Nepali,
// built from design to deployment. Real, live at nepalirupak.com.np.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const rupakNepali: IProject = {
  slug: "rupak-nepali-portfolio",
  name: "Rupak Nepali Portfolio",
  url: "https://www.nepalirupak.com.np",
  tagline: "Portfolio website, design to deployment",
  description:
    "A personal portfolio website for Rupak Nepali, developed with React.js from design through deployment — responsive, cross-browser compatible, and refined through design reviews and quality checks with the client.",
  category: "freelance",
  accent: "cyan",
  period: "Feb 2023 – Mar 2023",
  stack: ["React.js", "Responsive Design", "Cross-browser"],
  highlights: [
    "Developed a responsive portfolio website from design to deployment",
    "Built with React.js and related frontend technologies",
    "Ensured responsive design and cross-browser compatibility",
    "Ran design reviews and quality checks directly with the client",
  ],
  stats: [
    { label: "Role", value: "Solo dev" },
    { label: "Type", value: "Freelance" },
  ],
  poster:
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
