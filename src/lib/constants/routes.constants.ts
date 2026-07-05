// ─────────────────────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────────────────────
// All internal app routes in one place. Use these for Link hrefs and
// router.push() — never write a route path string directly in a component.
// ─────────────────────────────────────────────────────────────────────────────

export const ROUTES = {
  HOME: "/",
  PROJECTS: "/projects",
  PROJECT_DETAIL: (slug: string) => `/projects/${slug}`,
} as const;
