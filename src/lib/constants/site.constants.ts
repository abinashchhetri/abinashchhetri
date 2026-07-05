// ─────────────────────────────────────────────────────────────────────────────
// SITE
// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for identity, contact details, and nav — every other
// file (metadata, JSON-LD, footer, contact route) reads from here instead of
// hardcoding a string. All values below are ground truth from the CV/GitHub,
// nothing invented.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Abinash Kunwar Chhetri",
  shortName: "Abinash Chhetri",
  title: "Software Engineer — Frontend",
  location: "Pokhara, Nepal",
  email: "abinashchhetri.work@gmail.com",
  phone: "+977 9862914333",
  status: "Open to opportunities",
  description:
    "Software Engineer specializing in frontend development, with professional experience shipping production-grade web applications in Next.js, React 19, and TypeScript. Independently delivered scalable marketplace and booking platforms for UK-based businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/abinashchhetri",
  linkedin: "https://linkedin.com/in/abinash-chhetri",
  email: `mailto:${SITE.email}`,
} as const;

export const GITHUB_USERNAME = "abinashchhetri";

export const CONTACT_RECIPIENT_EMAIL = SITE.email;

// Hash links are prefixed with "/" so they resolve to the home-page section
// from ANY route (e.g. clicking "About" while on /projects goes home, then
// scrolls) — a bare "#about" would only look for that id on the current page.
export const NAV_ITEMS = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "GitHub", href: "/#github" },
  { label: "Contact", href: "/#contact" },
] as const;
