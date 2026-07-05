// ─────────────────────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────────────────────
// Real skill list from the CV, frontend-first ordering preserved exactly as
// specified. Each category gets one decorative sticker-palette dot — never a
// full-card color fill, per the Notion-derived rule.
// ─────────────────────────────────────────────────────────────────────────────

export interface ISkillCategory {
  category: string;
  dotColor: "sky" | "purple" | "pink" | "orange" | "teal" | "green";
  skills: string[];
}

export const SKILL_CATEGORIES: ISkillCategory[] = [
  {
    category: "Frontend",
    dotColor: "sky",
    skills: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Radix UI"],
  },
  {
    category: "State & Data",
    dotColor: "purple",
    skills: ["TanStack Query", "Redux Toolkit", "Context API"],
  },
  {
    category: "Forms & Validation",
    dotColor: "pink",
    skills: ["React Hook Form", "Zod"],
  },
  {
    category: "Backend & APIs",
    dotColor: "orange",
    skills: ["Node.js", "Express.js", "REST APIs", "Axios"],
  },
  {
    category: "Databases",
    dotColor: "teal",
    skills: ["MySQL", "MongoDB"],
  },
  {
    category: "Auth & Security",
    dotColor: "green",
    skills: ["JWT", "OAuth", "OTP Verification", "RBAC"],
  },
  {
    category: "Tools",
    dotColor: "sky",
    skills: ["Git", "GitHub", "Postman", "SEO & Performance", "Responsive Design", "SDLC"],
  },
];
