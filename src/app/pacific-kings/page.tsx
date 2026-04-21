import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { WaitlistInlineForm } from "@/components/landing/waitlist-inline-form";
import { Glyph, DINGBATS, ARROWS, HANDS } from "@/components/brand/glyph";
import { PARENT, SOCIAL, CONTACT, CAMPAIGN_ZERO } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Pacific Kings — future.ly",
  description:
    "Pacific Kings — kids in northern Siargao building skateboards from scrap wood. Documentary-backed campaign launching soon.",
};

const INK = "#0F0F0F";
const CREAM = "#FAFAF9";
const SURFACE = "#FFFDF8";
const VERMILLION = "#D93A2B";
const VERMILLION_LIGHT = "#F28C83";

export default function PacificKingsPage() {
  return (
    <>
      <Cover />
      <TheMoment />
      <TheThesis />
      <TheHighway />
      <WhereTheMoneyGoes />
      <WhatYouGet />
      <Proof />
      <Close />
      <Footer />
    </>
  );
}

/* =================================================================
   01 — Cover
   ================================================================= */
function Cover() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      <TopChrome onDark />

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center sm:px-12 md:px-24">
        <p
          className="mb-10 text-[11px] uppercase tracking-[0.24em] sm:text-[13px] md:mb-14 md:text-[18px]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION_LIGHT }}
        >
          · Siargao · Philippines ·
        </p>

        <Image
          src="/brand/pacific-kings/pacific-kings-lockup-stacked-cream.svg"
          alt="PACIFIC KINGS — a future.ly project"
          width={1400}
          height={420}
          priority
          className="mb-10 h-auto w-full md:mb-16"
          style={{ maxWidth: "min(90vw, 1100px)" }}
        />

        <p
          className="mb-12 max-w-[820px] italic leading-[1.2] md:mb-16"
          style={{
            fontFamily: "var(--font-display-36)",
            fontWeight: 900,
            fontSize: "clamp(22px, 5vw, 44px)",
          }}
        >
          Making fun out of nothing.
        </p>

        <a
          href="#signup"
          className="inline-flex w-full max-w-[420px] items-center justify-center gap-3 px-8 py-5 text-[12px] uppercase tracking-[0.22em] no-underline transition-transform hover:scale-[1.02] sm:w-auto sm:max-w-none md:text-[13px]"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            backgroundColor: VERMILLION,
            color: "#FFFFFF",
          }}
        >
          Get the launch email
          <Glyph char={ARROWS.cta} size="xs" fontSize={12} />
        </a>
      </div>

      <p
        className="px-6 pb-10 text-center text-[11px] uppercase tracking-[0.24em] opacity-70 sm:px-12 md:pb-16 md:text-[13px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        · Tigasao · 2026 ·
      </p>
    </section>
  );
}

/* =================================================================
   02 — The moment (full-bleed photo)
   ================================================================= */
function TheMoment() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      <Image
        src="/images/hero-pacific-kings.png"
        alt="A Siargao skate kid raises a handmade scrap-wood skateboard against the sky"
        fill
        priority
        unoptimized
        className="absolute inset-0 object-cover object-center md:object-right"
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,15,15,0.45) 0%, rgba(15,15,15,0.2) 35%, rgba(15,15,15,0.85) 75%, rgba(15,15,15,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,15,15,0.88) 0%, rgba(15,15,15,0.45) 45%, rgba(15,15,15,0.05) 75%, rgba(15,15,15,0) 100%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 sm:px-12 md:justify-center md:px-24 md:pb-0">
        <p
          className="mb-6 text-[11px] uppercase tracking-[0.24em] sm:text-[13px] md:mb-10 md:text-[20px]"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION_LIGHT }}
        >
          Tigasao · northern Siargao
        </p>

        <h1
          className="m-0 max-w-[1100px] leading-[0.96]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(32px, 7.5vw, 96px)",
          }}
        >
          A group of kids are
          <br />
          building skateboards
          <br />
          out of scrap wood.
        </h1>

        <p
          className="mt-6 max-w-[760px] leading-[1.45] opacity-90 md:mt-10"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(15px, 2vw, 22px)",
          }}
        >
          Tigasao is a rural barangay in the north of Siargao, Philippines — 45 minutes from Cloud 9
          and a different world. Their decks are scrap timber. Their trucks are carved wooden
          blocks. Their bearings are bottle caps and salvaged wheels. The road they skate is an
          abandoned government highway. They ride it barefoot.
        </p>
      </div>
    </section>
  );
}

