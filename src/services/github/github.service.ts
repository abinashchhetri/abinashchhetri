// ─────────────────────────────────────────────────────────────────────────────
// GitHub Service
// ─────────────────────────────────────────────────────────────────────────────
// Fetches aggregate GitHub stats from this app's own cached route handler —
// never calls the public GitHub API directly from the browser.
// ─────────────────────────────────────────────────────────────────────────────

import apiClient from "@/services";
import type { IGithubStats } from "@/types/github/github.types";

export const fetchGithubStats = async (): Promise<IGithubStats> => {
  const { data } = await apiClient.get<IGithubStats>("/github");
  return data;
};
