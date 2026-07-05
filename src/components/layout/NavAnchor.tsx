// ─────────────────────────────────────────────────────────────────────────────
// NavAnchor
// ─────────────────────────────────────────────────────────────────────────────
// One nav link. For section links (/#about) it renders a real <a> and, when
// already on the home page, intercepts the click for a clean Lenis smooth
// scroll (avoiding the Next <Link> double-hash bug). Off the home page it lets
// the browser navigate to /#id normally. For true routes (/projects) it uses
// next/link for client-side navigation.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Link from "next/link";

import { useSectionNav } from "@/hooks/use-section-nav.hook";

interface Props {
  href: string;
  className?: string;
  onNavigate?: () => void;
  "aria-label"?: string;
  children: React.ReactNode;
}

const NavAnchor = ({ href, className, onNavigate, children, ...rest }: Props) => {
  const { scrollToHash } = useSectionNav();
  const isHashLink = href.includes("#");

  if (isHashLink) {
    return (
      <a
        href={href}
        className={className}
        onClick={(event) => {
          onNavigate?.();
          // If handled in-page, stop the browser from also navigating.
          if (scrollToHash(href)) event.preventDefault();
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onNavigate} {...rest}>
      {children}
    </Link>
  );
};

export default NavAnchor;
