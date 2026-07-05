// ─────────────────────────────────────────────────────────────────────────────
// CommandMenu
// ─────────────────────────────────────────────────────────────────────────────
// Cmd+K / Ctrl+K quick-navigation palette — jumps to sections/routes and
// opens external profiles. Delight-layer feature, keyboard-accessible by
// construction since it's built on the shadcn Command (cmdk) primitive.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { Briefcase, FileText, FolderGit2, Home, Mail, Sparkles, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import GithubIcon from "@/components/shared/GithubIcon";
import LinkedinIcon from "@/components/shared/LinkedinIcon";
import { useSectionNav } from "@/hooks/use-section-nav.hook";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ROUTES } from "@/lib/constants/routes.constants";
import { SOCIAL_LINKS } from "@/lib/constants/site.constants";

export const COMMAND_MENU_OPEN_EVENT = "command-menu:open";

const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { scrollToHash } = useSectionNav();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    // Navbar's visible "⌘K" button triggers the same menu via this event,
    // so open-state ownership stays here instead of being lifted/prop-drilled.
    const handleOpenRequest = () => setOpen(true);

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener(COMMAND_MENU_OPEN_EVENT, handleOpenRequest);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(COMMAND_MENU_OPEN_EVENT, handleOpenRequest);
    };
  }, []);

  const navigateTo = (href: string) => {
    setOpen(false);
    if (href.startsWith("http") || href.startsWith("mailto:") || href.endsWith(".pdf")) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    // In-page section scroll when already home; else full-nav to /#id so the
    // clean single hash lands and HashScroll picks it up on load.
    if (scrollToHash(href)) return;
    if (href.includes("#")) {
      window.location.assign(href);
      return;
    }
    router.push(href);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Quick navigation">
      <CommandInput placeholder="Jump to a section or open a link..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => navigateTo(ROUTES.HOME)}>
            <Home /> Home
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/#about")}>
            <User /> About
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/#skills")}>
            <Sparkles /> Skills
          </CommandItem>
          <CommandItem onSelect={() => navigateTo(ROUTES.PROJECTS)}>
            <FolderGit2 /> Projects
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/#experience")}>
            <Briefcase /> Experience
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/#contact")}>
            <Mail /> Contact
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => navigateTo(SOCIAL_LINKS.github)}>
            <GithubIcon size={16} /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => navigateTo(SOCIAL_LINKS.linkedin)}>
            <LinkedinIcon size={16} /> LinkedIn
          </CommandItem>
          <CommandItem onSelect={() => navigateTo("/resume.pdf")}>
            <FileText /> Download Resume
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandMenu;
