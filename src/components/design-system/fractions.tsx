import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";

/**
 * Proper fractions via Blazeface `frac` OpenType feature.
 * Write plain ASCII numerators/denominators, apply font-feature-settings.
 */

const FRAC_STYLE = { fontFeatureSettings: '"frac" on' };

export function Fractions() {
  return (
    <Section>
      <SectionLabel>Numerals</SectionLabel>
      <SectionTitle>Proper fractions</SectionTitle>
      <SectionDesc>
        Any numerator/denominator pair. Write plain ASCII in markup (<code className="font-mono">1/2</code>)
        and apply <code className="font-mono">font-feature-settings: &quot;frac&quot;</code> —
        Blazeface substitutes a true single-glyph fraction. Not limited to ½ ¼ ¾.
      </SectionDesc>

      <div className="flex flex-wrap items-end gap-12">
        <div className="flex flex-col gap-3">
          <span
            className="text-[56px] leading-none text-ink"
            style={{ fontFamily: "var(--font-display-48)", fontWeight: 900, ...FRAC_STYLE }}
          >
            1/2 OFF
          </span>
          <span className="text-[9px] text-mute uppercase tracking-[0.14em]">
            Marketing headline · 48 pt cut
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span
            className="text-[40px] leading-none text-ink"
            style={{ fontFamily: "var(--font-display-36)", fontWeight: 900, ...FRAC_STYLE }}
          >
            3/4 FUNDED
          </span>
          <span className="text-[9px] text-mute uppercase tracking-[0.14em]">
            Progress callout · 36 pt cut
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <span
            className="text-[40px] leading-none text-ink"
            style={{ fontFamily: "var(--font-display-36)", fontWeight: 900, ...FRAC_STYLE }}
          >
            7/10 DAYS
          </span>
          <span className="text-[9px] text-mute uppercase tracking-[0.14em]">
            Countdown · 36 pt cut
          </span>
        </div>
      </div>
    </Section>
  );
}
