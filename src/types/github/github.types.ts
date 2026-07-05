// ─────────────────────────────────────────────────────────────────────────────
// GitHub Types
// ─────────────────────────────────────────────────────────────────────────────
// Shape returned by the cached /api/github route — an aggregation over the
// public GitHub REST API, not a passthrough of GitHub's raw response.
// ─────────────────────────────────────────────────────────────────────────────

export interface ILanguageBreakdown {
  name: string;
  repoCount: number;
}

export interface IGithubStats {
  username: string;
  publicRepos: number;
  totalStars: number;
  topLanguages: ILanguageBreakdown[];
  profileUrl: string;
}
