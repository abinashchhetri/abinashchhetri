// ─────────────────────────────────────────────────────────────────────────────
// Favicon
// ─────────────────────────────────────────────────────────────────────────────
// Generated "AC" monogram favicon matching the Logo component — the same
// primary→violet→cyan accent gradient, so the tab icon and the in-app mark
// read as one identity.
// ─────────────────────────────────────────────────────────────────────────────

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0075de 0%, #8b5cf6 55%, #62aef0 100%)",
          color: "#ffffff",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: -0.5,
          fontFamily: "sans-serif",
        }}
      >
        AC
      </div>
    ),
    { ...size },
  );
}
