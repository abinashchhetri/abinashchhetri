// ─────────────────────────────────────────────────────────────────────────────
// ThemeProvider
// ─────────────────────────────────────────────────────────────────────────────
// Thin wrapper around next-themes. Dark is the default and primary theme per
// the design system — light is a supported but secondary toggle target.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

const ThemeProvider = ({ children, ...props }: ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
};

export default ThemeProvider;
