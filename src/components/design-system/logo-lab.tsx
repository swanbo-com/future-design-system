import { Section, SectionLabel, SectionTitle, SectionDesc, SubHead } from "./section";

/**
 * Logo lab — 10 wordmark treatments of `future.ly`.
 * Variant I (JetBrains Mono Bold lowercase) is the CANONICAL choice.
 */

type LogoVariant = {
  id: string;
  text: string;
  meta: string;
  fontFamily: string;
  fontSize: number;
  italic?: boolean;
  color?: string;
  letterSpacing?: string;
  canonical?: boolean;
};

function LogoCard({ variant, dark = false }: { variant: LogoVariant; dark?: boolean }) {
  const borderStyle = variant.canonical ? "border-2 border-vermillion" : "border border-rule";
  const bg = dark ? "bg-ink text-[#FAFAF9]" : "bg-surface text-ink";
  return (
    <div
      className={`${borderStyle} ${bg} flex min-h-[180px] flex-col items-center justify-center gap-5 rounded-sm p-6 py-12`}
    >
      <span
        style={{
          fontFamily: variant.fontFamily,
          fontSize: variant.fontSize,
          fontWeight: 900,
          fontStyle: variant.italic ? "italic" : "normal",
          color: variant.color,
          letterSpacing: variant.letterSpacing,
          lineHeight: 1,
        }}
      >
        {variant.text}
      </span>
      <span
        className={dark ? "text-[9px] uppercase tracking-[0.12em] text-[#9a9388]" : "text-[9px] uppercase tracking-[0.12em] text-mute"}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <strong className={dark ? "text-[#FAFAF9]" : undefined}>{variant.id}.</strong> {variant.meta}
      </span>
    </div>
  );
}

const GROUPS: { head: string; variants: LogoVariant[] }[] = [
  {
    head: "Blazeface Roman — primary family",
    variants: [
      { id: "A", text: "future.ly", meta: "Roman · lowercase · canonical reference", fontFamily: "var(--font-display-48)", fontSize: 48 },
      { id: "B", text: "FUTURE.LY", meta: "Roman · uppercase · most assertive", fontFamily: "var(--font-display-48)", fontSize: 44, letterSpacing: "0.02em" },
      { id: "C", text: "futurely", meta: "Roman · no period · one-word", fontFamily: "var(--font-display-48)", fontSize: 48 },
      { id: "D", text: "future.ly", meta: "Roman · tight tracking −0.03em", fontFamily: "var(--font-display-48)", fontSize: 48, letterSpacing: "-0.03em" },
      { id: "E", text: "future.ly", meta: "Roman · vermillion", fontFamily: "var(--font-display-48)", fontSize: 48, color: "var(--brand-vermillion)" },
    ],
  },
  {
    head: "Blazeface Italic — reference (the one that felt off)",
    variants: [
      { id: "F", text: "future.ly", meta: "Italic · lowercase · prior default", fontFamily: "var(--font-display-48)", fontSize: 48, italic: true },
    ],
  },
  {
    head: "Instrument Sans Bold — Lockup B3 direction",
    variants: [
      { id: "G", text: "future.ly", meta: "Sans Bold · lowercase · quiet utility", fontFamily: "var(--font-sans)", fontSize: 42 },
      { id: "H", text: "FUTURE.LY", meta: "Sans Bold · uppercase · utilitarian", fontFamily: "var(--font-sans)", fontSize: 38, letterSpacing: "0.02em" },
    ],
  },
];

export function LogoLab() {
  return (
    <Section>
      <SectionLabel>Decision — wordmark</SectionLabel>
      <SectionTitle>Logo lab — future.ly variants</SectionTitle>
      <SectionDesc>
        Ten treatments of <code className="font-mono">future.ly</code>, same size (48 px), same
        ink on cream. <strong>Variant I (JetBrains Mono Bold lowercase) is CANONICAL</strong> —
        it reads as documentary metadata per the brand voice and stays subordinate to the
        <code className="font-mono"> PACIFIC KINGS</code> campaign hero.
      </SectionDesc>

      {GROUPS.map((g) => (
        <div key={g.head}>
          <SubHead>{g.head}</SubHead>
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
          >
            {g.variants.map((v) => (
              <LogoCard key={v.id} variant={v} />
            ))}
          </div>
        </div>
      ))}

      <SubHead>
        JetBrains Mono Bold — documentary-label direction ·{" "}
        <strong className="text-vermillion">CANONICAL</strong>
      </SubHead>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        <LogoCard
          variant={{
            id: "I",
            text: "future.ly",
            meta: "Mono Bold · lowercase · chosen",
            fontFamily: "var(--font-mono)",
            fontSize: 38,
            letterSpacing: "-0.02em",
            canonical: true,
          }}
        />
      </div>

      <SubHead>Alternate composition</SubHead>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        <LogoCard
          variant={{
            id: "J",
            text: "future\u00B7ly",
            meta: "Roman · middot separator",
            fontFamily: "var(--font-display-48)",
            fontSize: 48,
          }}
        />
      </div>

      <SubHead>Head-to-head on dark</SubHead>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        <LogoCard dark variant={{ id: "A", text: "future.ly", meta: "Roman lowercase", fontFamily: "var(--font-display-48)", fontSize: 48 }} />
        <LogoCard dark variant={{ id: "B", text: "FUTURE.LY", meta: "Roman uppercase", fontFamily: "var(--font-display-48)", fontSize: 44, letterSpacing: "0.02em" }} />
        <LogoCard dark variant={{ id: "G", text: "future.ly", meta: "Sans Bold lowercase", fontFamily: "var(--font-sans)", fontSize: 42 }} />
        <LogoCard dark variant={{ id: "I", text: "future.ly", meta: "Mono Bold · canonical", fontFamily: "var(--font-mono)", fontSize: 38, letterSpacing: "-0.02em", canonical: true }} />
      </div>
    </Section>
  );
}
