// ─────────────────────────────────────────────────────────────────────────────
// SkillCard
// ─────────────────────────────────────────────────────────────────────────────
// One skill-category card — surface-1 fill, one decorative sticker dot, never
// a full-card color fill (that's reserved for accent-primary CTAs only).
// ─────────────────────────────────────────────────────────────────────────────

import type { ISkillCategory } from "@/content/skills";

const DOT_CLASS_MAP: Record<ISkillCategory["dotColor"], string> = {
  sky: "bg-sticker-sky",
  purple: "bg-sticker-purple",
  pink: "bg-sticker-pink",
  orange: "bg-sticker-orange",
  teal: "bg-sticker-teal",
  green: "bg-sticker-green",
};

interface Props {
  category: ISkillCategory;
}

const SkillCard = ({ category }: Props) => {
  return (
    <div className="rounded-md border border-hairline bg-surface-1 p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className={`size-2.5 rounded-full ${DOT_CLASS_MAP[category.dotColor]}`} aria-hidden />
        <h3 className="text-sm font-bold">{category.category}</h3>
      </div>
      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm text-muted-foreground">
        {category.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default SkillCard;
