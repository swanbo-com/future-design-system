import { Section, SectionLabel, SectionTitle, SectionDesc, SubHead } from "./section";
import { Flanker, type FleuronPair } from "./glyph";

/**
 * Title treatments — fleuron flankers.
 * The single most distinctive brand moment. §4d rules:
 *  - Flankers only (always paired left + right)
 *  - One line only (whitespace-nowrap enforced)
 *  - One pair per composition
 *  - Key titles only — not section headers inside the UI
 */

const PAIRS: FleuronPair[] = ["A", "B", "C", "D", "E"];

/* ============================================
   Subcomponents
   ============================================ */
function FleuronInventory() {
  return (
    <div className="flex flex-col gap-10 rounded-sm border border-rule bg-surface p-8">
      {PAIRS.map((pair) => (
        <div key={pair} className="flex items-center justify-center gap-10">
          <Flanker pair={pair} side="left" fontSize={72} />
          <span
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-mute"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Pair {pair}
          </span>
          <Flanker pair={pair} side="right" fontSize={72} />
        </div>
      ))}
    </div>
  );
}

type AppliedTitleProps = {
  pair: FleuronPair;
  title: string;
  sub: string;
  caption: string;
  dark?: boolean;
};

function AppliedTitle({ pair, title, sub, caption, dark = false }: AppliedTitleProps) {
  return (
    <div
      className={
        dark
          ? "flex min-h-[220px] flex-col items-center justify-center rounded-sm bg-ink p-6 py-12 text-center text-[#FAFAF9]"
          : "flex min-h-[220px] flex-col items-center justify-center rounded-sm border border-rule bg-cream p-6 py-12 text-center text-ink"
      }
    >
      <div className="mb-4 flex items-center justify-center gap-5 whitespace-nowrap">
        <Flanker pair={pair} side="left" fontSize={44} />
        <h3
          className="m-0 text-[32px] tracking-[0.02em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
        >
          {title}
        </h3>
        <Flanker pair={pair} side="right" fontSize={44} />
      </div>
      <p className={dark ? "mt-2 max-w-[320px] text-[13px] text-[#9a9388]" : "mt-2 max-w-[320px] text-[13px] text-mute"}>
        {sub}
      </p>
      <p
        className={dark ? "mt-5 text-[9px] uppercase tracking-[0.08em] text-[#6e685f]" : "mt-5 text-[9px] uppercase tracking-[0.08em] text-mute"}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {caption}
      </p>
    </div>
  );
}

function HeroLockup({ pair, dark = false }: { pair: FleuronPair; dark?: boolean }) {
  return (
    <div
      className={
        dark
          ? "flex min-h-[280px] flex-col items-center justify-center rounded-sm bg-ink p-10 py-16 text-center text-[#FAFAF9]"
          : "flex min-h-[280px] flex-col items-center justify-center rounded-sm border border-rule bg-cream p-10 py-16 text-center text-ink"
      }
    >
      <div className="mb-4 flex items-center justify-center gap-5 whitespace-nowrap">
        <Flanker pair={pair} side="left" fontSize={72} />
        <h3
          className="m-0 text-[56px] leading-[0.95] tracking-[0.02em] whitespace-nowrap"
          style={{ fontFamily: "var(--font-display-60)", fontWeight: 900 }}
        >
          PACIFIC KINGS
        </h3>
        <Flanker pair={pair} side="right" fontSize={72} />
      </div>
      <p
        className="mt-3 text-[22px] italic"
        style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
      >
        a future.ly project
      </p>
    </div>
  );
}

