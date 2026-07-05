// ─────────────────────────────────────────────────────────────────────────────
// Book My Massage
// ─────────────────────────────────────────────────────────────────────────────
// Multi-role, multi-location massage marketplace. Real, live project built at
// XDezo Technology — bookmymassage.co.uk.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const bookMyMassage: IProject = {
  slug: "book-my-massage",
  name: "Book My Massage",
  url: "https://bookmymassage.co.uk",
  tagline: "Multi-role, multi-location massage marketplace",
  description:
    "A multi-role massage marketplace spanning multiple locations, covering the full booking lifecycle end to end — real-time messaging between clients and therapists, reviews, and Recharts-powered analytics.",
  category: "flagship",
  accent: "cyan",
  stack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "JWT", "Recharts", "REST APIs"],
  highlights: [
    "Full booking lifecycle across multiple roles and locations",
    "Real-time messaging between clients and therapists",
    "Reviews system",
    "Recharts-powered analytics dashboard",
  ],
  stats: [
    { label: "Roles", value: "Multi-role" },
    { label: "Role", value: "Frontend, end-to-end" },
  ],
  poster:
    "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
