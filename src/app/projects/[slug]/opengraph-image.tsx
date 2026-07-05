// ─────────────────────────────────────────────────────────────────────────────
// Project OG Image
// ─────────────────────────────────────────────────────────────────────────────
// Per-project dynamic OG/Twitter card, colored with that project's one accent
// hue — mirrors the "album art provides the color" rule into social cards.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from "next/og";

import { getProjectBySlug, PROJECTS } from "@/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT_HEX: Record<string, string> = {
  primary: "#0075de",
  violet: "#8b5cf6",
  cyan: "#62aef0",
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const accentHex = ACCENT_HEX[project?.accent ?? "primary"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#121212",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: accentHex, fontWeight: 600 }}>
          {project?.tagline ?? "Project"}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>
          {project?.name ?? "Project"}
        </div>
      </div>
    ),
    { ...size },
  );
}
