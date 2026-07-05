// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
// The page's opening statement. HeroBackdrop supplies the interactive
// gradient-mesh + cursor-follow glow; the content here is the hero-display
// headline, positioning statement, and the primary/ghost pill CTA pair. The
// primary CTA is magnetic (nudges toward the pointer) for a tactile feel.
// ─────────────────────────────────────────────────────────────────────────────

import { ArrowDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import NavAnchor from "@/components/layout/NavAnchor";
import FadeIn from "@/components/motion/FadeIn";
import Magnetic from "@/components/motion/Magnetic";
import HeroBackdrop from "@/components/sections/HeroBackdrop";
import { SITE } from "@/lib/constants/site.constants";
import { ROUTES } from "@/lib/constants/routes.constants";

const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8">
      <HeroBackdrop />

      <FadeIn>
        <p className="text-eyebrow uppercase text-accent-primary">{SITE.status}</p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h1 className="mt-4 max-w-4xl text-hero">{SITE.name}</h1>
      </FadeIn>

      <FadeIn delay={0.2}>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {SITE.description}
        </p>
      </FadeIn>

      <FadeIn delay={0.3}>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Magnetic className="inline-flex">
            <Button variant="primary-pill" size="pill" asChild>
              <Link href={ROUTES.PROJECTS}>View Projects</Link>
            </Button>
          </Magnetic>
          <Button variant="ghost-pill" size="pill" asChild>
            <a href="/resume.pdf" download="Abinash-Kunwar-Chhetri-Resume.pdf">
              Download Resume
            </a>
          </Button>
        </div>
      </FadeIn>

      <NavAnchor
        href="/#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="animate-bounce motion-reduce:animate-none" size={20} />
      </NavAnchor>
    </section>
  );
};

export default Hero;
