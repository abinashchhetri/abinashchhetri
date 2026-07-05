// ─────────────────────────────────────────────────────────────────────────────
// HashScroll
// ─────────────────────────────────────────────────────────────────────────────
// On a fresh page load that carries a #section (e.g. landing on /#skills from
// another page), scroll to it via Lenis once it's ready. Lenis controls scroll
// with a transform, so the browser's native hash jump gets overridden — this
// re-applies it. No-op when there's no hash.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

import { NAV_SCROLL_OFFSET } from "@/hooks/use-section-nav.hook";

const HashScroll = () => {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length < 2) return;

    const id = decodeURIComponent(hash.slice(1));
    // Wait a beat for layout + Lenis to settle before scrolling.
    const timer = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -NAV_SCROLL_OFFSET, immediate: false });
      else target.scrollIntoView();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
};

export default HashScroll;
