import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";
import { Glyph } from "./glyph";

/**
 * Lockups A / B / C — the three platform lockup compositions.
 *   A = Campaign hero (PACIFIC KINGS + "a future.ly project")
 *   B = Platform standalone (future.ly on its own) — 4 variants, B1 Mono canonical
 *   C = Vertical stack with sun divider (press kit, pitch deck)
 */

function LockupFrame({
  children,
  tone,
  minHeight = 320,
}: {
  children: React.ReactNode;
  tone: "cream" | "ink" | "vermillion" | "white";
  minHeight?: number;
}) {
  const toneClasses = {
    cream: "bg-cream text-ink border border-rule",
    ink: "bg-ink text-[#FAFAF9]",
    vermillion: "bg-vermillion text-white",
    white: "bg-white text-ink border border-[#e5e5e5]",
  }[tone];
  return (
    <div
      className={`flex flex-col items-center justify-center gap-0 rounded-sm p-8 py-16 text-center ${toneClasses}`}
      style={{ minHeight }}
    >
      {children}
    </div>
  );
}

function LockupCaption({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-mute"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {children}
    </p>
  );
}

/* ============================================
   Lockup A — Campaign hero
   ============================================ */
function LockupAHero({
  tone,
  secondaryVariant,
}: {
  tone: "cream" | "ink" | "vermillion";
  secondaryVariant: "italic" | "sans";
}) {
  return (
    <LockupFrame tone={tone}>
      <h3
        className="m-0 text-[72px] leading-[0.95] tracking-[0.005em]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
      >
        PACIFIC KINGS
      </h3>
      {secondaryVariant === "italic" ? (
        <p
          className="mt-4 text-[24px] italic tracking-[0.01em]"
          style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
        >
          a future.ly project
        </p>
      ) : (
        <p
          className="mt-5 text-[13px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          a future.ly project
        </p>
      )}
      <Glyph char={"\u2749"} size="sm" fontSize={14} className="mt-5" />
    </LockupFrame>
  );
}

export function LockupA() {
  return (
    <>
      <Section>
        <SectionLabel>Lockup A</SectionLabel>
        <SectionTitle>Campaign hero — italic secondary</SectionTitle>
        <SectionDesc>
          PACIFIC KINGS in Ohno Blazeface Roman, &quot;a future.ly project&quot; in Ohno Blazeface
          Italic, balloon floret closing mark. The whole lockup in a single family.
        </SectionDesc>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <LockupAHero tone="cream" secondaryVariant="italic" />
            <LockupCaption>Ink on cream</LockupCaption>
          </div>
          <div>
            <LockupAHero tone="ink" secondaryVariant="italic" />
            <LockupCaption>Cream on dark</LockupCaption>
          </div>
          <div>
            <LockupAHero tone="vermillion" secondaryVariant="italic" />
            <LockupCaption>White on red</LockupCaption>
          </div>
        </div>
      </Section>

      <Section>
        <SectionLabel>Lockup A — variant</SectionLabel>
        <SectionTitle>Sans secondary (for comparison)</SectionTitle>
        <SectionDesc>
          Same lockup with &quot;a future.ly project&quot; in Instrument Sans instead of Blazeface
          Italic — the quieter option.
        </SectionDesc>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <LockupAHero tone="cream" secondaryVariant="sans" />
            <LockupCaption>Sans — ink on cream</LockupCaption>
          </div>
          <div>
            <LockupAHero tone="ink" secondaryVariant="sans" />
            <LockupCaption>Sans — cream on dark</LockupCaption>
          </div>
          <div>
            <LockupAHero tone="vermillion" secondaryVariant="sans" />
            <LockupCaption>Sans — white on red</LockupCaption>
          </div>
        </div>
      </Section>
    </>
  );
}

/* ============================================
   Lockup B — Platform standalone
   ============================================ */
