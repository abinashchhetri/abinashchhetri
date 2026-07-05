import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only local, self-authored placeholder SVGs under /public are served
    // through next/image — never a user- or remote-supplied SVG — so the
    // usual script-injection risk this flag guards against doesn't apply.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Project preview posters are hotlinked from the Pexels CDN (used behind
    // the live <iframe> previews as poster/fallback images).
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
