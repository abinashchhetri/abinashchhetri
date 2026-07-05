// ─────────────────────────────────────────────────────────────────────────────
// Experience
// ─────────────────────────────────────────────────────────────────────────────
// Single role, real dates — XDezo Technology, Jan–Dec 2025. StatCard row
// surfaces the concrete, real figures from the CV (3 platforms, 140+/130+
// hooks) rather than a vague bullet list.
// ─────────────────────────────────────────────────────────────────────────────

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import StatCard from "@/components/shared/StatCard";

const HIGHLIGHTS = [
  "Owned frontend architecture end to end across 3 production marketplace/SaaS platforms",
  "Built 130+ and 140+ custom TanStack Query hooks across two of the platforms",
  "Implemented JWT, Google OAuth, OTP verification, and role-based access control (RBAC) auth flows",
  "Integrated REST APIs for booking, analytics, and CMS workflows",
];

const Experience = () => {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-eyebrow uppercase text-accent-primary">Experience</p>
      <h2 className="mt-2 text-heading">XDezo Technology</h2>
      <p className="mt-1 text-muted-foreground">
        Frontend Developer · UK (Remote) · Jan – Dec 2025
      </p>

      <ul className="mt-8 space-y-3">
        {HIGHLIGHTS.map((point) => (
          <li key={point} className="flex gap-3 text-body text-muted-foreground">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent-primary" aria-hidden />
            {point}
          </li>
        ))}
      </ul>

      <Reveal className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <RevealItem>
          <StatCard value="3" label="Production platforms" />
        </RevealItem>
        <RevealItem>
          <StatCard value="140+" label="Query hooks — RestroNow" />
        </RevealItem>
        <RevealItem>
          <StatCard value="130+" label="Query hooks — XdPage" />
        </RevealItem>
      </Reveal>
    </section>
  );
};

export default Experience;
