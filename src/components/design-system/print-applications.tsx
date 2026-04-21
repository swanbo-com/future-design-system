import { Section, SectionLabel, SectionTitle, SectionDesc } from "./section";
import { Glyph, Flanker, ARROWS, DINGBATS } from "./glyph";

/* ============================================
   Story panel — A3 darkroom print insert
   ============================================ */
export function StoryPanel() {
  return (
    <Section>
      <SectionLabel>Application — A3 story panel</SectionLabel>
      <SectionTitle>The hero print insert</SectionTitle>
      <SectionDesc>
        Black on natural kraft. Full system — kicker with fleuron pair, wordmark, italic secondary,
        sun-broken rule, italic body copy, arrow-preceded CTA, QR, closing flourish, small-caps footer.
        Stress-tests the full type hierarchy.
      </SectionDesc>

      <div className="flex">
        <div
          className="relative flex flex-col items-center bg-kraft px-10 py-16 text-center text-ink"
          style={{ width: 440, aspectRatio: "210 / 297" }}
        >
          {/* Kicker with fleurons */}
          <div className="mb-4 inline-flex items-center gap-3">
            <Flanker pair="C" side="left" fontSize={22} />
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              KINGS OF THE PACIFIC
            </span>
            <Flanker pair="C" side="right" fontSize={22} />
          </div>

          {/* Title — h3 so it doesn't fight Section's h2 */}
          <h3
            className="m-0 mb-5 text-[60px] leading-[0.88] tracking-[0.02em]"
            style={{ fontFamily: "var(--font-display-60)", fontWeight: 900 }}
          >
            PACIFIC
            <br />
            KINGS
          </h3>

          {/* Italic secondary */}
          <p
            className="mb-5 text-[22px] italic"
            style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
          >
            a future.ly project
          </p>

          {/* Sun-broken rule */}
          <div className="my-4 mb-6 flex w-[80%] items-center gap-4">
            <span className="h-px flex-1 bg-ink" />
            <Glyph char={DINGBATS.floret} size="sm" fontSize={14} />
            <span className="h-px flex-1 bg-ink" />
          </div>

          {/* Body — preview uses 14pt cut at 13px, real print uses 18pt */}
          <p
            className="mb-6 max-w-[320px] text-[13px] italic leading-relaxed"
            style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
          >
            They started with a plank of coconut wood and a set of borrowed wheels. In Siargao,
            where the Pacific meets the Philippines, a crew of kids are building skateboards from
            what the island gives them. This print was shot on 35mm during the first month of the
            build — before the ramp, before the park, when it was just kids, concrete, and a dream
            that refused to stay small.
          </p>

          {/* CTA with arrow */}
          <div
            className="mb-4 flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <Glyph char={ARROWS.cta} size="xs" fontSize={11} />
            <span>Scan to follow the story</span>
          </div>

          {/* QR placeholder */}
          <div className="h-20 w-20 bg-ink" />

          {/* URL */}
          <div className="mt-2 text-[9px]" style={{ fontFamily: "var(--font-mono)" }}>
            future.ly/zero
          </div>

          {/* Closing flourish */}
          <div className="mt-3">
            <Glyph char={ARROWS.flourish} size="sm" fontSize={14} />
          </div>

          {/* Footer */}
          <div
            className="absolute left-0 right-0 bottom-8 text-[8px] uppercase tracking-[0.2em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            SHOT ON 35MM · KODAK TRI-X · SIARGAO 2026
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   Kraft mailer — vintage shipping stamp
   ============================================ */
export function KraftMailer() {
  return (
    <Section>
      <SectionLabel>Application — kraft mailer</SectionLabel>
      <SectionTitle>Vintage shipping stamp</SectionTitle>
      <SectionDesc>
        Double-rule border, Roman title, italic secondary, sun-broken rule, origin caps. Feels
        like a postmark, not a logo sticker. Arrow before origin line, closing flourish below.
      </SectionDesc>

      <div className="flex items-center justify-center bg-kraft p-12">
        <div className="inline-block border-2 border-ink p-[3px]">
          <div className="border-[0.5px] border-ink px-10 py-6 text-center">
            <h3
              className="m-0 mb-2 text-[36px] tracking-[0.02em]"
              style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
            >
              PACIFIC KINGS
            </h3>
            <p
              className="m-0 mb-4 text-[18px] italic"
              style={{ fontFamily: "var(--font-display-18)", fontWeight: 900 }}
            >
              a future.ly project
            </p>
            <div className="my-3 mb-4 flex items-center justify-center gap-2">
              <span className="h-[0.5px] w-20 bg-ink" />
              <Glyph char={DINGBATS.floret} size="xs" fontSize={12} />
              <span className="h-[0.5px] w-20 bg-ink" />
            </div>
            <p
              className="text-[10px] font-medium uppercase leading-[1.6] tracking-[0.2em]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <Glyph char={ARROWS.cta} size="xs" fontSize={11} />
              &nbsp;&nbsp;Shipped from Siargao
              <br />
              <span className="text-[9px] font-normal">For delivery worldwide</span>
            </p>
            <div className="mt-3 text-center">
              <Glyph char={ARROWS.flourish} size="sm" fontSize={14} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   T-shirt chest print — white on red
   ============================================ */
export function TeePrint() {
  return (
    <Section>
      <SectionLabel>Application — t-shirt</SectionLabel>
      <SectionTitle>Front chest print</SectionTitle>
      <SectionDesc>
        White on red. One-colour screen print. Italic secondary + balloon floret closing mark.
      </SectionDesc>

      <div className="max-w-[440px]">
        <div
          className="relative h-[560px] rounded-[4px] bg-vermillion px-8 pt-[140px] text-center text-white"
          style={{ position: "relative" }}
        >
          {/* Crude neckline */}
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2"
            style={{
              width: 120,
              height: 30,
              background: "transparent",
              borderBottom: "30px solid rgba(0, 0, 0, 0.15)",
              borderLeft: "20px solid transparent",
              borderRight: "20px solid transparent",
              borderRadius: "0 0 60% 60%",
            }}
          />
          <h3
            className="m-0 mb-2 text-[40px] tracking-[0.025em]"
            style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
          >
            PACIFIC KINGS
          </h3>
          <p
            className="m-0 mb-3 text-[16px] italic"
            style={{ fontFamily: "var(--font-display-14)", fontWeight: 900 }}
          >
            a future.ly project
          </p>
          <Glyph char={DINGBATS.floret} size="xs" fontSize={12} />
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   Stickers — wordmark + canonical seal
   ============================================ */
export function Stickers() {
  return (
    <Section>
      <SectionLabel>Application — stickers</SectionLabel>
      <SectionTitle>Wordmark + seal</SectionTitle>
      <SectionDesc>
        Wordmark sticker for laptops/notebooks; circular seal for merch and press.{" "}
        <strong>Canonical seal mark: balloon floret ❉ (U+2749).</strong>
      </SectionDesc>

      <div className="flex flex-wrap items-center gap-8">
        {/* Wordmark sticker */}
        <div>
          <div className="inline-block rounded-lg border border-[#e5e5e5] bg-white px-8 py-6">
            <span
              className="text-[26px] tracking-[-0.02em] text-vermillion"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
            >
              future.ly
            </span>
          </div>
          <p
            className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-mute"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Wordmark sticker
          </p>
        </div>

        {/* Canonical seal */}
        <div>
          <div className="flex h-[170px] w-[170px] flex-col items-center justify-center gap-3 rounded-full border border-[#e5e5e5] bg-white">
            <Glyph char={DINGBATS.floret} size="lg" fontSize={56} color="var(--brand-vermillion)" />
            <span
              className="text-[14px] tracking-[-0.02em] text-vermillion"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
            >
              future.ly
            </span>
          </div>
          <p
            className="mt-3 text-center text-[9px] uppercase tracking-[0.14em] text-mute"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Seal · balloon floret · canonical
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ============================================
   Aggregate export — phase 5 print block
   ============================================ */
export function PrintApplications() {
  return (
    <>
      <StoryPanel />
      <KraftMailer />
      <TeePrint />
      <Stickers />
    </>
  );
}
