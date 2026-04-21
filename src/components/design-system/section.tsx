import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

/**
 * Section scaffolding — mirrors the `<section>` + `.section-label` +
 * `.section-title` + `.section-desc` pattern from design-system/index.html
 * so every part of the doc has the same rhythm.
 */

type SectionProps = HTMLAttributes<HTMLElement>;

export function Section({ className, children, ...rest }: SectionProps) {
  return (
    <section className={cn("mb-24", className)} {...rest}>
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="mb-3 text-[36px] font-black leading-tight tracking-[0.01em]"
      style={{ fontFamily: "var(--font-display-36)" }}
    >
      {children}
    </h2>
  );
}

export function SectionDesc({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 max-w-[700px] text-[13px] leading-relaxed text-mute">
      {children}
    </p>
  );
}

export function SubHead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
      {children}
    </p>
  );
}
