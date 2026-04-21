import Link from "next/link";
import Image from "next/image";
import { WaitlistInlineForm } from "@/components/landing/waitlist-inline-form";
import { PARENT, SOCIAL, CONTACT, CAMPAIGN_ZERO } from "@/lib/brand";

/**
 * / — future.ly parent landing (v0).
 *
 * Three sections, mobile-first, deck-spaciousness:
 *   1. Hero      — off-white, mission statement, IG link
 *   2. Signup    — near-black inverted, single email capture
 *   3. PK teaser + footer — off-white, plain Inter campaign name (firewall)
 *
 * Brand rules per docs/brand/parent-shell.md:
 *   - Wordmark: JetBrains Mono Bold lowercase
 *   - Body + display: Inter (NEVER Blazeface — that's the campaign brand)
 *   - Two neutrals: #FAFAF9 off-white, #0F0F0F near-black. No accent.
 *   - No ornaments, no campaign imagery.
 *   - Mid-dot brackets on cover/close eyebrows are fine; no glyphs.
 *
 * Mission copy verbatim from docs/brand/voice-and-positioning.md.
 */

const BG_LIGHT = "#FAFAF9";
const BG_DARK = "#0F0F0F";
const INK = "#0F0F0F";
const CREAM = "#FAFAF9";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Signup />
      <PacificKingsTeaser />
      <Footer />
    </>
  );
}

/* =================================================================
   01 — Hero
   ================================================================= */
function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col"
      style={{ backgroundColor: BG_LIGHT, color: INK }}
    >
      <header className="flex items-center justify-between px-6 pt-6 sm:px-12 sm:pt-10 md:px-24 md:pt-12">
        <span
          className="text-[13px] tracking-[-0.01em] md:text-[14px]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
        >
          {PARENT.wordmark}
        </span>
        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100 sm:text-[11px]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
        >
          {SOCIAL.instagram.handle}
        </a>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-12 md:px-24">
        <p
          className="mb-8 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[12px] md:mb-14 md:text-[14px]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
        >
          · future.ly · platform ·
        </p>

        <h1
          className="m-0 max-w-[1200px] leading-[1.02] tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(36px, 8vw, 128px)",
          }}
        >
          One story at a time.
          <br />
          Told by the people living it.
        </h1>

        <p
          className="mt-10 max-w-[720px] leading-[1.55] opacity-80 md:mt-16"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(16px, 2vw, 22px)",
          }}
        >
          You follow it as it unfolds. You buy something real — a print, a shirt, the film itself —
          and you see exactly where the money went. Nothing between you and the people it&apos;s for.
        </p>
      </div>

      <p
        className="pb-8 text-center text-[11px] uppercase tracking-[0.24em] opacity-40 md:pb-14"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        Scroll
      </p>
    </section>
  );
}

/* =================================================================
   02 — Signup
   ================================================================= */
function Signup() {
  return (
    <section
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-12 md:px-24"
      style={{ backgroundColor: BG_DARK, color: CREAM }}
    >
      <p
        className="mb-8 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[12px] md:mb-14 md:text-[14px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        · Notify me ·
      </p>

      <h2
        className="m-0 max-w-[1100px] leading-[1.04] tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(32px, 7vw, 96px)",
        }}
      >
        I&apos;ll email you when the first story is live.
      </h2>

      <div className="mt-12 w-full max-w-[520px] md:mt-16">
        <WaitlistInlineForm />
      </div>

      <p
        className="mt-10 text-[14px] opacity-60 md:mt-14 md:text-[16px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        One email. Then nothing until there&apos;s something to say.
      </p>
    </section>
  );
}

/* =================================================================
   03 — Pacific Kings teaser (firewall: NO Blazeface here)
   ================================================================= */
function PacificKingsTeaser() {
  return (
    <section
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-12 md:px-24"
      style={{ backgroundColor: BG_LIGHT, color: INK }}
    >
      <p
        className="mb-8 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[12px] md:mb-14 md:text-[14px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        · {CAMPAIGN_ZERO.internalName} · {CAMPAIGN_ZERO.location} ·
      </p>

      <div className="mb-12 w-full max-w-[900px] md:mb-16">
        <div
          className="relative w-full overflow-hidden"
          style={{ backgroundColor: "#1a1a1a", aspectRatio: "16 / 9" }}
        >
          <Image
            src="/images/pitch/kids-skating-highway.jpg"
            alt="Tigasao kids skating an abandoned highway in northern Siargao on handmade boards"
            fill
            sizes="(min-width: 768px) 900px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <h2
        className="m-0 max-w-[1200px] leading-[0.96] tracking-[-0.02em]"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          fontSize: "clamp(48px, 11vw, 160px)",
        }}
      >
        {CAMPAIGN_ZERO.publicName}
      </h2>

      <p
        className="mt-10 max-w-[680px] leading-[1.55] opacity-80 md:mt-14"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(16px, 2vw, 22px)",
        }}
      >
        The kids in Tigasao — northern Siargao, Philippines — are building skateboards from scrap
        timber and bombing an abandoned government highway. They ride it barefoot. The first
        story.
      </p>

      <Link
        href={`/${CAMPAIGN_ZERO.slug}`}
        className="mt-12 inline-block text-[13px] uppercase tracking-[0.2em] underline underline-offset-[6px] transition-all md:mt-16 md:text-[14px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        Read the prospectus →
      </Link>
    </section>
  );
}

/* =================================================================
   Footer
   ================================================================= */
function Footer() {
  return (
    <footer
      className="flex flex-col items-center gap-4 border-t px-6 py-10 text-[11px] uppercase tracking-[0.18em] opacity-60 sm:px-12 md:flex-row md:justify-between md:px-24"
      style={{
        backgroundColor: BG_LIGHT,
        color: INK,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        borderColor: `${INK}22`,
      }}
    >
      <span>{PARENT.copyright} · © 2026</span>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-100"
        >
          {SOCIAL.instagram.handle}
        </a>
        <a href={`mailto:${CONTACT.hello}`} className="hover:opacity-100">
          {CONTACT.hello}
        </a>
        <a href={`mailto:${CONTACT.sponsor}`} className="hover:opacity-100">
          {CONTACT.sponsor}
        </a>
        <Link href="/privacy" className="hover:opacity-100">Privacy</Link>
        <Link href="/terms" className="hover:opacity-100">Terms</Link>
        <Link href="/safeguarding" className="hover:opacity-100">Safeguarding</Link>
      </div>
    </footer>
  );
}