export function LockupB() {
  return (
    <Section>
      <SectionLabel>Lockup B</SectionLabel>
      <SectionTitle>Platform standalone — Mono canonical</SectionTitle>
      <SectionDesc>
        <code className="font-mono">future.ly</code> on its own.{" "}
        <strong>B1 — JetBrains Mono Bold</strong> is the canonical treatment per the logo lab
        decision. It defers to the Blazeface hero (PACIFIC KINGS) and reads as documentary
        metadata. B2, B3, and B4 are kept as references.
      </SectionDesc>

      <div className="grid grid-cols-4 gap-6">
        {/* B1 — Mono canonical */}
        <div>
          <LockupFrame tone="cream" minHeight={200}>
            <h3
              className="m-0 text-[38px] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--brand-ink)" }}
            >
              future.ly
            </h3>
          </LockupFrame>
          <LockupCaption>B1 — Mono Bold · canonical</LockupCaption>
        </div>

        {/* B2 — Blazeface Roman reference */}
        <div>
          <LockupFrame tone="cream" minHeight={200}>
            <h3
              className="m-0 text-[48px] leading-[0.95]"
              style={{ fontFamily: "var(--font-display-48)", fontWeight: 900 }}
            >
              future.ly
            </h3>
          </LockupFrame>
          <LockupCaption>B2 — Blazeface Roman · reference</LockupCaption>
        </div>

        {/* B3 — Blazeface Italic retired */}
        <div>
          <LockupFrame tone="cream" minHeight={200}>
            <h3
              className="m-0 text-[48px] italic leading-[0.95]"
              style={{ fontFamily: "var(--font-display-48)", fontWeight: 900 }}
            >
              future.ly
            </h3>
          </LockupFrame>
          <LockupCaption>B3 — Blazeface Italic · retired</LockupCaption>
        </div>

        {/* B4 — Star stamp + Mono */}
        <div>
          <LockupFrame tone="white" minHeight={200}>
            <span
              className="leading-none text-vermillion"
              style={{ fontFamily: "var(--font-display-48)", fontSize: 56 }}
            >
              {"\u2739"}
            </span>
            <h3
              className="m-0 mt-3 text-[22px] tracking-[-0.02em] text-vermillion"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
            >
              future.ly
            </h3>
          </LockupFrame>
          <LockupCaption>B4 — Star stamp + Mono</LockupCaption>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   Lockup C — Vertical stack with sun divider
   ============================================ */
function LockupCStack({ tone }: { tone: "cream" | "ink" }) {
  return (
    <LockupFrame tone={tone} minHeight={340}>
      <h3
        className="m-0 text-[72px] leading-[0.95] tracking-[0.005em]"
        style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
      >
        PACIFIC KINGS
      </h3>
      <div className="my-5 flex w-[70%] items-center gap-4">
        <span className="h-px flex-1 bg-current" />
        <Glyph char={"\u2749"} size="sm" fontSize={14} />
        <span className="h-px flex-1 bg-current" />
      </div>
      <h4
        className="m-0 text-[26px] tracking-[-0.02em]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        future.ly
      </h4>
    </LockupFrame>
  );
}

export function LockupC() {
  return (
    <Section>
      <SectionLabel>Lockup C</SectionLabel>
      <SectionTitle>Vertical stack with sun divider</SectionTitle>
      <SectionDesc>
        Press kit, pitch deck. Thin rule broken by the balloon floret. Campaign name heavy Roman
        above; platform name Mono below.
      </SectionDesc>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <LockupCStack tone="cream" />
          <LockupCaption>Cream</LockupCaption>
        </div>
        <div>
          <LockupCStack tone="ink" />
          <LockupCaption>Dark</LockupCaption>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   Favicon — Italic canonical
   ============================================ */
type FaviconSize = 16 | 32 | 64 | 128;

const FAVICON_FONTS: Record<FaviconSize, string> = {
  128: "var(--font-display)",    // 72pt cut
  64:  "var(--font-display-48)", // 48pt cut
  32:  "var(--font-display-24)", // 24pt cut
  16:  "var(--font-display-12)", // 12pt cut
};

const FAVICON_RENDER_PX: Record<FaviconSize, number> = {
  128: 104,
  64: 52,
  32: 26,
  16: 13,
};

function Favicon({
  size,
  tone = "cream",
  italic = true,
  label,
}: {
  size: FaviconSize;
  tone?: "cream" | "ink" | "red";
  italic?: boolean;
  label: string;
}) {
  const bg = {
    cream: "bg-cream text-ink border border-rule",
    ink: "bg-ink text-cream",
    red: "bg-vermillion text-white",
  }[tone];
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`flex items-center justify-center font-black leading-none ${bg}`}
        style={{
          width: size,
          height: size,
          fontSize: FAVICON_RENDER_PX[size],
          fontFamily: FAVICON_FONTS[size],
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        f.
      </div>
      <LockupCaption>{label}</LockupCaption>
    </div>
  );
}

export function FaviconSection() {
  return (
    <Section>
      <SectionLabel>Favicon</SectionLabel>
      <SectionTitle>&quot;f.&quot; in Blazeface — Italic canonical</SectionTitle>
      <SectionDesc>
        The period is part of the mark. Italic is the chosen treatment — it has more warmth and
        personality than Roman at the small scales where the favicon actually lives. Each size
        uses the matching optical cut per §4a.
      </SectionDesc>

      <div className="flex flex-wrap items-end gap-8 py-6">
        <Favicon size={128} label="128 · canonical" />
        <Favicon size={64} label="64" />
        <Favicon size={32} label="32" />
        <Favicon size={16} label="16" />
        <Favicon size={64} tone="ink" label="64 dark" />
        <Favicon size={64} tone="red" label="64 red" />
        <Favicon size={128} italic={false} label="128 Roman · reference" />
      </div>
    </Section>
  );
}
