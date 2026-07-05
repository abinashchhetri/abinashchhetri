// ─────────────────────────────────────────────────────────────────────────────
// LenisProvider
// ─────────────────────────────────────────────────────────────────────────────
// Wraps the app in Lenis smooth scroll — but only when the user hasn't set
// prefers-reduced-motion. Reduced-motion users get native scroll instead of
// no scroll at all, since Lenis has no built-in "off" switch once mounted.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { ReactLenis } from "lenis/react";

import { useMediaQuery } from "@/hooks/use-media-query.hook";

interface Props {
  children: React.ReactNode;
}

const LenisProvider = ({ children }: Props) => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: true }}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
