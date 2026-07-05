// ─────────────────────────────────────────────────────────────────────────────
// Reveal
// ─────────────────────────────────────────────────────────────────────────────
// Staggers its direct RevealItem children in on scroll — used for lists of
// cards (skills, stats) where each item should cascade in rather than pop
// together. Pair with RevealItem (./RevealItem.tsx) for each child.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const Reveal = ({ children, className, staggerDelay = 0.08 }: Props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
