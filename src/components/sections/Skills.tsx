// ─────────────────────────────────────────────────────────────────────────────
// Skills
// ─────────────────────────────────────────────────────────────────────────────
// Renders SKILL_CATEGORIES (content/skills.ts) as a staggered grid of
// SkillCard tiles — frontend-first ordering preserved exactly as in the CV.
// ─────────────────────────────────────────────────────────────────────────────

import Reveal from "@/components/motion/Reveal";
import RevealItem from "@/components/motion/RevealItem";
import SkillCard from "@/components/shared/SkillCard";
import { SKILL_CATEGORIES } from "@/content/skills";

const Skills = () => {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-eyebrow uppercase text-accent-primary">Skills</p>
      <h2 className="mt-2 text-heading">Tools I build with</h2>

      <Reveal className="mt-10 grid gap-4 sm:grid-cols-2">
        {SKILL_CATEGORIES.map((category) => (
          <RevealItem key={category.category}>
            <SkillCard category={category} />
          </RevealItem>
        ))}
      </Reveal>
    </section>
  );
};

export default Skills;