/* =================================================================
   03 — The thesis (3 bullets, each with a photo)
   ================================================================= */
function TheThesis() {
  return (
    <section
      className="flex min-h-[100svh] w-full flex-col justify-center px-6 py-24 sm:px-12 md:px-24"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <p
        className="mb-6 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[13px] md:mb-10 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        The thesis
      </p>

      <h2
        className="m-0 leading-[0.9]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(48px, 13vw, 200px)",
        }}
      >
        Making fun.
        <br />
        Out of nothing.
      </h2>

      <p
        className="mt-10 max-w-[900px] italic leading-[1.3] opacity-80 md:mt-16"
        style={{
          fontFamily: "var(--font-display-36)",
          fontWeight: 900,
          fontSize: "clamp(18px, 2.6vw, 32px)",
        }}
      >
        It&apos;s the most DIY thing in skating since kids were riding clay wheels in the
        &apos;50s. Hardship feeds creativity. The constraint is the engine.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
        <ThesisBullet
          mark={DINGBATS.floret}
          image="/images/pitch/wooden-trucks.jpg"
          imageAlt="Close-up of a handmade skateboard truck — wooden block carved by hand, salvaged wheel"
          title="Built from scrap"
          body="Scrap timber for decks. Wooden trucks carved from blocks. Bottle caps and salvaged wheels for bearings. Painted, ridden until they fall apart, rebuilt. Each one different."
        />
        <ThesisBullet
          mark={ARROWS.cta}
          image="/images/pitch/skater-road.webp"
          imageAlt="A kid skates an empty asphalt road through the jungle in northern Siargao"
          title="The abandoned highway"
          body="The government built a road through the rural north and never used it. The kids found it. They skate it every afternoon."
        />
        <ThesisBullet
          mark={HANDS.writing}
          image="/images/pitch/crew-with-boards.jpg"
          imageAlt="The Tigasao crew holding their handmade boards"
          title="Pacific Kings"
          body="One of the boys held a yellow handmade board above his head against the sky. It looked like a crown-raising. The kids are in the Pacific. They are the kings of the world they built."
        />
      </div>
    </section>
  );
}

/* =================================================================
   04 — The highway (5-photo strip)
   ================================================================= */
function TheHighway() {
  const stills = [
    { src: "/images/pitch/highway-1.jpg", alt: "Tigasao kid bombing the abandoned highway" },
    { src: "/images/pitch/highway-2.jpg", alt: "A kid mid-roll on a handmade board" },
    { src: "/images/pitch/highway-3.jpg", alt: "Two kids skating side by side on the highway" },
    { src: "/images/pitch/highway-4.jpg", alt: "A kid carrying a handmade board down the road" },
    { src: "/images/pitch/highway-5.jpg", alt: "The crew skating off into the distance" },
  ];

  return (
    <section
      className="flex w-full flex-col px-6 py-20 sm:px-12 md:px-24 md:py-28"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      <p
        className="mb-6 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[13px] md:mb-10 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION_LIGHT }}
      >
        On the road
      </p>

      <h2
        className="m-0 mb-10 leading-[0.92] md:mb-14"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(36px, 7vw, 96px)",
        }}
      >
        Barefoot on concrete.
      </h2>

      {/* Mobile: 2-up grid with 5th spanning full. Desktop: 5 columns. */}
      <div className="highway-strip-grid">
        {stills.map((still, i) => (
          <div
            key={still.src}
            className={`relative w-full overflow-hidden ${
              i === 4 ? "highway-strip-last" : ""
            }`}
            style={{ backgroundColor: "#1a1a1a", aspectRatio: "3 / 4" }}
          >
            <Image
              src={still.src}
              alt={still.alt}
              fill
              sizes="(min-width: 768px) 18vw, 50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <p
        className="mt-6 max-w-[900px] leading-[1.5] opacity-60 md:mt-10"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(13px, 1.5vw, 16px)",
        }}
      >
        Video stills. The Tigasao kids on the abandoned highway, on their handmade boards.
      </p>
    </section>
  );
}

