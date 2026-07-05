// ─────────────────────────────────────────────────────────────────────────────
// Logo
// ─────────────────────────────────────────────────────────────────────────────
// Monogram mark built from the initials "AC" (Abinash Chhetri). The squircle
// carries a subtle primary→violet→cyan gradient — a deliberate echo of the
// hero gradient-mesh, the design system's one signature use of all three
// accents together — with a hairline inner ring for a crafted, tactile edge.
// The wordmark pairs Inter bold with an accent-primary period as the sole
// functional-color accent. Used in the navbar (with wordmark) and footer.
// ─────────────────────────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

interface Props {
  withWordmark?: boolean;
  className?: string;
}

const Logo = ({ withWordmark = true, className }: Props) => {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="relative grid size-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-accent-primary via-accent-violet to-accent-cyan text-[15px] font-bold leading-none tracking-tight text-white shadow-[var(--shadow-level-1)]"
      >
        AC
        <span className="pointer-events-none absolute inset-0 rounded-[11px] ring-1 ring-inset ring-white/20" />
      </span>
      {withWordmark && (
        <span className="text-base font-bold tracking-tight">
          Abinash<span className="text-accent-primary">.</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
