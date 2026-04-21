import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";

/**
 * Foundations — Colour.
 * Cream + ink + vermillion. Navy is not part of this system.
 * Two colours max on any physical product.
 */

type Swatch = {
  name: string;
  hex: string;
  cssVar: string;
  needsBorder?: boolean;
};

const SWATCHES: Swatch[] = [
  { name: "Cream",         hex: "#F5F1EA", cssVar: "var(--brand-cream)",           needsBorder: true },
  { name: "Surface",       hex: "#FFFDF8", cssVar: "var(--brand-surface)",         needsBorder: true },
  { name: "Ink",           hex: "#111111", cssVar: "var(--brand-ink)" },
  { name: "Stone",         hex: "#6B645A", cssVar: "var(--brand-mute)" },
  { name: "Sand",          hex: "#CFC4AF", cssVar: "var(--brand-rule)" },
  { name: "Kraft",         hex: "#C4A882", cssVar: "var(--brand-kraft)" },
  { name: "Vermillion",    hex: "#D93A2B", cssVar: "var(--brand-vermillion)" },
  { name: "Vermillion Dk", hex: "#B22D21", cssVar: "var(--brand-vermillion-dark)" },
  { name: "Amber",         hex: "#D97706", cssVar: "var(--brand-amber)" },
];

export function ColourSwatches() {
  return (
    <Section>
      <SectionLabel>Foundations</SectionLabel>
      <SectionTitle>Colour</SectionTitle>
      <SectionDesc>
        Cream + ink + vermillion. Navy is not part of this system. Two colours max on any physical
        product.
      </SectionDesc>

      <div className="grid grid-cols-6 gap-4">
        {SWATCHES.map((s) => (
          <div key={s.name} className="border border-rule rounded-sm overflow-hidden">
            <div
              className="h-[100px]"
              style={{
                background: s.cssVar,
                borderBottom: s.needsBorder ? "1px solid var(--brand-rule)" : undefined,
              }}
            />
            <div className="p-3">
              <div className="text-[13px] font-medium text-ink">{s.name}</div>
              <div className="text-[9px] text-mute" style={{ fontFamily: "var(--font-mono)" }}>
                {s.hex}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