/* =================================================================
   05 — Where the money goes
   ================================================================= */
function WhereTheMoneyGoes() {
  return (
    <section
      className="flex min-h-[100svh] w-full flex-col justify-center px-6 py-24 sm:px-12 md:px-24"
      style={{ backgroundColor: SURFACE, color: INK }}
    >
      <p
        className="mb-6 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[13px] md:mb-10 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        Where the money goes
      </p>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <h2
            className="m-0 leading-[0.92]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(40px, 8vw, 128px)",
            }}
          >
            Four steps.
            <br />
            In order.
          </h2>

          <p
            className="mt-8 max-w-[640px] leading-[1.5] opacity-75 md:mt-12"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.7vw, 19px)",
            }}
          >
            When the campaign opens, the money goes through this cascade in order. CIC-registered.
            Public budget. You see exactly where every bit of it went.
          </p>
        </div>

        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: "4 / 5" }}
        >
          <Image
            src="/images/pitch/board-collection.jpg"
            alt="The Tigasao kids' handmade boards laid out together"
            fill
            sizes="(min-width: 768px) 35vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-8 md:mt-20 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
        <CascadeRow
          step={1}
          title="Safety gear"
          body="Helmets and pads. The kids skate barefoot on concrete now. This is first."
        />
        <CascadeRow
          step={2}
          title="Mini ramp"
          body="Plywood quarter-pipe at the slab. Built on weekends with the older kids."
        />
        <CascadeRow
          step={3}
          title="English classroom"
          body="The community asked for this. Bamboo and concrete learning space, so skating doesn't pull kids away from school."
        />
        <CascadeRow
          step={4}
          title="Skate park"
          body="A permanent concrete bowl. The crew who built the south-island park already on standby. Community-owned forever."
        />
      </div>
    </section>
  );
}

/* =================================================================
   06 — What you'll back (lookbook, no prices)
   ================================================================= */
function WhatYouGet() {
  return (
    <section
      className="flex w-full flex-col px-6 py-24 sm:px-12 md:px-24 md:py-32"
      style={{ backgroundColor: CREAM, color: INK }}
    >
      <p
        className="mb-6 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[13px] md:mb-10 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        What you&apos;ll back
      </p>

      <h2
        className="m-0 leading-[0.92]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(40px, 8vw, 128px)",
        }}
      >
        Buy something
        <br />
        real.
      </h2>

      <p
        className="mt-8 max-w-[760px] leading-[1.5] opacity-75 md:mt-12"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(15px, 1.7vw, 19px)",
        }}
      >
        Not a donation. Not a guilt-tip. You buy a print, a shirt, a tote, a board — and the money
        funds the cascade. Nothing between you and the kids the work is for.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
        <ExchangeCard
          name="A3 photographic prints"
          tier="Standard"
          body="Documentary photographs from the shoot. Each print carries a kid's first name, age, and one line about what skating means to them. Map of the barangay on the back."
        />
        <ExchangeCard
          name="Pacific Kings t-shirt"
          tier="Standard"
          body="White fabric, vermillion screen print. Made for the premieres in Siargao, Bali, and London. Then online."
        />
        <ExchangeCard
          name="Tote bag"
          tier="Personal"
          body="Natural canvas, single-colour print. The bring-your-friends-in piece."
        />
        <ExchangeCard
          name="Scrap-wood skateboard"
          tier="Premium · auction"
          body="Five to ten of the actual boards the kids built. Numbered, signed, hand-shipped by the team."
        />
        <ExchangeCard
          name="Sponsor an outcome"
          tier="Pooled"
          body="Sponsor a pair of skate shoes, a month of English classes, safety gear, or a month at the workshop. Pooled, not named — a local allocator on the ground distributes."
        />
        <ExchangeCard
          name="Founding Supporter"
          tier="First 50"
          body="Direct support. First 50 backers get a numbered badge on the community wall. After that, it's closed."
        />
      </div>

      <p
        className="mt-10 text-[11px] uppercase tracking-[0.18em] opacity-50 md:mt-14 md:text-[13px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        · Prices when the campaign opens · Multi-currency at launch ·
      </p>
    </section>
  );
}

/* =================================================================
   07 — Proof (3 rows with photos)
   ================================================================= */
