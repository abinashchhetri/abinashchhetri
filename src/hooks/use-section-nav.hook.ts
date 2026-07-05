// ─────────────────────────────────────────────────────────────────────────────
// useSectionNav
// ─────────────────────────────────────────────────────────────────────────────
// Smooth in-page scrolling for hash nav links, and — crucially — a fix for the
// Next.js App Router <Link>-with-hash bug that appends fragments
// (/#experience#skills). We scroll with Lenis (or native fallback) and write a
// single clean hash with replaceState. Cross-page hash links (e.g. clicking
// "About" from /projects) fall back to normal navigation, handled by
// HashScroll on the next page load.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

// Sticky navbar height (h-16 = 64px) plus a little breathing room.
export const NAV_SCROLL_OFFSET = 72;

export const useSectionNav = () => {
  const pathname = usePathname();
  const lenis = useLenis();

  /**
   * Attempts an in-page smooth scroll to the href's #section. Returns true if
   * it handled it (so the caller can preventDefault); false if the caller
   * should fall back to normal navigation (non-hash href, or a different page).
   */
  const scrollToHash = (href: string): boolean => {
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1 || pathname !== "/") return false;

    const id = href.slice(hashIndex + 1);
    const target = document.getElementById(id);
    if (!target) return false;

    if (lenis) lenis.scrollTo(target, { offset: -NAV_SCROLL_OFFSET });
    else target.scrollIntoView({ behavior: "smooth" });

    // Single, clean hash — never the appended /#a#b the router would produce.
    window.history.replaceState(null, "", `/#${id}`);
    return true;
  };

  return { scrollToHash };
};
