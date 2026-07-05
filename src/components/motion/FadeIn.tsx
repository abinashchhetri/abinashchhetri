// ─────────────────────────────────────────────────────────────────────────────
// FadeIn
// ─────────────────────────────────────────────────────────────────────────────
// Fades + lifts children into view once, on enter. Framer Motion respects
// prefers-reduced-motion automatically via useReducedMotion internally when
// paired with MotionConfig, but we also cap the transform so a reduced-motion
// user never sees a translate — only an opacity change.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, className }: Props) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
