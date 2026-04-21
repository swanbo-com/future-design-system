import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * SectionHeading — the editorial kicker-title-sub stack used at the top of
 * every landing section. Pairs a small Instrument Sans uppercase kicker with
 * a heavy Blazeface display title and an optional descriptive lead.
 *
 * Example:
 *   <SectionHeading kicker="The story" title="What we're building" />
 */

type SectionHeadingProps = {
  kicker?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  titleSize?: "md" | "lg" | "xl";
  className?: string;
};

const TITLE_SIZE = {
  md: { fontFamily: "var(--font-display-36)", fontSize: "clamp(32px, 4vw, 44px)" },
  lg: { fontFamily: "var(--font-display-48)", fontSize: "clamp(44px, 5.5vw, 64px)" },
  xl: { fontFamily: "var(--font-display-60)", fontSize: "clamp(56px, 7vw, 88px)" },
} as const;

export function SectionHeading({
  kicker,
  title,
  sub,
  align = "left",
  titleSize = "lg",
  className,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={cn("flex flex-col gap-3", alignClass, className)}>
      {kicker ? (
        <p
          className="text-[11px] font-medium uppercase tracking-[0.22em] text-mute"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {kicker}
        </p>
      ) : null}
      <h2
        className="m-0 leading-[0.92] tracking-[0.005em] text-foreground"
        style={{ fontWeight: 900, ...TITLE_SIZE[titleSize] }}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-2 max-w-[640px] text-[15px] leading-relaxed text-mute md:text-[17px]",
            align === "center" && "mx-auto",
          )}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}
