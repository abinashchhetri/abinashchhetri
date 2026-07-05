// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────
// Sticky top nav with backdrop-blur — the one place glassmorphism earns its
// keep per the design system. Nav links use the same 700/400 active/inactive
// weight pattern Notion and Spotify both converge on independently.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Command } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { COMMAND_MENU_OPEN_EVENT } from "@/components/layout/CommandMenu";
import Logo from "@/components/layout/Logo";
import MobileNav from "@/components/layout/MobileNav";
import NavAnchor from "@/components/layout/NavAnchor";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { NAV_ITEMS } from "@/lib/constants/site.constants";

const Navbar = () => {
  const pathname = usePathname();
  const openCommandMenu = () => window.dispatchEvent(new Event(COMMAND_MENU_OPEN_EVENT));

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Home" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            // Hash links never mark active; the Projects route highlights on
            // /projects and its case-study children.
            const isActive = !item.href.startsWith("/#") && pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <NavAnchor
                  href={item.href}
                  className={
                    isActive
                      ? "text-nav-link font-bold text-foreground"
                      : "text-nav-link text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {item.label}
                </NavAnchor>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openCommandMenu}
            className="hidden gap-2 sm:inline-flex"
            aria-label="Open quick navigation (Cmd+K)"
          >
            <Command size={14} />
            <span className="text-xs">⌘K</span>
          </Button>
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
