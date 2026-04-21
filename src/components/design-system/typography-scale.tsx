import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";

/**
 * Typography — Nine optical sizes.
 * Port of the `Nine optical sizes` section from design-system/index.html.
 * Each row renders a real Blazeface cut at the size it was drawn for.
 */

type Row = {
  meta: string;
  sample: string;
  fontFamily: string;
  fontSize: number;
  italic?: boolean;
  lineHeight?: number;
};

const ROWS: Row[] = [
  { meta: "72 pt · Roman",  sample: "Pacific Kings",                                                          fontFamily: "var(--font-display)",    fontSize: 72, lineHeight: 0.95 },
  { meta: "72 pt · Italic", sample: "Pacific Kings",                                                          fontFamily: "var(--font-display)",    fontSize: 72, italic: true, lineHeight: 0.95 },
  { meta: "60 pt",          sample: "Quite Large",                                                            fontFamily: "var(--font-display-60)", fontSize: 60, lineHeight: 0.95 },
  { meta: "48 pt",          sample: "Absolutely stupid",                                                      fontFamily: "var(--font-display-48)", fontSize: 48, lineHeight: 1 },
  { meta: "36 pt",          sample: "I can\u2019t believe it exists.",                                         fontFamily: "var(--font-display-36)", fontSize: 36, lineHeight: 1 },
  { meta: "24 pt · Italic", sample: "They started with a plank of coconut wood.",                             fontFamily: "var(--font-display-24)", fontSize: 24, italic: true, lineHeight: 1.1 },
  { meta: "18 pt · Italic", sample: "In Siargao, where the Pacific meets the Philippines, a crew of kids are building skateboards from what the island gives them. This print was shot on 35mm during the first month of the build.", fontFamily: "var(--font-display-18)", fontSize: 18, italic: true, lineHeight: 1.3 },
  { meta: "16 pt",          sample: "But then again, it\u2019s kind of beautiful. In a strange way. I must have it.", fontFamily: "var(--font-display-16)", fontSize: 16, lineHeight: 1.35 },
  { meta: "14 pt",          sample: "You think money grows on trees? Even if it did, no thanks.",             fontFamily: "var(--font-display-14)", fontSize: 14, lineHeight: 1.4 },
  { meta: "12 pt",          sample: "Every pound accounted for. Ships from Siargao for delivery worldwide.", fontFamily: "var(--font-display-12)", fontSize: 12, lineHeight: 1.5 },
];

export function TypographyScale() {
  return (
    <Section>
      <SectionLabel>Typography</SectionLabel>
      <SectionTitle>Nine optical sizes</SectionTitle>
      <SectionDesc>
        Each cut is a different drawing, not a scaled version. Use the right cut for the size.
        72 pt for the wordmark outlining master; 18 pt for body copy on the story panel; never mix.
      </SectionDesc>

      <div>
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="flex items-baseline gap-6 py-4 border-b border-dashed border-rule last:border-b-0"
          >
            <div className="w-[140px] flex-shrink-0 text-[13px] text-mute" style={{ fontFamily: "var(--font-mono)" }}>
              {row.meta}
            </div>
            <div
              className="flex-1"
              style={{
                fontFamily: row.fontFamily,
                fontSize: row.fontSize,
                fontStyle: row.italic ? "italic" : "normal",
                fontWeight: 900,
                lineHeight: row.lineHeight,
              }}
            >
              {row.sample}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
