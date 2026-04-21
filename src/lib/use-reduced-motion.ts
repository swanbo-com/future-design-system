"use client";

import { useEffect, useState } from "react";

/**
 * Respects the user's OS-level reduced-motion preference. Returns `true` if
 * the user has asked for reduced motion — components should degrade to static
 * states when this is true.
 *
 * SSR-safe: initial value is `false` so the server renders the full-motion
 * version, then hydrates to the real preference client-side.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
