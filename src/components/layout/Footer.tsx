// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
// Closes every page. Kept quiet/utility — the Contact section is the page's
// actual closing statement, per the Slack-derived "hero-gradient-mesh" band.
// ─────────────────────────────────────────────────────────────────────────────

import { Mail } from "lucide-react";
import Link from "next/link";

import GithubIcon from "@/components/shared/GithubIcon";
import LinkedinIcon from "@/components/shared/LinkedinIcon";
import { SITE, SOCIAL_LINKS } from "@/lib/constants/site.constants";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-surface-1 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {SITE.name}. Built with Next.js.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full bg-surface-2 p-2.5 text-foreground transition hover:scale-105 hover:brightness-125"
          >
            <GithubIcon size={18} />
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full bg-surface-2 p-2.5 text-foreground transition hover:scale-105 hover:brightness-125"
          >
            <LinkedinIcon size={18} />
          </Link>
          <Link
            href={SOCIAL_LINKS.email}
            aria-label="Email"
            className="rounded-full bg-surface-2 p-2.5 text-foreground transition hover:scale-105 hover:brightness-125"
          >
            <Mail size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
