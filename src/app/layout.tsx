// ─────────────────────────────────────────────────────────────────────────────
// RootLayout
// ─────────────────────────────────────────────────────────────────────────────
// Fonts, theme, smooth scroll, query client, tooltips, and toasts all mount
// here once for the whole app. Root metadata + Person/WebSite JSON-LD live
// here since they apply to every route.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import CommandMenu from "@/components/layout/CommandMenu";
import Footer from "@/components/layout/Footer";
import HashScroll from "@/components/layout/HashScroll";
import Navbar from "@/components/layout/Navbar";
import { SITE } from "@/lib/constants/site.constants";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/seo";
import LenisProvider from "@/providers/lenis.provider";
import ReactQueryProvider from "@/providers/react-query.provider";
import ThemeProvider from "@/providers/theme.provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.title}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  authors: [{ name: SITE.name, url: SITE.url }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [buildPersonJsonLd(), buildWebsiteJsonLd()];

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <ReactQueryProvider>
            <LenisProvider>
              <HashScroll />
              <TooltipProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CommandMenu />
              </TooltipProvider>
            </LenisProvider>
            <Toaster theme="dark" position="bottom-right" richColors />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
