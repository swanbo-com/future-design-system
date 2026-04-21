import type { Metadata } from "next";
import Image from "next/image";
import { Slide } from "@/components/deck/slide";
import { Glyph, DINGBATS, ARROWS, HANDS } from "@/components/brand/glyph";
import "./deck.css";

export const metadata: Metadata = {
  title: "Pitch deck",
  description: "future.ly sponsor + press deck. 14 slides. Generated from HTML, exportable to editable PDF.",
};

const TOTAL = 14;

export default function DeckPage() {
  return (
    <div className="deck-root">
      {/* =========================================================
           Slide 1 — Cover
           ========================================================= */}
      <Slide number={1} total={TOTAL} bg="ink" title="cover">
        <div className="flex h-full w-full flex-col items-center justify-center px-24 text-center">
          <p
            className="mb-12 text-[22px] uppercase tracking-[0.24em] text-[#F28C83]"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            · future.ly · campaign zero ·
          </p>

          <Image
            src="/brand/pacific-kings/pacific-kings-lockup-stacked-cream.svg"
            alt="PACIFIC KINGS"
            width={1400}
            height={275}
            priority
            className="mb-16 h-auto w-[1100px] max-w-[85%]"
          />

          <p
            className="text-[40px] italic"
            style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
          >
            The sponsor + press deck
          </p>

          <div className="mt-16 flex items-center gap-6 text-[18px] uppercase tracking-[0.2em] opacity-70"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            <span>v1.0</span>
            <Glyph char={DINGBATS.floret} size="sm" fontSize={18} />
            <span>15 april 2026</span>
            <Glyph char={DINGBATS.floret} size="sm" fontSize={18} />
            <span>confidential</span>
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 2 — The moment
           ========================================================= */}
      <Slide number={2} total={TOTAL} bg="ink" title="the moment">
        <div className="relative h-full w-full">
          <Image
            src="/images/hero-pacific-kings.png"
            alt="A Siargao skate kid holds a handmade coconut-wood skateboard"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/85 via-[#0F0F0F]/25 to-transparent" />
          <div className="relative flex h-full w-full flex-col justify-center px-24">
            <p
              className="mb-8 text-[22px] uppercase tracking-[0.24em] text-[#F28C83]"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
            >
              Siargao · Philippines · 2026
            </p>
            <h1
              className="m-0 max-w-[1100px] text-[96px] leading-[0.96]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
            >
              A group of kids are building skateboards from scrap wood.
            </h1>
            <p className="mt-10 max-w-[900px] text-[32px] leading-[1.4] opacity-80">
              Coconut-wood decks, borrowed wheels, sandpaper made of grip tape and roof sealant.
              They skate six kilometres of cracked asphalt to Cloud 9 every afternoon.
            </p>
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 3 — The thesis
           ========================================================= */}
      <Slide number={3} total={TOTAL} bg="cream" title="the thesis">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-10 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            The thesis
          </p>
          <h1
            className="m-0 text-[200px] leading-[0.88]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            One story.
            <br />
            At a time.
          </h1>
          <div className="mt-20 grid max-w-[1500px] grid-cols-3 gap-12">
            <ThesisBullet
              mark={DINGBATS.floret}
              title="The homepage IS the campaign"
              body="No feed, no marketplace, no logo wall. One story runs at a time with a 30-day countdown. Scarcity is the design."
            />
            <ThesisBullet
              mark={ARROWS.cta}
              title="Tangible exchanges, not donations"
              body="Handmade boards. Darkroom prints. A3 kraft mailers. A thank-you card from the kids. Not a receipt."
            />
            <ThesisBullet
              mark={HANDS.writing}
              title="Every pound on the ledger"
              body="CIC-registered. Public budget. Fee breakdown at checkout. Creator revenue shares published quarterly."
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 4 — Positioning gap  (DECK ONLY)
           ========================================================= */}
      <Slide number={4} total={TOTAL} bg="cream" title="positioning">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Why nobody else is doing this
          </p>
          <h1
            className="m-0 mb-16 text-[96px] leading-[0.92]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The positioning gap
          </h1>

          <div className="grid grid-cols-4 gap-6">
            <PositioningCard
              name="GoFundMe"
              model="Open crowdfunding"
              gap="Endless feeds, aggressive tipping, no story arc, no exchange."
            />
            <PositioningCard
              name="Kickstarter"
              model="Reward-based, all-or-nothing"
              gap="Product and creator focused. Story ends at funding. No living updates."
            />
            <PositioningCard
              name="charity:water"
              model="Story-driven donations"
              gap="Single-org model, not a platform. No exchange. Donation, not participation."
            />
            <PositioningCard
              name="future.ly"
              model="Story-driven exchanges"
              gap="One story at a time. Living narratives. Tangible rewards. Radical transparency."
              accent
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 5 — Campaign Zero
           ========================================================= */}
      <Slide number={5} total={TOTAL} bg="surface" title="campaign zero">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Campaign zero
          </p>
          <h1
            className="m-0 text-[160px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Pacific Kings
          </h1>
          <p className="mt-12 max-w-[1200px] text-[32px] leading-[1.4] text-mute">
            The first story future.ly is telling. A crew of Filipino skate kids. A plank of
            coconut wood. A 30-day window. A documentary team shooting on 35mm since
            January.
          </p>
          <div className="mt-20 flex gap-6">
            {[
              { amt: "£800", label: "Safety Gear" },
              { amt: "£2,200", label: "Mini Ramp" },
              { amt: "£4,800", label: "Classroom Build" },
              { amt: "£7,800", label: "Concrete Park" },
            ].map((m) => (
              <div key={m.label} className="flex flex-1 flex-col gap-3 border-l-2 border-vermillion pl-6">
                <span
                  className="text-[48px] leading-none text-ink"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.amt}
                </span>
                <span
                  className="text-[14px] uppercase tracking-[0.16em] text-mute"
                  style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 6 — The work
           ========================================================= */}
      <Slide number={6} total={TOTAL} bg="cream" title="the work">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            What we&apos;re shipping
          </p>
          <h1
            className="m-0 mb-16 text-[128px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The work
          </h1>
          <div className="grid grid-cols-2 gap-8">
            <MockupTile label="The campaign page" note="30-day live site · dark mode · flanker-framed hero · editorial scroll" />
            <MockupTile label="The A3 darkroom print" note="Hahnemühle archival paper · 35mm insert · QR to campaign" />
            <MockupTile label="The kraft mailer" note="Vintage shipping stamp · origin-of-record · ships from Siargao" />
            <MockupTile label="The founding tee" note="White on vermillion · ❉ closing mark · first 50 backers" />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 7 — Numbers
           ========================================================= */}
      <Slide number={7} total={TOTAL} bg="surface" title="the numbers">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            What success looks like
          </p>
          <h1
            className="m-0 mb-24 text-[128px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The numbers
          </h1>
          <div className="grid grid-cols-4 gap-12">
            <Stat value="£5,000" label="Campaign target" />
            <Stat value="50" label="Funded exchanges" />
            <Stat value="30" label="Day countdown" />
            <Stat value="50%+" label="Strangers, not network" accent />
          </div>
          <p className="mt-20 max-w-[1200px] text-[22px] leading-[1.5] text-mute">
            The stranger ratio is the metric that matters. Day 7 target: 50% of funders are
            outside the immediate network. If the story only reaches people we know, the
            distribution thesis fails — even if the total funds.
          </p>
        </div>
      </Slide>

      {/* =========================================================
           Slide 8 — Timeline
           ========================================================= */}
      <Slide number={8} total={TOTAL} bg="cream" title="timeline">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Timeline
          </p>
          <h1
            className="m-0 mb-16 text-[128px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The next sixty days
          </h1>
          <div className="grid grid-cols-3 gap-10">
            {[
              { date: "15 April", title: "Now", note: "Sponsor outreach + press kit. This deck." , state: "now" as const },
              { date: "30 April", title: "Campaign Zero launches", note: "The homepage becomes the campaign. 30-day countdown starts.", state: "launch" as const },
              { date: "30 May", title: "Day 30 · funded", note: "Campaign closes. Final ledger published. Fulfilment begins.", state: "future" as const },
              { date: "15 June", title: "Fulfilment ships", note: "A3 prints, kraft mailers, tees. Kids receive their cut of revenue share.", state: "future" as const },
              { date: "July 2026", title: "Documentary cut-down", note: "Short-form sponsor edit ships. Festival submissions begin.", state: "future" as const },
              { date: "September 2026", title: "Campaign Two", note: "Second story announced. Founding sponsors get first access.", state: "future" as const },
            ].map((e) => (
              <TimelineItem key={e.title} {...e} />
            ))}
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 9 — Why sponsor
           ========================================================= */}
      <Slide number={9} total={TOTAL} bg="cream" title="why sponsor">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Why sponsor
          </p>
          <h1
            className="m-0 mb-16 text-[120px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Four reasons it&apos;s worth the line item
          </h1>
          <div className="grid grid-cols-2 gap-8">
            <ReasonCard
              mark={DINGBATS.floret}
              title="Integrated narrative"
              body="Your brand in the film, on the A3 print, on the mailer, in the press kit. Not a logo wall — woven into what the audience is watching."
            />
            <ReasonCard
              mark={HANDS.writing}
              title="Radical transparency"
              body="Every pound on a public ledger. CIC-registered. Every invoice available. Net-to-project published in real time."
            />
            <ReasonCard
              mark={ARROWS.flourish}
              title="Founding moment"
              body="Campaign Zero is proof-of-concept for a five-year roadmap. First writer's credit. Founding-circle access to everything after."
            />
            <ReasonCard
              mark={DINGBATS.star12}
              title="Real audiences"
              body="Surf, skate, documentary. 20–45. Australia, UK, US, Philippines. The people who buy from Rhythm, Heaps Normal, Day For It."
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 10 — Sponsor tiers
           ========================================================= */}
      <Slide number={10} total={TOTAL} bg="surface" title="tiers">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Three ways to back Campaign Zero
          </p>
          <h1
            className="m-0 mb-16 text-[120px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Sponsor tiers
          </h1>
          <div className="grid grid-cols-3 gap-6">
            <TierCard
              name="Founding Patron"
              price="£10,000+"
              note="Sponsorship or donation"
              benefits={[
                "Named above the title in the documentary credits",
                "Exclusive A3 darkroom print, numbered + signed",
                "Sponsor mention in every press release and update",
                "Founding-circle access to Campaign Two preview",
                "Private call with the founder + director before launch",
              ]}
              accent
            />
            <TierCard
              name="Campaign Sponsor"
              price="£2,500–9,999"
              note="Sponsorship or donation"
              benefits={[
                "Logo + link in the campaign-page sponsor strip",
                "Credit in the documentary end-roll",
                "Press-kit mention for every story picked up",
                "Private preview a week before launch",
                "Founding-50 tee + kraft mailer",
              ]}
            />
            <TierCard
              name="Community Backer"
              price="£500–2,499"
              note="Sponsorship or donation"
              benefits={[
                "Name on the campaign-page supporter wall",
                "Founding-50 tee",
                "Early access to Campaign Two when it opens",
                "Printed thank-you from the team in Siargao",
              ]}
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 11 — Team
           ========================================================= */}
      <Slide number={11} total={TOTAL} bg="cream" title="team">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            The team
          </p>
          <h1
            className="m-0 mb-16 text-[128px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Five people making this
          </h1>
          <div className="grid grid-cols-5 gap-6">
            <PersonCard
              name="John Asbury"
              role="Platform · Strategy"
              credit="Building the platform and writing the thesis. Product and agency background, now future.ly full-time."
              mark={HANDS.writing}
            />
            <PersonCard
              name="Bren"
              role="Content · Siargao"
              credit="Lead photographer, embedded with the Pacific Kings since January. Left media for grassroots documentary."
              mark={DINGBATS.floret}
            />
            <PersonCard
              name="Rick"
              role="Video · Documentary"
              credit="Videographer and producer. Shooting the 30-day film that anchors the content unlocks."
              mark={HANDS.nib}
            />
            <PersonCard
              name="Janiece"
              role="Ops · Safeguarding"
              credit="CIC governance and safeguarding officer. Ensures every child appears with dignity and consent."
              mark={DINGBATS.star12}
            />
            <PersonCard
              name="Sam Graham"
              role="Editorial · Press"
              credit="Senior editor at a documentary-friendly publication. Holding Week-1 feature space."
              mark={HANDS.pointRight}
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 12 — Proof
           ========================================================= */}
      <Slide number={12} total={TOTAL} bg="cream" title="proof">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            Proof before pitch
          </p>
          <h1
            className="m-0 mb-16 text-[120px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The story is already moving
          </h1>
          <div className="flex flex-col gap-6">
            <ProofRow
              badge="Brand interest"
              headline="A UK-listed skate brand has already sent decks"
              body="Unprompted outreach from a major surf-skate brand with Philippine presence — before we'd pitched them. Logo on request."
            />
            <ProofRow
              badge="Editorial"
              headline="A major editorial outlet is a confirmed contact"
              body="A senior editor at a documentary-friendly publication is holding space for a Week 1 or Week 2 feature."
            />
            <ProofRow
              badge="Audience"
              headline="Strangers are messaging the team unprompted"
              body="Instagram DMs asking to buy boards. Before the platform existed. Stranger demand is the only demand that matters."
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 13 — Roadmap  (DECK ONLY)
           ========================================================= */}
      <Slide number={13} total={TOTAL} bg="surface" title="roadmap">
        <div className="flex h-full w-full flex-col justify-center px-24">
          <p className="mb-6 text-[22px] uppercase tracking-[0.24em] text-mute"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            What comes after
          </p>
          <h1
            className="m-0 mb-20 text-[128px] leading-[0.9]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            The roadmap
          </h1>
          <div className="grid grid-cols-3 gap-8">
            <RoadmapStep
              number="01"
              when="Apr 2026"
              title="Campaign Zero"
              body="Pacific Kings · Siargao · Skateboarding. The proof of concept. Validates the exchange model, the transparency mechanics, and the living-story format."
              active
            />
            <RoadmapStep
              number="02"
              when="Q3 2026"
              title="Campaign One"
              body="Our Ocean School · Indonesia · Surfing. Validates the platform thesis: the model works for multiple stories, in multiple disciplines."
            />
            <RoadmapStep
              number="03"
              when="Q1 2027"
              title="Campaign Two"
              body="Inbound submission · TBD. Validates that it scales: stories approaching us, community voting on what gets told, platform becoming self-sustaining."
            />
          </div>
        </div>
      </Slide>

      {/* =========================================================
           Slide 14 — Close  (DECK ONLY)
           ========================================================= */}
      <Slide number={14} total={TOTAL} bg="ink" title="close">
        <div className="flex h-full w-full flex-col items-center justify-center px-24 text-center">
          <p className="mb-12 text-[22px] uppercase tracking-[0.24em] text-[#F28C83]"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
          >
            · 30 April 2026 ·
          </p>
          <h1
            className="m-0 text-[200px] leading-[0.88]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
          >
            Be here
            <br />
            when it lands
          </h1>
          <div className="mt-24 flex flex-col gap-6 text-[28px]"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            <div className="flex items-center gap-4">
              <Glyph char={ARROWS.cta} size="md" fontSize={28} />
              <span>sponsor@future.ly</span>
            </div>
            <div className="flex items-center gap-4 opacity-70">
              <Glyph char={ARROWS.back} size="md" fontSize={28} />
              <span>hello@future.ly</span>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}

