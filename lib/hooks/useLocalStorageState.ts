"use client";

import { useEffect, useState } from "react";

/** Generic localStorage-backed state. Reads happen after mount to avoid
 * SSR/client hydration mismatches; the initial render always uses
 * `initialValue` so server and first client render agree. */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      // Corrupt or inaccessible localStorage: fall back to initialValue.
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = (next: T) => {
    setValue(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — state still
      // updates in-memory for this session.
    }
  };

  return [value, update, hydrated];
}
