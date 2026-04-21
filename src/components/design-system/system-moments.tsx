import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";
import { Glyph, DINGBATS, ARROWS, HANDS } from "./glyph";

/**
 * Brand system moments — reference blocks showing how the glyph
 * vocabulary lands across editorial, print, and marketing contexts.
 */

function MomentCard({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-rule bg-surface p-6">
      <div
        className="mb-4 text-[9px] font-medium uppercase tracking-[0.14em] text-mute"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        {header}
      </div>
      {children}
    </div>
  );
}

/* ============================================
   Transparency ledger
   ============================================ */
function Ledger() {
  const rows = [
    { amt: "£2.00", desc: "Platform fee" },
    { amt: "£1.00", desc: "Creator Fund" },
    { amt: "£1.61", desc: "Processing (Stripe)" },
    { amt: "£40.39", desc: "Net to project", highlight: true },
  ];
  return (
    <MomentCard header="Every receipt on the table">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-3 py-2">
          <Glyph char={DINGBATS.floret} size="xs" fontSize={11} color={r.highlight ? "var(--brand-vermillion)" : undefined} />
          <span
            className={`w-[72px] text-[13px] font-medium ${r.highlight ? "text-vermillion" : "text-ink"}`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {r.amt}
          </span>
          <span className={`text-[13px] ${r.highlight ? "font-semibold text-vermillion" : "text-mute"}`}>
            {r.desc}
          </span>
        </div>
      ))}
    </MomentCard>
  );
}

/* ============================================
   Milestone cascade — print, Mono amounts
   ============================================ */
function MilestoneCascade() {
  const rows = [
    { amt: "£800", label: "Safety Gear" },
    { amt: "£2,200", label: "Mini Ramp" },
    { amt: "£4,800", label: "Classroom Build" },
    { amt: "£7,800", label: "Concrete Park" },
  ];
  return (
    <MomentCard header="Milestone cascade — print">
      <div className="flex flex-col items-center gap-4">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 text-[14px] font-semibold uppercase tracking-[0.1em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="text-[7px] leading-none text-ink">{"\u25A0"}</span>
            <span
              className="text-[18px] tracking-[-0.01em] text-ink"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontVariantNumeric: "tabular-nums", textTransform: "none", letterSpacing: "-0.01em" }}
            >
              {r.amt}
            </span>
            <span className="text-[7px] leading-none text-ink">{"\u25A0"}</span>
            {r.label}
          </div>
        ))}
      </div>
    </MomentCard>
  );
}

/* ============================================
   Editorial scroll divider
   ============================================ */
function ScrollDivider() {
  return (
    <MomentCard header="Editorial scroll divider">
      <div className="px-4 py-6 text-center">
        <p className="mx-auto mb-6 max-w-[400px] text-[12px] leading-relaxed text-mute">
          …before the park, when it was just kids, concrete, and a dream that refused to stay small.
        </p>
        <div className="my-6 flex flex-col items-center gap-2">
          <div className="h-[30px] w-px bg-ink" />
          <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
          <div className="h-[30px] w-px bg-ink" />
        </div>
        <p className="mx-auto text-[12px] leading-relaxed text-mute">
          They started with a plank of coconut wood and a set of borrowed wheels…
        </p>
      </div>
    </MomentCard>
  );
}

/* ============================================
   Email / social / marketing
   ============================================ */
function EmailMoment() {
  return (
    <MomentCard header="Email / social / marketing">
      <div className="text-[13px]" style={{ fontFamily: "var(--font-sans)" }}>
        <div className="flex items-center gap-2 py-2">
          <span className="w-[60px] text-mute">From:</span>
          <span className="text-ink">
            Pacific Kings&nbsp;
            <Glyph char={DINGBATS.floret} size="xs" fontSize={12} />
            &nbsp;future.ly
          </span>
        </div>
        <div className="flex items-center gap-2 py-2">
          <span className="w-[60px] text-mute">Subject:</span>
          <span
            className="text-[14px] italic text-ink"
            style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
          >
            Funded. Every penny accounted for.
          </span>
        </div>
        <div
          className="mt-3 inline-flex items-center gap-2 text-[16px] tracking-[0.03em] text-vermillion"
          style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
        >
          <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
          14 DAYS LEFT
          <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
        </div>
      </div>
    </MomentCard>
  );
}

/* ============================================
   Editor's note
   ============================================ */
function EditorsNote() {
  return (
    <MomentCard header="Editor's note — update pull quote">
      <div className="mb-4 flex items-center text-[9px] font-semibold uppercase tracking-[0.14em] text-vermillion">
        <Glyph char={HANDS.writing} size="sm" fontSize={16} />
        &nbsp;&nbsp;Note from John · day 12
      </div>
      <p
        className="m-0 mb-4 text-[14px] italic leading-relaxed text-ink"
        style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
      >
        We broke ground on the ramp yesterday. Two of the kids cut their hands on the rebar — nothing
        serious, everyone&apos;s fine. But it reminded me why the safety gear milestone mattered. Every
        receipt, every order, every pound — it&apos;s on the ledger.
      </p>
      <div
        className="flex items-center border-t border-rule pt-3 text-[11px] font-medium uppercase tracking-[0.08em] text-mute"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Glyph char={ARROWS.flourish} size="xs" fontSize={11} />
        &nbsp;&nbsp;Read full update
      </div>
    </MomentCard>
  );
}

