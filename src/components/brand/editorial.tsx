import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import { Glyph, DINGBATS } from "./glyph";

/**
 * Editorial primitives — the small text patterns that appear across every
 * page. Keep these tight and opinionated so layout decisions stay consistent.
 */

/* ============================================
   Lede — large intro paragraph
   ============================================ */
type LedeProps = HTMLAttributes<HTMLParagraphElement>;
export function Lede({ className, children, ...rest }: LedeProps) {
  return (
    <p
      className={cn(
        "max-w-[640px] text-[20px] leading-relaxed text-foreground md:text-[22px]",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

/* ============================================
   PullQuote — Blazeface Italic editorial quote
   ============================================ */
type PullQuoteProps = {
  children: ReactNode;
  cite?: string;
  className?: string;
};

export function PullQuote({ children, cite, className }: PullQuoteProps) {
  return (
    <figure className={cn("max-w-[760px] py-8", className)}>
      <blockquote
        className="m-0 text-[28px] italic leading-[1.2] text-foreground md:text-[36px]"
        style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
      >
        {children}
      </blockquote>
      {cite ? (
        <figcaption
          className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-mute"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <Glyph char={DINGBATS.floret} size="xs" fontSize={11} />
          <span>{cite}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ============================================
   SunDivider — vertical or horizontal break
   with a floret in the centre
   ============================================ */
type SunDividerProps = {
  orientation?: "horizontal" | "vertical";
  width?: number;
  className?: string;
};

export function SunDivider({
  orientation = "horizontal",
  width = 30,
  className,
}: SunDividerProps) {
  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <span className="w-px bg-ink" style={{ height: width }} />
        <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
        <span className="w-px bg-ink" style={{ height: width }} />
      </div>
    );
  }
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="h-px flex-1 bg-current opacity-40" />
      <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
      <span className="h-px flex-1 bg-current opacity-40" />
    </div>
  );
}

/* ============================================
   StoryImage — figure with caption
   ============================================ */
type StoryImageProps = {
  src?: string;
  alt: string;
  caption?: ReactNode;
  aspectRatio?: string;
  className?: string;
  /**
   * If true, show a cream placeholder block instead of <img>. Useful while
   * the real photography is still being sourced.
   */
  placeholder?: boolean;
  placeholderLabel?: string;
};

export function StoryImage({
  src,
  alt,
  caption,
  aspectRatio = "4 / 3",
  className,
  placeholder,
  placeholderLabel,
}: StoryImageProps) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div
        className="relative w-full overflow-hidden rounded-sm bg-kraft"
        style={{ aspectRatio }}
      >
        {placeholder || !src ? (
          <div
            className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(45deg,var(--brand-kraft)_0_14px,#b89a72_14px_28px)] text-[10px] uppercase tracking-[0.18em] text-ink/60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {placeholderLabel ?? "Placeholder · real photo to follow"}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
        )}
      </div>
      {caption ? (
        <figcaption
          className="text-[11px] uppercase tracking-[0.12em] text-mute"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
