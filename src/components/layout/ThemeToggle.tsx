// ─────────────────────────────────────────────────────────────────────────────
// ThemeToggle
// ─────────────────────────────────────────────────────────────────────────────
// Circular icon button that flips between dark (default/primary) and light.
// useHasMounted guards against a hydration mismatch since the resolved theme
// is only known client-side.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useHasMounted } from "@/hooks/use-has-mounted.hook";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const hasMounted = useHasMounted();

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Button
      type="button"
      variant="icon-circular"
      size="icon-circular"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
    >
      {hasMounted && resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeToggle;