function Proof() {
  return (
    <section
      className="flex w-full flex-col px-6 py-24 sm:px-12 md:px-24 md:py-32"
      style={{ backgroundColor: SURFACE, color: INK }}
    >
      <p
        className="mb-6 text-[11px] uppercase tracking-[0.24em] opacity-60 sm:text-[13px] md:mb-10 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
      >
        Proof before pitch
      </p>

      <h2
        className="m-0 leading-[0.92]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(40px, 8vw, 128px)",
        }}
      >
        The story is
        <br />
        already moving.
      </h2>

      <div className="mt-12 flex flex-col gap-6 md:mt-20 md:gap-8">
        <ProofRow
          badge="Skate community"
          headline="Vans Philippines have already sent decks."
          body="Unprompted. The skate community saw the boards and wanted to help. Not a brand deal. Not coordinated. They just sent decks."
          image="/images/pitch/kids-vans-highway.jpg"
          imageAlt="Tigasao kids on the abandoned highway with the donated Vans decks"
        />
        <ProofRow
          badge="Editorial"
          headline="A documentary publication is holding press space."
          body="A senior editor at a major surf-and-skate publication has space reserved for a feature in the campaign window. No sponsor outreach until that lands."
          image="/images/pitch/siargao-lighthouse.jpg"
          imageAlt="Siargao lighthouse on the rural northern coast"
        />
        <ProofRow
          badge="Audience"
          headline="Strangers are messaging us, asking to buy boards."
          body="Before the platform existed. Before the campaign opened. Stranger demand is the only demand that matters."
          image="/images/pitch/beach-aerial.webp"
          imageAlt="Aerial view of Siargao's coastline"
        />
      </div>
    </section>
  );
}

/* =================================================================
   08 — Close (signup) + tiny safeguarding line
   ================================================================= */
function Close() {
  return (
    <section
      id="signup"
      className="flex min-h-[100svh] w-full flex-col items-center justify-center px-6 py-24 text-center sm:px-12 md:px-24"
      style={{ backgroundColor: INK, color: CREAM }}
    >
      <p
        className="mb-10 text-[11px] uppercase tracking-[0.24em] sm:text-[13px] md:mb-14 md:text-[18px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION_LIGHT }}
      >
        · Get the launch email ·
      </p>

      <h2
        className="m-0 max-w-[1300px] leading-[0.94]"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(44px, 11vw, 200px)",
        }}
      >
        Be here
        <br />
        when it lands.
      </h2>

      <div className="mt-12 w-full max-w-[600px] md:mt-20">
        <WaitlistInlineForm />
      </div>

      <p
        className="mt-8 max-w-[640px] text-[12px] leading-[1.6] opacity-50 md:mt-10 md:text-[14px]"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        First names only. Written parental consent for every kid in the film. No named-child
        sponsorship. Ever.
      </p>

      <div
        className="mt-14 flex flex-col items-center gap-3 md:mt-20"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <p className="text-[14px] opacity-60 md:text-[18px]">Or follow the project on Instagram.</p>
        <a
          href={SOCIAL.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 no-underline transition-opacity hover:opacity-90"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontStyle: "italic",
            color: VERMILLION_LIGHT,
            fontSize: "clamp(24px, 5vw, 56px)",
          }}
        >
          {SOCIAL.instagram.handle}
          <Glyph char={ARROWS.cta} size="md" fontSize={28} color={VERMILLION_LIGHT} />
        </a>
      </div>
    </section>
  );
}

/* =================================================================
   Top chrome — parent wordmark + IG (per parent-shell.md)
   ================================================================= */
function TopChrome({ onDark }: { onDark?: boolean }) {
  const color = onDark ? CREAM : INK;
  return (
    <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-12 sm:pt-10 md:px-24 md:pt-12">
      <Link
        href="/"
        className="text-[13px] tracking-[-0.01em] no-underline opacity-70 transition-opacity hover:opacity-100 md:text-[14px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color }}
      >
        {PARENT.wordmark}
      </Link>
      <a
        href={SOCIAL.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100 sm:text-[11px]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color }}
      >
        {SOCIAL.instagram.handle}
      </a>
    </header>
  );
}

/* =================================================================
   Footer — parent shell, small per parent-shell.md
   ================================================================= */
