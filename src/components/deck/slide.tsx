import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Slide primitive — 1920×1080 wrapper for the pitch deck.
 *
 * CSS page-break-after makes each <Slide> a single page when rendered
 * to PDF via Playwright. In browser view they stack vertically at full
 * size — scroll to rehearse, arrow keys to navigate via the deck shell.
 */

type SlideProps = {
  number: number;
  total: number;
  title?: string;
  children: ReactNode;
  className?: string;
  /**
   * Background colour key. Cream is the default (matches landing page);
   * ink is for the cover + closing slides.
   */
  bg?: "cream" | "ink" | "surface" | "vermillion";
};

const BG_CLASSES: Record<NonNullable<SlideProps["bg"]>, string> = {
  cream: "bg-cream text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-[#0F0F0F] text-[#FAFAF9]",
  vermillion: "bg-vermillion text-[#FAFAF9]",
};

export function Slide({ number, total, title, children, className, bg = "cream" }: SlideProps) {
  return (
    <section
      className={cn(
        "slide relative flex flex-col overflow-hidden",
        BG_CLASSES[bg],
        className,
      )}
      aria-label={title ? `Slide ${number}: ${title}` : `Slide ${number}`}
    >
      {/* Slide chrome: number bottom-left, brand mark bottom-right */}
      <div className="slide-chrome pointer-events-none absolute bottom-10 left-12 z-10 flex items-center gap-3 text-[14px] opacity-60">
        <span
          className="tabular-nums"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
        >
          {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        {title ? (
          <span
            className="uppercase tracking-[0.14em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            · {title}
          </span>
        ) : null}
      </div>

      <div
        className="slide-footer pointer-events-none absolute bottom-10 right-12 z-10 text-[14px] opacity-60"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        future.ly · pacific kings · 30 april 2026
      </div>

      <div className="relative flex h-full w-full flex-col">{children}</div>
    </section>
  );
}
