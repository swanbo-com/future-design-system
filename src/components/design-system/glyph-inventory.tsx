import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";
import { Glyph } from "./glyph";

/**
 * Ornaments, arrows, hands — full Blazeface glyph inventory.
 * Every mark here is a real glyph, not a drawn icon. See GLYPHS.md
 * for codepoint table and use rules.
 */

type GlyphEntry = { char: string; code: string };

const STARS: GlyphEntry[] = [
  { char: "\u2738", code: "U+2738" }, // ✸
  { char: "\u2739", code: "U+2739" }, // ✹
  { char: "\u273A", code: "U+273A" }, // ✺
  { char: "\u2749", code: "U+2749" }, // ❉ canonical
  { char: "\u2605", code: "U+2605" }, // ★
];

const ARROWS: GlyphEntry[] = [
  { char: "\u27A4", code: "U+27A4" },
  { char: "\u27A5", code: "U+27A5" },
  { char: "\u27A7", code: "U+27A7" },
  { char: "\u27A8", code: "U+27A8" },
  { char: "\u27B5", code: "U+27B5" },
  { char: "\u27BB", code: "U+27BB" },
  { char: "\u27BC", code: "U+27BC" },
  { char: "\u27BD", code: "U+27BD" },
  { char: "\u27BE", code: "U+27BE" },
  { char: "\u27B0", code: "U+27B0" },
];

const HANDS: GlyphEntry[] = [
  { char: "\u261C", code: "U+261C" }, // ☜
  { char: "\u261E", code: "U+261E" }, // ☞
  { char: "\u270C", code: "U+270C" }, // ✌
  { char: "\u270D", code: "U+270D" }, // ✍
  { char: "\u2712", code: "U+2712" }, // ✒
];

const SOLIDS: GlyphEntry[] = [
  { char: "\u25A0", code: "U+25A0" }, // ■
  { char: "\u25CF", code: "U+25CF" }, // ●
  { char: "\u2022", code: "U+2022" }, // •
];

function GlyphGroup({ label, entries }: { label: string; entries: GlyphEntry[] }) {
  return (
    <div className="mb-10">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">{label}</p>
      <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))" }}>
        {entries.map((e) => (
          <div
            key={e.code}
            className="flex min-h-[110px] flex-col items-center justify-center gap-3 rounded-sm border border-rule bg-surface p-5"
          >
            <Glyph char={e.char} size="lg" fontSize={44} />
            <span className="text-[9px] text-mute tracking-[0.04em]" style={{ fontFamily: "var(--font-mono)" }}>
              {e.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GlyphInventory() {
  return (
    <Section>
      <SectionLabel>Typographic marks</SectionLabel>
      <SectionTitle>Ornaments, arrows, hands</SectionTitle>
      <SectionDesc>
        Every mark here is a real Blazeface glyph, not a drawn icon. Use these — not Lucide icons —
        whenever a mark appears in a typographic context (headline, pull quote, sticker, poster,
        marketing copy). Lucide stays inside the UI. Full codepoint table in{" "}
        <code className="font-mono">GLYPHS.md</code>.
      </SectionDesc>

      <GlyphGroup label="Stars & ornaments" entries={STARS} />
      <GlyphGroup label="Arrows" entries={ARROWS} />
      <GlyphGroup label="Hands" entries={HANDS} />
      <GlyphGroup label="Solid shapes — for sub-12 px where hairlines collapse" entries={SOLIDS} />
    </Section>
  );
}
