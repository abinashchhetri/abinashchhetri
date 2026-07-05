// ─────────────────────────────────────────────────────────────────────────────
// useHasMounted
// ─────────────────────────────────────────────────────────────────────────────
// True only after client hydration completes — used to defer rendering
// anything that depends on browser-only state (e.g. resolved theme) until
// it's safe, without the cascading-render pattern of setState-in-effect.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useHasMounted = (): boolean => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
};
