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
      
      {withWordmark && (
        <span className="text-base font-bold tracking-tight">
          Abinash<span className="text-accent-primary">.</span>
        </span>
      )}
    </span>
  );
};

export default Logo;