/* ============================================
   Back-link pattern
   ============================================ */
function BackLink() {
  return (
    <MomentCard header="Back-link — editorial navigation">
      <a
        className="mb-4 inline-flex items-center text-[16px] italic text-vermillion no-underline"
        style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
      >
        <Glyph char={ARROWS.back} size="sm" fontSize={14} />
        &nbsp;&nbsp;Back to all updates
      </a>
      <p className="m-0 text-[11px] leading-relaxed text-mute">
        The <code className="rounded-sm bg-cream px-1 font-mono text-[10px]">➥</code> return-arrow is
        the only navigation glyph that appears in editorial contexts. Utility nav stays in Lucide.
      </p>
    </MomentCard>
  );
}

/* ============================================
   Press-kit kicker
   ============================================ */
function PressKicker() {
  return (
    <MomentCard header="Press kit — section kicker">
      <p
        className="m-0 mb-3 flex items-center text-[16px] font-black uppercase tracking-[0.2em] text-ink"
        style={{ fontFamily: "var(--font-display-18)" }}
      >
        {/* Use Pair D flanker at smaller size */}
        <span
          className="inline-block align-middle leading-[0.9]"
          style={{ fontFamily: "var(--font-display-48)", fontSize: 28 }}
        >
          {"\uE006"}
        </span>
        &nbsp;&nbsp;FROM THE EDITOR&nbsp;&nbsp;
        <span
          className="inline-block align-middle leading-[0.9]"
          style={{ fontFamily: "var(--font-display-48)", fontSize: 28 }}
        >
          {"\uE007"}
        </span>
      </p>
      <p className="m-0 text-[11px] leading-relaxed text-mute">
        Press releases, founder letters, pitch-deck section dividers. The fleuron pair only appears
        on print-facing materials.
      </p>
    </MomentCard>
  );
}

/* ============================================
   Main section
   ============================================ */
export function SystemMoments() {
  return (
    <Section>
      <SectionLabel>System reference</SectionLabel>
      <SectionTitle>How the sun and italic appear throughout</SectionTitle>
      <SectionDesc>
        Usage reference showing how the dingbats, arrows, and italic voices land across contexts.
      </SectionDesc>

      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))" }}>
        <Ledger />
        <MilestoneCascade />
        <ScrollDivider />
        <EmailMoment />
        <EditorsNote />
        <BackLink />
        <PressKicker />
      </div>
    </Section>
  );
}

/* ============================================
   Other ornaments in context — catalog
   ============================================ */
const ORNAMENT_ROWS: { label: string; char: string; size: number; text: string }[] = [
  { label: "CTA arrow",        char: ARROWS.cta,      size: 14, text: "Scan to follow the story" },
  { label: "Return link",      char: ARROWS.back,     size: 14, text: "Back to all updates" },
  { label: "Pointing hand",    char: HANDS.pointRight, size: 16, text: "Read the founder letter" },
  { label: "Writing hand",     char: HANDS.writing,   size: 16, text: "Note from John, day 12" },
  { label: "Editor's nib",     char: HANDS.nib,       size: 16, text: "Edited for length and clarity" },
  { label: "Peace — community", char: HANDS.peace,    size: 16, text: "You're founding supporter #14" },
  { label: "Curly flourish",   char: ARROWS.curly1,   size: 14, text: "In Siargao, a crew of kids\u00A0\u00A0{mark}\u00A0\u00A0building skateboards from coconut wood" },
  { label: "Press-kit kicker", char: ARROWS.flourish, size: 14, text: "From the editor" },
];

export function OtherOrnamentsInContext() {
  return (
    <Section>
      <SectionLabel>Non-hero marks</SectionLabel>
      <SectionTitle>Other ornaments in context</SectionTitle>
      <SectionDesc>
        The arrows, hands, and curly flourishes from Blazeface aren&apos;t candidates for the hero/logo
        mark — but they earn their keep in editorial and print moments. Not every glyph has to become
        the brand.
      </SectionDesc>

      <div className="border-t border-rule">
        {ORNAMENT_ROWS.map((row, i) => (
          <div
            key={i}
            className="grid items-baseline gap-6 border-b border-rule py-5 px-3"
            style={{ gridTemplateColumns: "220px 1fr" }}
          >
            <span
              className="text-[9px] font-medium uppercase tracking-[0.14em] text-mute"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {row.label}
            </span>
            <span
              className="text-[18px] italic text-ink"
              style={{ fontFamily: "var(--font-display-18)", fontWeight: 900 }}
            >
              {row.label === "Curly flourish" ? (
                <>
                  In Siargao, a crew of kids&nbsp;&nbsp;
                  <Glyph char={row.char} size="sm" fontSize={row.size} />
                  &nbsp;&nbsp;building skateboards from coconut wood
                </>
              ) : row.label === "Press-kit kicker" ? (
                <>
                  <Glyph char={row.char} size="sm" fontSize={row.size} />
                  &nbsp;&nbsp;From the editor&nbsp;&nbsp;
                  <Glyph char={row.char} size="sm" fontSize={row.size} />
                </>
              ) : (
                <>
                  <Glyph char={row.char} size="sm" fontSize={row.size} />
                  &nbsp;&nbsp;{row.text}
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
