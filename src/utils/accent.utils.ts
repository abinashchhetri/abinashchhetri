// ─────────────────────────────────────────────────────────────────────────────
// Accent Utilities
// ─────────────────────────────────────────────────────────────────────────────
// Maps a project's single accent hue (TProjectAccent) to the Tailwind classes
// that paint it. Full class strings are written out literally (not built via
// template interpolation) so Tailwind's static scanner can see them.
// ─────────────────────────────────────────────────────────────────────────────

import type { TProjectAccent } from "@/types/global.types";

export const getAccentTextClass = (accent: TProjectAccent): string => {
  if (accent === "violet") return "text-accent-violet";
  if (accent === "cyan") return "text-accent-cyan";
  return "text-accent-primary";
};

export const getAccentBgClass = (accent: TProjectAccent): string => {
  if (accent === "violet") return "bg-accent-violet";
  if (accent === "cyan") return "bg-accent-cyan";
  return "bg-accent-primary";
};

export const getAccentBorderClass = (accent: TProjectAccent): string => {
  if (accent === "violet") return "border-accent-violet";
  if (accent === "cyan") return "border-accent-cyan";
  return "border-accent-primary";
};

export const getAccentBgSoftClass = (accent: TProjectAccent): string => {
  if (accent === "violet") return "bg-accent-violet/10";
  if (accent === "cyan") return "bg-accent-cyan/10";
  return "bg-accent-primary/10";
};
