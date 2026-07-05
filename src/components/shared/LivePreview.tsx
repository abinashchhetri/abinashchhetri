// ─────────────────────────────────────────────────────────────────────────────
// LivePreview
// ─────────────────────────────────────────────────────────────────────────────
// Renders a live, scaled-down <iframe> of a project's real homepage — a true
// "live thumbnail" instead of a static screenshot. The iframe renders at a
// fixed desktop width (1280px) and is scaled to fit its container, so every
// card shows each site's above-the-fold hero the way a desktop visitor sees it.
//
// It's mounted lazily (only when scrolled into view) so a grid of previews
// doesn't fetch every external site up front, is non-interactive
// (pointer-events: none — the surrounding link/button owns the click), and
// falls back to a themed poster image while loading or if a site refuses to
// frame.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// The virtual desktop width the site is rendered at before scaling down.
const BASE_WIDTH = 1280;
// 16:9 slice of the top of the page — each site's hero region.
const BASE_HEIGHT = 720;

interface Props {
  url: string;
  poster: string;
  title: string;
  /** Slightly eager load margin for the detail page's larger single preview. */
  priority?: boolean;
  className?: string;
}

const LivePreview = ({ url, poster, title, priority = false, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);
  const [inView, setInView] = useState(priority);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  // Keep the iframe scaled to whatever width the card currently is.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width > 0) setScale(width / BASE_WIDTH);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Only fetch the external site once its card is near the viewport.
  useEffect(() => {
    if (priority) return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [priority]);

  // If a site takes too long / blocks framing, keep the poster visible.
  useEffect(() => {
    if (!inView || loaded) return;
    const timer = window.setTimeout(() => setFailed(true), 8000);
    return () => window.clearTimeout(timer);
  }, [inView, loaded]);

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden bg-surface-2 ${className ?? ""}`}
    >
      {/* Poster / fallback — themed image shown until (or unless) the iframe loads */}
      <Image
        src={poster}
        alt={`${title} preview`}
        fill
        sizes="(max-width: 640px) 100vw, 400px"
        priority={priority}
        className={`object-cover transition-opacity duration-700 ${
          loaded && !failed ? "opacity-0" : "opacity-100"
        }`}
      />

      {inView && !failed && (
        <iframe
          src={url}
          title={`${title} — live preview`}
          loading={priority ? "eager" : "lazy"}
          scrolling="no"
          tabIndex={-1}
          aria-hidden
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className={`pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* "Live" indicator so viewers know this is the real running site */}
      <span className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur">
        <span className="size-1.5 rounded-full bg-success" />
        Live
      </span>
    </div>
  );
};

export default LivePreview;
