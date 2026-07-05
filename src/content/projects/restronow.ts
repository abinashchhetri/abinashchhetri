// ─────────────────────────────────────────────────────────────────────────────
// RestroNow
// ─────────────────────────────────────────────────────────────────────────────
// Dual-sided restaurant discovery & booking platform. Real, live project
// built at XDezo Technology — restronow.co.uk.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const restronow: IProject = {
  slug: "restronow",
  name: "RestroNow",
  url: "https://restronow.co.uk",
  tagline: "Dual-sided restaurant discovery & booking platform",
  description:
    "A dual-sided marketplace connecting diners with restaurants across the UK — location and cuisine search with URL-synced filters, drag-and-drop menu management, and a full owner dashboard for bookings, offers, reviews, and analytics.",
  category: "flagship",
  accent: "primary",
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
    "140+ custom TanStack Query hooks powering server state across the app",
    "Location/cuisine search with URL-synced filters for shareable, bookmarkable results",
    "Drag-and-drop menu management for restaurant owners",
    "Owner dashboard covering bookings, offers, reviews, and analytics",
  ],
  stats: [
    { label: "Query hooks", value: "140+" },
    { label: "Role", value: "Frontend, end-to-end" },
  ],
  poster:
    "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
