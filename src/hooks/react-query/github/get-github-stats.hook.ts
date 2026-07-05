// ─────────────────────────────────────────────────────────────────────────────
// useGetGithubStats
// ─────────────────────────────────────────────────────────────────────────────
// Fetches aggregate GitHub stats (repo count, stars, top languages) for the
// Open Source section. Backed by the hourly-revalidated /api/github route,
// so this hook itself doesn't need a long staleTime.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys.constants";
import { fetchGithubStats } from "@/services/github/github.service";

export const useGetGithubStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.GITHUB.STATS],
    queryFn: fetchGithubStats,
  });

  return { stats: data, isLoading, isError };
};
