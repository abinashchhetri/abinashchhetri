// ─────────────────────────────────────────────────────────────────────────────
// Global Types
// ─────────────────────────────────────────────────────────────────────────────
// Shared types used across two or more feature areas. Feature-only types live
// in their own types/[feature]/[feature].types.ts file instead.
// ─────────────────────────────────────────────────────────────────────────────

export interface TApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// The three per-project accent hues — "album art provides the color" rule:
// each project gets exactly one accent, used only on its own card/case study.
export type TProjectAccent = "primary" | "violet" | "cyan";
