// ─────────────────────────────────────────────────────────────────────────────
// MobileNav
// ─────────────────────────────────────────────────────────────────────────────
// Hamburger + slide-in sidebar for small screens (hidden at md and up). Opens
// to 70% of the viewport width, lists the same NAV_ITEMS as the desktop bar,
// and closes itself on navigation so a hash link actually scrolls the page
// underneath. Also surfaces the resume + socials so the whole nav is reachable
// on mobile.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import GithubIcon from "@/components/shared/GithubIcon";
import LinkedinIcon from "@/components/shared/LinkedinIcon";
import Logo from "@/components/layout/Logo";
import NavAnchor from "@/components/layout/NavAnchor";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants/site.constants";

const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="icon-circular"
          size="icon-circular"
          className="md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[70%]! max-w-none! gap-0 px-0">
        <SheetHeader className="border-b border-hairline px-5 pb-4">
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavAnchor
              key={item.href}
              href={item.href}
              onNavigate={() => setOpen(false)}
              className="rounded-sm px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-2"
            >
              {item.label}
            </NavAnchor>
          ))}
        </nav>

        <div className="mt-auto border-t border-hairline px-5 py-5">
          <SheetClose asChild>
            <a
              href="/resume.pdf"
              download="Abinash-Kunwar-Chhetri-Resume.pdf"
              className="block rounded-pill border border-accent-primary px-4 py-2.5 text-center text-button-label uppercase text-accent-primary"
            >
              Download Resume
            </a>
          </SheetClose>

          <div className="mt-5 flex items-center gap-3">
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full bg-surface-2 p-2.5 text-foreground"
            >
              <GithubIcon size={18} />
            </Link>
            <Link
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full bg-surface-2 p-2.5 text-foreground"
            >
              <LinkedinIcon size={18} />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