/* ============================================================
   Slide-local sub-components
   ============================================================ */

function ThesisBullet({ mark, title, body }: { mark: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-4 border-t-2 border-ink pt-6">
      <Glyph char={mark} size="md" fontSize={36} color="var(--brand-vermillion)" />
      <h3 className="m-0 text-[32px] leading-tight" style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}>
        {title}
      </h3>
      <p className="m-0 text-[18px] leading-[1.5] text-mute">{body}</p>
    </div>
  );
}

function PositioningCard({
  name,
  model,
  gap,
  accent,
}: { name: string; model: string; gap: string; accent?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-sm border-2 p-8 ${accent ? "border-vermillion bg-surface" : "border-rule bg-cream"}`}
    >
      <h3
        className={`m-0 text-[32px] leading-tight ${accent ? "text-vermillion" : "text-ink"}`}
        style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
      >
        {name}
      </h3>
      <p className="m-0 text-[14px] uppercase tracking-[0.14em] text-mute" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        {model}
      </p>
      <p className="m-0 mt-2 text-[16px] leading-[1.5] text-ink">{gap}</p>
    </div>
  );
}

function MockupTile({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-kraft"
        aria-label={label}
      >
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--brand-kraft)_0_20px,#b89a72_20px_40px)]" />
        <div className="absolute inset-0 flex items-center justify-center text-[14px] uppercase tracking-[0.18em] text-ink/60"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {label} · photo to follow
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="m-0 text-[24px] leading-tight" style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}>
          {label}
        </h3>
        <p className="m-0 text-[14px] text-mute">{note}</p>
      </div>
    </div>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-4 border-t-2 border-ink pt-6">
      <span
        className={`text-[88px] leading-none ${accent ? "text-vermillion" : "text-ink"}`}
        style={{
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
      <span className="text-[16px] uppercase tracking-[0.16em] text-mute" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
        {label}
      </span>
    </div>
  );
}

function TimelineItem({ date, title, note, state }: { date: string; title: string; note: string; state: "now" | "launch" | "future" }) {
  const accent =
    state === "now" ? "text-vermillion" : state === "launch" ? "text-ink" : "text-mute";
  return (
    <div className="flex flex-col gap-3 border-l-2 border-rule pl-6">
      <div className="flex items-center gap-3">
        <Glyph char={DINGBATS.floret} size="sm" fontSize={14} color={state === "now" ? "var(--brand-vermillion)" : "var(--brand-ink)"} />
        <p className={`m-0 text-[14px] uppercase tracking-[0.14em] ${accent}`}
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}
        >
          {date}
        </p>
      </div>
      <h3 className="m-0 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}>
        {title}
      </h3>
      <p className="m-0 text-[16px] leading-[1.5] text-mute">{note}</p>
    </div>
  );
}

function ReasonCard({ mark, title, body }: { mark: string; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-4 rounded-sm border border-rule bg-surface p-10">
      <div className="flex items-center gap-4">
        <Glyph char={mark} size="md" fontSize={32} color="var(--brand-vermillion)" />
        <h3 className="m-0 text-[32px] leading-tight" style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}>
          {title}
        </h3>
      </div>
      <p className="m-0 text-[18px] leading-[1.5] text-mute">{body}</p>
    </div>
  );
}

function TierCard({
  name,
  price,
  note,
  benefits,
  accent,
}: { name: string; price: string; note: string; benefits: string[]; accent?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-5 rounded-sm p-8 ${accent ? "border-2 border-vermillion bg-cream" : "border border-rule bg-cream"}`}
    >
      <h3 className="m-0 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}>
        {name}
      </h3>
      <div className="flex flex-col gap-1 border-b border-rule pb-5">
        <span
          className="text-[44px] leading-none text-ink"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
        >
          {price}
        </span>
        <span className="text-[12px] uppercase tracking-[0.14em] text-mute" style={{ fontFamily: "var(--font-sans)" }}>
          {note}
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {benefits.map((b) => (
          <li key={b} className="flex gap-3 text-[14px] leading-[1.4] text-ink">
            <Glyph char={DINGBATS.floret} size="xs" fontSize={11} color="var(--brand-vermillion)" className="mt-[3px]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PersonCard({ name, role, credit, mark }: { name: string; role: string; credit: string; mark: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-kraft">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--brand-kraft)_0_12px,#b89a72_12px_24px)]" />
        <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full text-ink/30">
          <circle cx="50" cy="42" r="18" fill="currentColor" />
          <path d="M50 64 Q22 68 16 116 L84 116 Q78 68 50 64 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Glyph char={mark} size="xs" fontSize={14} color="var(--brand-vermillion)" />
          <h3 className="m-0 text-[20px] leading-tight" style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}>
            {name}
          </h3>
        </div>
        <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-vermillion" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          {role}
        </p>
        <p className="m-0 mt-2 text-[13px] leading-[1.5] text-mute">{credit}</p>
      </div>
    </div>
  );
}

