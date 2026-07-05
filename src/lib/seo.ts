// ─────────────────────────────────────────────────────────────────────────────
// SEO
// ─────────────────────────────────────────────────────────────────────────────
// Metadata + JSON-LD builders shared by every route. Centralizing this keeps
// title templates, canonical resolution, and structured data consistent
// instead of hand-rolled per page.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

import { SITE, SOCIAL_LINKS } from "@/lib/constants/site.constants";
import type { IProject } from "@/types/projects/projects.types";

export const buildMetadata = ({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata => {
  const url = new URL(path, SITE.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

export const buildPersonJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  url: SITE.url,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pokhara",
    addressCountry: "NP",
  },
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
});

export const buildWebsiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
});

export const buildProfilePageJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: buildPersonJsonLd(),
});

export const buildProjectJsonLd = (project: IProject) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: project.name,
  description: project.description,
  url: project.url,
  applicationCategory: "BusinessApplication",
  author: buildPersonJsonLd(),
});

export const buildBreadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: new URL(item.path, SITE.url).toString(),
  })),
});
