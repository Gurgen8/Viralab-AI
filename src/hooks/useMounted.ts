"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only on the client after hydration — avoids SSR/client mismatches. */
export function useMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