function Footer() {
  return (
    <footer
      className="flex flex-col items-start gap-3 px-6 py-10 text-[11px] uppercase tracking-[0.18em] opacity-70 sm:px-12 md:flex-row md:items-center md:justify-between md:px-24"
      style={{
        backgroundColor: INK,
        color: CREAM,
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        borderTop: `1px solid ${CREAM}22`,
      }}
    >
      <Link href="/" className="no-underline transition-opacity hover:opacity-100" style={{ color: CREAM }}>
        {PARENT.wordmark}
      </Link>
      <span>Powered by {PARENT.legal} · © 2026</span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <a href={`mailto:${CONTACT.sponsor}`} className="hover:opacity-100">{CONTACT.sponsor}</a>
        <Link href="/privacy" className="hover:opacity-100">Privacy</Link>
        <Link href="/terms" className="hover:opacity-100">Terms</Link>
        <Link href="/safeguarding" className="hover:opacity-100">Safeguarding</Link>
      </div>
    </footer>
  );
}

/* =================================================================
   Sub-components
   ================================================================= */

function ThesisBullet({
  mark,
  image,
  imageAlt,
  title,
  body,
}: {
  mark: string;
  image: string;
  imageAlt: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "#1a1a1a", aspectRatio: "16 / 11" }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 30vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 border-t-2 pt-5" style={{ borderColor: INK }}>
        <Glyph char={mark} size="md" fontSize={28} color={VERMILLION} />
        <h3
          className="m-0 leading-tight"
          style={{
            fontFamily: "var(--font-display-36)",
            fontWeight: 900,
            fontSize: "clamp(24px, 3.4vw, 34px)",
          }}
        >
          {title}
        </h3>
        <p
          className="m-0 leading-[1.55] opacity-75"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.6vw, 17px)",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function CascadeRow({ step, title, body }: { step: number; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-4 border-l-2 pl-6" style={{ borderColor: VERMILLION }}>
      <span
        className="leading-none"
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
          fontSize: "clamp(36px, 5vw, 64px)",
          color: INK,
        }}
      >
        {String(step).padStart(2, "0")}
      </span>
      <h3
        className="m-0 leading-tight"
        style={{
          fontFamily: "var(--font-display-36)",
          fontWeight: 900,
          fontSize: "clamp(24px, 3vw, 32px)",
        }}
      >
        {title}
      </h3>
      <p
        className="m-0 leading-[1.55] opacity-75"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(14px, 1.55vw, 16px)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ExchangeCard({ name, tier, body }: { name: string; tier: string; body: string }) {
  return (
    <div className="flex flex-col gap-4 border-t-2 pt-6" style={{ borderColor: INK }}>
      <span
        className="text-[11px] uppercase tracking-[0.18em]"
        style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION }}
      >
        {tier}
      </span>
      <h3
        className="m-0 leading-tight"
        style={{
          fontFamily: "var(--font-display-36)",
          fontWeight: 900,
          fontSize: "clamp(22px, 2.8vw, 30px)",
        }}
      >
        {name}
      </h3>
      <p
        className="m-0 leading-[1.55] opacity-75"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "clamp(14px, 1.55vw, 16px)",
        }}
      >
        {body}
      </p>
    </div>
  );
}

function ProofRow({
  badge,
  headline,
  body,
  image,
  imageAlt,
}: {
  badge: string;
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div
      className="flex flex-col gap-0 overflow-hidden border-l-4 md:flex-row md:items-stretch"
      style={{ borderColor: VERMILLION, backgroundColor: CREAM }}
    >
      <div
        className="relative w-full md:w-[280px] md:shrink-0"
        style={{ aspectRatio: "16 / 10" }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 280px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3">
          <Glyph char={DINGBATS.floret} size="sm" fontSize={14} color={VERMILLION} />
          <span
            className="text-[11px] uppercase tracking-[0.16em] sm:text-[12px]"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: VERMILLION }}
          >
            {badge}
          </span>
        </div>
        <h3
          className="m-0 leading-tight"
          style={{
            fontFamily: "var(--font-display-36)",
            fontWeight: 900,
            fontSize: "clamp(22px, 2.6vw, 30px)",
          }}
        >
          {headline}
        </h3>
        <p
          className="m-0 leading-[1.55] opacity-75"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(14px, 1.55vw, 17px)",
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}
