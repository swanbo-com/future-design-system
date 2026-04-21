"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Countdown pill — Days:Hours:Minutes (no seconds per UX spec §Micro-Interactions).
 * Gentle pulse on the colon separators (1s interval).
 * Amber warning in the final 48 hours.
 *
 * Target date is hard-coded to 30 April 2026 00:00 UTC for Campaign Zero.
 * Wire to a prop or config when we run multiple campaigns.
 */

const LAUNCH_ISO = "2026-04-30T00:00:00Z";

function computeDelta(targetMs: number) {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  return { days, hours, mins, isLive: diff === 0, isFinal48: diff > 0 && diff < 48 * 3_600_000 };
}

type CountdownPillProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function CountdownPill({ className, variant = "dark" }: CountdownPillProps) {
  const targetMs = Date.parse(LAUNCH_ISO);
  const [t, setT] = useState(() => computeDelta(targetMs));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setT(computeDelta(targetMs)), 30_000);
    return () => clearInterval(id);
  }, [targetMs]);

  const baseClass =
    variant === "light"
      ? "bg-ink/85 text-cream border-ink/10"
      : "bg-surface/85 text-ink border-ink/15";

  const accentClass = t.isFinal48 ? "text-amber" : "text-vermillion";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-md",
        baseClass,
        className,
      )}
      style={{ fontFamily: "var(--font-mono)" }}
      aria-live="polite"
      aria-label={`${t.days} days ${t.hours} hours ${t.mins} minutes until launch`}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", accentClass)}
        style={{
          backgroundColor: "currentColor",
          animation: reducedMotion ? "none" : "countdown-dot 1.4s ease-in-out infinite",
        }}
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] opacity-70">
        {t.isLive ? "Live" : t.isFinal48 ? "Final hours" : "Launches in"}
      </span>
      {!t.isLive && (
        <span
          className="text-[13px] font-bold tabular-nums"
          style={{ letterSpacing: "-0.01em" }}
        >
          {String(t.days).padStart(2, "0")}
          <Colon reducedMotion={reducedMotion} />
          {String(t.hours).padStart(2, "0")}
          <Colon reducedMotion={reducedMotion} />
          {String(t.mins).padStart(2, "0")}
        </span>
      )}
      <style jsx>{`
        @keyframes countdown-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes countdown-colon {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function Colon({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <span
      className="mx-0.5 inline-block"
      style={{
        animation: reducedMotion ? "none" : "countdown-colon 1.4s ease-in-out infinite",
      }}
    >
      :
    </span>
  );
}
