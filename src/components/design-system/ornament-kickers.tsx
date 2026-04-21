import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";
import { Flanker } from "./glyph";

/**
 * Ornament-flanked kickers — the flourish-phrase-flourish pattern
 * from the Blazeface specimen. Print-only per §4b of the brief.
 */

export function OrnamentKickers() {
  return (
    <Section>
      <SectionLabel>Print device</SectionLabel>
      <SectionTitle>Ornament-flanked kickers &amp; numerals</SectionTitle>
      <SectionDesc>
        The <em>flourish-phrase-flourish</em> pattern from the Blazeface specimen. Print-only —
        would clutter the digital campaign page, but on a poster, sticker, or story panel it locks
        the system together. See brief §4b.
      </SectionDesc>

      <div className="flex flex-col gap-8">
        <div>
          <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
            <Flanker pair="A" side="left" fontSize={20} />
            KINGS OF THE PACIFIC
            <Flanker pair="A" side="right" fontSize={20} />
          </span>
        </div>
        <div>
          <span className="inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
            <Flanker pair="D" side="left" fontSize={20} />
            SHOT ON 35MM
            <Flanker pair="D" side="right" fontSize={20} />
          </span>
        </div>
        <div className="flex flex-wrap gap-10">
          <span
            className="inline-flex items-center gap-3 text-[28px] leading-none text-ink"
            style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
          >
            <span className="text-vermillion text-[14px]">
              <span style={{ fontFamily: "var(--font-display-14)" }}>{"\u2749"}</span>
            </span>
            £2,200
            <span className="text-vermillion text-[14px]">
              <span style={{ fontFamily: "var(--font-display-14)" }}>{"\u2749"}</span>
            </span>
          </span>
          <span
            className="inline-flex items-center gap-3 text-[28px] leading-none text-ink"
            style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
          >
            <span className="text-vermillion">
              <span style={{ fontFamily: "var(--font-display-14)", fontSize: 14 }}>{"\u2749"}</span>
            </span>
            14 DAYS LEFT
            <span className="text-vermillion">
              <span style={{ fontFamily: "var(--font-display-14)", fontSize: 14 }}>{"\u2749"}</span>
            </span>
          </span>
        </div>
      </div>
    </Section>
  );
}
