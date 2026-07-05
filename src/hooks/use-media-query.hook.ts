// ─────────────────────────────────────────────────────────────────────────────
// useMediaQuery
// ─────────────────────────────────────────────────────────────────────────────
// Subscribes to a media query via useSyncExternalStore rather than
// useEffect+setState, so React (not a post-mount effect) owns the
// server/client snapshot reconciliation — avoids the cascading-render lint
// warning and is the idiomatic way to read external browser state.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useSyncExternalStore } from "react";

const subscribe = (query: string) => (callback: () => void) => {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
};

export const useMediaQuery = (query: string): boolean => {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
};
