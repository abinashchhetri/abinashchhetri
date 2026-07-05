// ─────────────────────────────────────────────────────────────────────────────
// RevealItem
// ─────────────────────────────────────────────────────────────────────────────
// One staggered child of Reveal (./Reveal.tsx) — must be a direct child so it
// inherits the parent's stagger timing via Framer Motion variant propagation.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const RevealItem = ({ children, className }: Props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealItem;
