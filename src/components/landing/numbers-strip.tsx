import { Container } from "@/components/brand/container";
import { Glyph, DINGBATS } from "@/components/brand/glyph";

/**
 * NumbersStrip — the four numbers that anchor Campaign Zero.
 *
 * Sits between the hero lede ("Thirty days. One story.") and the thesis.
 * Purpose: give the page a numeric spine so the thesis lands with weight
 * instead of feeling aspirational. Florets between items.
 */

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "£5,000", label: "campaign target" },
  { value: "50", label: "funded exchanges" },
  { value: "30", label: "day countdown" },
  { value: "50%+", label: "strangers, not network" },
];

export function NumbersStrip() {
  return (
    <section id="numbers" className="border-y border-rule bg-surface py-14 md:py-20">
      <Container width="default">
        <div className="flex flex-col items-stretch gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-6 md:flex-nowrap md:gap-10">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4 sm:flex-1 sm:flex-col sm:items-start sm:gap-2">
              {i > 0 ? (
                <span className="hidden text-[11px] text-mute sm:hidden md:block md:text-ink/30" aria-hidden>
                  <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
                </span>
              ) : null}
              <div className="flex flex-col">
                <span
                  className="text-[28px] leading-none text-ink md:text-[36px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  className="mt-2 text-[10px] uppercase tracking-[0.16em] text-mute md:text-[11px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
