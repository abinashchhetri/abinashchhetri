// ─────────────────────────────────────────────────────────────────────────────
// GitHub Stats Route Handler
// ─────────────────────────────────────────────────────────────────────────────
// Proxies + aggregates the public GitHub REST API so the browser never calls
// GitHub directly (rate limits, and keeps room for an optional GITHUB_TOKEN
// later without exposing it). Unauthenticated public API is fine at an
// hourly revalidation cadence for one user's repo count.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";

import { GITHUB_USERNAME, SOCIAL_LINKS } from "@/lib/constants/site.constants";
import type { IGithubStats } from "@/types/github/github.types";

export const revalidate = 3600;

interface IGithubRepo {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export async function GET() {
  const headers: HeadersInit = { Accept: "application/vnd.github+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const reposRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
    { headers, next: { revalidate } },
  );

  if (!reposRes.ok) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch GitHub stats." },
      { status: 502 },
    );
  }

  const repos: IGithubRepo[] = await reposRes.json();
  const ownRepos = repos.filter((repo) => !repo.fork);

  const totalStars = ownRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  const languageCounts = ownRepos.reduce<Record<string, number>>((counts, repo) => {
    if (!repo.language) return counts;
    counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    return counts;
  }, {});

  const topLanguages = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, repoCount]) => ({ name, repoCount }));

  const stats: IGithubStats = {
    username: GITHUB_USERNAME,
    publicRepos: ownRepos.length,
    totalStars,
    topLanguages,
    profileUrl: SOCIAL_LINKS.github,
  };

  return NextResponse.json(stats);
}
