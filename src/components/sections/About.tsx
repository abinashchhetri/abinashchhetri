// ─────────────────────────────────────────────────────────────────────────────
// About
// ─────────────────────────────────────────────────────────────────────────────
// Bio + education, straight from the CV. No invented anecdotes — the
// positioning statement and education record are the only claims made here.
// ─────────────────────────────────────────────────────────────────────────────

import { GraduationCap, MapPin } from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";

const About = () => {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <FadeIn>
        <p className="text-eyebrow uppercase text-accent-primary">About</p>
        <h2 className="mt-2 text-heading">Frontend engineer, shipped in production</h2>
      </FadeIn>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        <FadeIn delay={0.1} className="md:col-span-2">
          <p className="text-body text-muted-foreground">
            I&apos;m a software engineer specializing in frontend development, with professional
            experience shipping production-grade web applications in Next.js, React 19, and
            TypeScript. I&apos;ve independently delivered scalable marketplace and booking
            platforms for UK-based businesses — my strength is frontend architecture, server-state
            management, API integration, and performance optimization.
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin size={16} />
            <span>Pokhara, Nepal</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="rounded-md border border-hairline bg-surface-1 p-6">
            <div className="mb-2 flex items-center gap-2 text-accent-primary">
              <GraduationCap size={18} />
              <span className="text-eyebrow uppercase">Education</span>
            </div>
            <p className="font-semibold">BSc (Hons) Computing</p>
            <p className="text-sm text-muted-foreground">First Class Honours</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Informatics College Pokhara — Sept 2025
            </p>
            <p className="mt-2 text-sm text-accent-primary">AAA Scholarship (final-year merit)</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default About;
