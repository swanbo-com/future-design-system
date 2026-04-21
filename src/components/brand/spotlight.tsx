"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Cursor-follow spotlight — a soft glow that tracks the mouse inside the
 * parent container. Desktop-only (CSS media query hides it on touch devices)
 * and auto-disabled when prefers-reduced-motion is set.
 *
 * Default tint is vermillion at 18% opacity on a 600px circle. Tweak via
 * props if a section needs a different vibe.
 */

type SpotlightProps = {
  className?: string;
  size?: number;
  intensity?: number;
  /** CSS rgb triplet, e.g. "217, 58, 43" (vermillion). No parens, no rgb(). */
  rgb?: string;
};

export function Spotlight({
  className,
  size = 600,
  intensity = 0.18,
  rgb = "217, 58, 43",
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    // Capability check runs once inside the effect — doesn't set state
    // unless the device actually supports hover/fine pointer.
    const capable = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!capable) return;

    const handleMove = (e: MouseEvent) => {
      const parent = ref.current?.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        setPos({ x, y });
      } else {
        setPos(null);
      }
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reducedMotion]);

  // No position yet (SSR, touch device, reduced motion, or cursor off-section)
  // — render an inert placeholder so the parent gets a stable DOM shape.
  if (!pos) {
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn("pointer-events-none absolute inset-0", className)}
      />
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 transition-opacity duration-300",
        className,
      )}
      style={{
        background: `radial-gradient(${size}px circle at ${pos.x}px ${pos.y}px, rgba(${rgb}, ${intensity}), transparent 70%)`,
      }}
    />
  );
}
