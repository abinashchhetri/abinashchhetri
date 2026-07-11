// ─────────────────────────────────────────────────────────────────────────────
// Sajilo Khata
// ─────────────────────────────────────────────────────────────────────────────
// Current personal build — a full-stack voice-driven personal finance tracker.
// Live at dashboard.abinashchhetri.com.np (the live preview shows its Google
// OAuth login screen, since the app itself is behind auth). Role: Full Stack
// Engineer / frontend lead.
// ─────────────────────────────────────────────────────────────────────────────

import type { IProject } from "@/types/projects/projects.types";

export const sajiloKhata: IProject = {
  slug: "sajilo-khata",
  name: "Sajilo Khata",
  url: "https://dashboard.abinashchhetri.com.np",
  tagline: "Voice-driven personal finance tracker",
  description:
    "A full-stack personal finance app for tracking expenses, income, investments, and inter-account transfers — with real-time voice capture (Web Speech API, zero third-party cost), multi-account support, NEPSE/SIP/FD portfolio tracking, and a Recharts analytics dashboard. Built on a production-grade Next.js + NestJS architecture with strict separation of concerns.",
  category: "personal",
  accent: "primary",
  period: "2025 – present",
  stack: [
    "Next.js 15",
    "React 19",
    "TypeScript",
    "NestJS",
    "PostgreSQL",
    "TanStack Query",
    "Recharts",
    "Solana Pay",
  ],
  highlights: [
    "Voice-first entry: Web Speech API hold-to-record with regex transcript parsing and a mandatory confirmation step before saving — no AI cost, fully deterministic",
    "25+ custom TanStack Query hooks with optimistic updates, cascading cache invalidation, and dependent query chains",
    "Multi-account architecture (Cash, Bank, eSewa, Khalti) with in-transit transfers and balance reconciliation",
    "Investment portfolio tracking (NEPSE stocks, SIP, Fixed Deposit) with net-worth aggregation and time-series analytics",
    "Analytics dashboard with interactive Recharts visualizations and URL-synced, shareable filters",
    "Google OAuth 2.0 via Passport.js with JWT in httpOnly Secure cookies; NestJS + PostgreSQL + TypeORM backend",
    "Solana Pay wallet integration (Phantom) for on-chain payments",
  ],
  stats: [
    { label: "Query hooks", value: "25+" },
    { label: "Account types", value: "4" },
    { label: "Role", value: "Full-stack / FE lead" },
  ],
  poster:
    "https://images.pexels.com/photos/6693661/pexels-photo-6693661.jpeg?auto=compress&cs=tinysrgb&w=1200",
};