function SmallerScaleDemo({
  pair,
  label,
  body,
  caption,
  size,
}: {
  pair: FleuronPair;
  label: string;
  body: string;
  caption: string;
  size: number;
}) {
  return (
    <div className="rounded-sm border border-rule bg-surface p-6 py-8 text-center">
      <div className="mb-4 inline-flex items-center gap-3">
        <Flanker pair={pair} side="left" fontSize={size} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
          {label}
        </span>
        <Flanker pair={pair} side="right" fontSize={size} />
      </div>
      <p
        className="mx-auto mb-5 max-w-[260px] text-[13px] italic leading-relaxed text-mute"
        style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
      >
        {body}
      </p>
      <p
        className="text-[9px] uppercase tracking-[0.08em] text-mute"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {caption}
      </p>
    </div>
  );
}

/* ============================================
   Main section
   ============================================ */
export function TitleTreatments() {
  return (
    <Section>
      <SectionLabel>System pattern</SectionLabel>
      <SectionTitle>Title treatments — fleuron flankers</SectionTitle>
      <SectionDesc>
        Blazeface ships <strong>10 classical pen-flourish fleurons</strong> as 5 mirrored left/right
        pairs, drawn in the same hand as the Roman. They arrived orphaned in the font; we patched
        the 18 OTFs to add cmap entries at <code className="font-mono">U+E000</code>–
        <code className="font-mono">U+E009</code>. These are the most decorative shapes in the
        family — reserved strictly for the <strong>flanker slot around titles</strong>, never as
        inline bullets or dividers. One pair per composition. Two marks max.
      </SectionDesc>

      <SubHead>The five pairs</SubHead>
      <FleuronInventory />

      <SubHead>Applied — section titles</SubHead>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))" }}>
        <AppliedTitle
          pair="A"
          title="THE STORY"
          sub="How a plank of coconut wood became a skate park"
          caption="Pair A · U+E000 / U+E001"
        />
        <AppliedTitle
          pair="B"
          title="THE MILESTONES"
          sub="Four stops between here and a finished concrete park"
          caption="Pair B · U+E002 / U+E003"
        />
        <AppliedTitle
          pair="C"
          title="THE RETURNS"
          sub="Every exchange, every tier, every unit accounted for"
          caption="Pair C · U+E004 / U+E005"
        />
        <AppliedTitle
          pair="D"
          title="THE TEAM"
          sub="The kids, the builders, the cinematographer, the platform"
          caption="Pair D · U+E006 / U+E007"
        />
        <AppliedTitle
          pair="E"
          title="THE PRESS"
          sub="Selected coverage and press assets"
          caption="Pair E · dark mode"
          dark
        />
        <AppliedTitle
          pair="A"
          title="THE LEDGER"
          sub="Every receipt on the table"
          caption="Pair A · dark mode"
          dark
        />
      </div>

      <SubHead>Smaller scale — exploration</SubHead>
      <p className="mb-6 max-w-[700px] text-[13px] leading-relaxed text-mute">
        Pair B is the canonical hero flanker (PACIFIC KINGS lockup); Pair D is the secondary hero
        for press kits and dark-mode alternates. Pairs A, C, E earn their keep at smaller sizes in
        editorial moments where a chapter kicker or update marker wants a lighter touch. Restraint
        still applies: one flanker pair per composition.
      </p>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        <SmallerScaleDemo
          pair="B"
          label="UPDATE 03 · DAY 12"
          body="They started with a plank of coconut wood and a set of borrowed wheels."
          caption="Pair B · update kicker · 18 px"
          size={18}
        />
        <SmallerScaleDemo
          pair="C"
          label="CHAPTER ONE"
          body="Before the ramp. Before the park. When it was just kids, concrete, and a dream."
          caption="Pair C · chapter mark · 16 px"
          size={16}
        />
        <SmallerScaleDemo
          pair="E"
          label="FOUNDING SUPPORTER · №14"
          body="You backed the first campaign. Your name is on the wall in Siargao."
          caption="Pair E · founding badge · 16 px"
          size={16}
        />
      </div>

      <SubHead>Applied — campaign hero</SubHead>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(640px, 1fr))" }}>
        <HeroLockup pair="B" />
        <HeroLockup pair="D" dark />
      </div>
    </Section>
  );
}
