// ─────────────────────────────────────────────────────────────────────────────
// Magnetic
// ─────────────────────────────────────────────────────────────────────────────
// Wraps a single interactive child (button/link) and nudges it toward the
// pointer within a small radius — the "delight layer" magnetic-button effect.
// No-ops under prefers-reduced-motion and on touch (no fine pointer).
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

const Magnetic = ({ children, strength = 0.3, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") return;
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);
    setOffset({ x: relativeX * strength, y: relativeY * strength });
  };

  const handlePointerLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
