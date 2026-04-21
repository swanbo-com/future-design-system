"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Register GSAP plugins exactly once on the client.
 *
 * Import `gsapReady` anywhere you need GSAP + ScrollTrigger — it's a no-op
 * on the server and runs the registration once on the client. This avoids
 * the "ScrollTrigger not registered" warning and prevents duplicate
 * registrations across hot reloads.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Wrap any GSAP timeline/animation in this helper to automatically honor
 * `prefers-reduced-motion`. If the user has reduced motion on, the fallback
 * function runs instead (typically just setting final states instantly).
 */
export function respectMotion(
  animate: () => void,
  fallback?: () => void,
): void {
  if (typeof window === "undefined") return;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) {
    fallback?.();
  } else {
    animate();
  }
}
