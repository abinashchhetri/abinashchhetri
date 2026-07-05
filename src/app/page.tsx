// ─────────────────────────────────────────────────────────────────────────────
// Home
// ─────────────────────────────────────────────────────────────────────────────
// Composes the one-page portfolio: Hero → About → Skills → Projects →
// Experience → Open Source → Contact. Server Component — each section handles
// its own client-only needs internally.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import OpenSource from "@/components/sections/OpenSource";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { buildMetadata, buildProfilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Abinash Kunwar Chhetri — Software Engineer, Frontend",
  description:
    "Frontend-focused software engineer building production-grade web apps in Next.js, React 19, and TypeScript. Explore real shipped projects, skills, and experience.",
  path: "/",
});

export default function HomePage() {
  const jsonLd = buildProfilePageJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <OpenSource />
      <Contact />
    </>
  );
}
