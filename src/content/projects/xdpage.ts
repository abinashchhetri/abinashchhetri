// ─────────────────────────────────────────────────────────────────────────────
// XdPage
// ─────────────────────────────────────────────────────────────────────────────
// UK local-services marketplace built from scratch. Real, live project built
// at XDezo Technology — xdpage.co.uk.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const xdpage: IProject = {
  slug: "xdpage",
  name: "XdPage",
  url: "https://xdpage.co.uk",
  tagline: "UK local-services marketplace, built from scratch",
  description:
    "A UK local-services marketplace built end to end — full authentication (JWT, Google OAuth, OTP, password recovery), role-based dashboards, and drag-and-drop media management for service providers.",
  category: "flagship",
  accent: "violet",
  stack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "TanStack Query",
    "React Hook Form",
    "Zod",
    "Tailwind CSS",
  ],
  highlights: [
    "130+ custom TanStack Query hooks",
    "Full auth flow: JWT, Google OAuth, OTP verification, and password recovery",
    "Role-based dashboards for different account types",
    "Drag-and-drop media management for provider listings",
  ],
  stats: [
    { label: "Query hooks", value: "130+" },
    { label: "Role", value: "Frontend, end-to-end" },
  ],
  poster:
    "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
