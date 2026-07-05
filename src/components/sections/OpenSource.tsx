// ─────────────────────────────────────────────────────────────────────────────
// OpenSource
// ─────────────────────────────────────────────────────────────────────────────
// Live GitHub aggregate stats (repo count, stars, top languages) via the
// cached /api/github route — never raw-embeds the 2024 learning-challenge
// pinned repos as "proof of work" per the ground truth note; the Featured
// Projects section carries that instead. Contribution calendar is a
// keyless hotlinked SVG widget (ghchart.rshah.org) since GitHub's real
// calendar isn't available via the unauthenticated REST API.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { ExternalLink, GitFork, Star } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import FadeIn from "@/components/motion/FadeIn";
import { useGetGithubStats } from "@/hooks/react-query/github/get-github-stats.hook";
import { GITHUB_USERNAME, SOCIAL_LINKS } from "@/lib/constants/site.constants";

const OpenSource = () => {
  const { stats, isLoading, isError } = useGetGithubStats();

  return (
    <section id="github" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-eyebrow uppercase text-accent-primary">GitHub</p>
      <h2 className="mt-2 text-heading">Open source & activity</h2>

      <FadeIn delay={0.1}>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-md border border-hairline bg-surface-1 p-6">
            <GitFork className="text-accent-primary" size={20} />
            {isLoading ? (
              <Skeleton className="mt-3 h-9 w-16" />
            ) : (
              <p className="mt-3 text-3xl font-bold">{stats?.publicRepos ?? "—"}</p>
            )}
            <p className="text-sm text-muted-foreground">Public repositories</p>
          </div>

          <div className="rounded-md border border-hairline bg-surface-1 p-6">
            <Star className="text-accent-primary" size={20} />
            {isLoading ? (
              <Skeleton className="mt-3 h-9 w-16" />
            ) : (
              <p className="mt-3 text-3xl font-bold">{stats?.totalStars ?? "—"}</p>
            )}
            <p className="text-sm text-muted-foreground">Stars earned</p>
          </div>

          <div className="rounded-md border border-hairline bg-surface-1 p-6">
            <p className="mb-3 text-sm font-semibold text-muted-foreground">Top languages</p>
            {isLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {stats?.topLanguages.map((lang) => (
                  <span
                    key={lang.name}
                    className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {lang.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {isError && (
          <p className="mt-4 text-sm text-destructive">
            Couldn&apos;t load live GitHub stats right now.
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-md border border-hairline bg-surface-1 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- keyless third-party SVG widget, not an optimizable local asset */}
          <img
            src={`https://ghchart.rshah.org/0075de/${GITHUB_USERNAME}`}
            alt={`${GITHUB_USERNAME}'s GitHub contribution graph`}
            className="min-w-[640px]"
          />
        </div>

        <Link
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent-primary hover:underline"
        >
          View full profile on GitHub <ExternalLink size={14} />
        </Link>
      </FadeIn>
    </section>
  );
};

export default OpenSource;
