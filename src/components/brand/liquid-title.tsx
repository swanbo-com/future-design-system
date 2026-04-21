"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * LiquidTitle — renders a text string with each letter wrapped in a span
 * and animated in a continuous sine-wave bob (water / pacific motion).
 *
 * - Each letter gets a staggered phase offset so the wave rolls across the
 *   wordmark instead of moving as one block.
 * - `sine.inOut` easing + yoyo + infinite repeat = endless buoy-rocking motion.
 * - Gently small amplitude (~6px translate) — readable, not nauseating.
 * - Respects `prefers-reduced-motion` via `gsap.matchMedia`.
 * - `aria-label` on the wrapper preserves the string for screen readers;
 *   each letter span is `aria-hidden`.
 *
 * Optionally animates an entrance stagger on mount when `entrance` is true.
 * Uses the existing `.liquid-entrance` class in GSAP `.from` so the entrance
 * and the wave can coexist.
 */

type LiquidTitleProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
  amplitude?: number;
  duration?: number;
  stagger?: number;
  entrance?: boolean;
};

export function LiquidTitle({
  text,
  className,
  style,
  amplitude = 6,
  duration = 2.8,
  stagger = 0.1,
  entrance = true,
}: LiquidTitleProps) {
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mq = gsap.matchMedia();

      mq.add("(prefers-reduced-motion: no-preference)", () => {
        const letters = scope.current?.querySelectorAll(".liquid-letter");
        if (!letters || letters.length === 0) return;

        // Entrance: drop each letter from above with stagger
        if (entrance) {
          gsap.from(letters, {
            y: 120,
            opacity: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "power4.out",
          });
        }

        // Continuous wave — fires after the entrance by delaying slightly
        const waveDelay = entrance ? 1.4 : 0;
        letters.forEach((letter, i) => {
          gsap.to(letter, {
            y: -amplitude,
            duration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: waveDelay + i * stagger,
          });
        });
      });

      mq.add("(prefers-reduced-motion: reduce)", () => {
        const letters = scope.current?.querySelectorAll(".liquid-letter");
        if (letters) gsap.set(letters, { clearProps: "all" });
      });

      return () => mq.revert();
    },
    { scope },
  );

  return (
    <span
      ref={scope}
      className={cn("inline-flex", className)}
      style={style}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="liquid-letter inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch === " " ? "\u00A0\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}
