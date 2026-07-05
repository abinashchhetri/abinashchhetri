// ─────────────────────────────────────────────────────────────────────────────
// HeroBackdrop
// ─────────────────────────────────────────────────────────────────────────────
// The hero's interactive layer: the static gradient-mesh (Slack's pastel-mesh,
// reskinned dark) with a soft accent glow that follows the cursor on a spring,
// so the section feels alive without being loud. Pointer-events stay off (it's
// purely visual) and the glow is skipped entirely under prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef } from "react";

const HeroBackdrop = () => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Cursor position as a percentage across the hero, spring-smoothed so the
  // glow trails the pointer gently instead of snapping to it.
  const xPercent = useMotionValue(50);
  const yPercent = useMotionValue(28);
  const smoothX = useSpring(xPercent, { stiffness: 60, damping: 20, mass: 0.5 });
  const smoothY = useSpring(yPercent, { stiffness: 60, damping: 20, mass: 0.5 });

  const glow = useMotionTemplate`radial-gradient(560px circle at ${smoothX}% ${smoothY}%, color-mix(in srgb, var(--accent-primary) 18%, transparent), transparent 68%)`;

  useEffect(() => {
    if (shouldReduceMotion) return;
    const node = ref.current;
    if (!node) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = node.getBoundingClientRect();
      const px = (event.clientX - bounds.left) / bounds.width;
      const py = (event.clientY - bounds.top) / bounds.height;
      // Only react while the pointer is over the hero region.
      if (px < 0 || px > 1 || py < 0 || py > 1) return;
      xPercent.set(px * 100);
      yPercent.set(py * 100);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [shouldReduceMotion, xPercent, yPercent]);

  return (
    <div ref={ref} aria-hidden className="hero-gradient-mesh pointer-events-none absolute inset-0 -z-10">
      {!shouldReduceMotion && (
        <motion.div className="absolute inset-0" style={{ background: glow }} />
      )}
    </div>
  );
};

export default HeroBackdrop;
