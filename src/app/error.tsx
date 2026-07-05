// ─────────────────────────────────────────────────────────────────────────────
// Error Boundary
// ─────────────────────────────────────────────────────────────────────────────
// Custom, on-brand error boundary — never the Next.js default. Must be a
// Client Component per the App Router error.tsx contract.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="hero-gradient-mesh flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-eyebrow uppercase text-destructive">Error</p>
      <h1 className="mt-2 text-heading">Something went wrong</h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        An unexpected error occurred while rendering this page.
      </p>
      <Button variant="primary-pill" size="pill" onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}