function ProofRow({ badge, headline, body }: { badge: string; headline: string; body: string }) {
  return (
    <div className="flex items-start gap-8 border-l-4 border-vermillion bg-surface p-8">
      <div className="flex w-[220px] shrink-0 flex-col gap-2">
        <Glyph char={DINGBATS.floret} size="sm" fontSize={16} color="var(--brand-vermillion)" />
        <span className="text-[12px] uppercase tracking-[0.16em] text-vermillion" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          {badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="m-0 text-[28px] leading-tight" style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}>
          {headline}
        </h3>
        <p className="m-0 text-[16px] leading-[1.5] text-mute">{body}</p>
      </div>
    </div>
  );
}

function RoadmapStep({
  number,
  when,
  title,
  body,
  active,
}: { number: string; when: string; title: string; body: string; active?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-sm p-10 ${active ? "border-2 border-vermillion bg-cream" : "border border-rule bg-cream/50"}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[88px] leading-none ${active ? "text-vermillion" : "text-mute"}`}
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
        >
          {number}
        </span>
        <span className="text-[14px] uppercase tracking-[0.16em] text-mute" style={{ fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          {when}
        </span>
      </div>
      <h3 className="m-0 text-[32px] leading-tight" style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}>
        {title}
      </h3>
      <p className="m-0 text-[16px] leading-[1.5] text-mute">{body}</p>
    </div>
  );
}
