// ─────────────────────────────────────────────────────────────────────────────
// ReactQueryProvider
// ─────────────────────────────────────────────────────────────────────────────
// Wraps the app in a TanStack Query client. One client per browser session,
// created lazily in state so it isn't shared across requests on the server.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
