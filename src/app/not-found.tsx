// ─────────────────────────────────────────────────────────────────────────────
// NotFound
// ─────────────────────────────────────────────────────────────────────────────
// Custom, on-brand 404 — never the Next.js default.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="hero-gradient-mesh flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-eyebrow uppercase text-accent-primary">404</p>
      <h1 className="mt-2 text-heading">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for was moved or never existed.
      </p>
      <Button variant="primary-pill" size="pill" asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
