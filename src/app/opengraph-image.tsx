// ─────────────────────────────────────────────────────────────────────────────
// Root OG Image
// ─────────────────────────────────────────────────────────────────────────────
// Dynamic OG/Twitter card for the home page — rendered per-route, not a
// single static image reused site-wide.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from "next/og";

import { SITE } from "@/lib/constants/site.constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
        <div style={{ fontSize: 28, color: "#0075de", fontWeight: 600 }}>{SITE.status}</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>
          {SITE.name}
        </div>
        <div style={{ fontSize: 32, color: "#b3b3b3", marginTop: 24, maxWidth: 900 }}>
          {SITE.title}
        </div>
      </div>
    ),
    { ...size },
  );
}
