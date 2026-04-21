import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { StoryImage } from "@/components/brand/editorial";

/**
 * Campaign Zero — Pacific Kings.
 * Introduces the first story with photo grid + milestone cascade.
 */

const MILESTONES = [
  { amt: "£800",   label: "Safety Gear" },
  { amt: "£2,200", label: "Mini Ramp" },
  { amt: "£4,800", label: "Classroom Build" },
  { amt: "£7,800", label: "Concrete Park" },
];

export function CampaignZeroSection() {
  return (
    <section id="campaign-zero" className="border-y border-rule bg-surface py-24 md:py-32">
      <Container width="default">
        <SectionHeading
          kicker="Campaign zero"
          title="Pacific Kings"
          sub="The first story future.ly is telling. A crew of Filipino skate kids, a plank of coconut wood, and a 30-day window."
          titleSize="lg"
        />

        {/* Editorial body */}
        <div className="mt-12 max-w-[720px] text-[17px] leading-relaxed text-mute">
          <p className="m-0">
            In Siargao, in the Philippines, a group of kids are building skateboards from what the
            island gives them — coconut wood, borrowed wheels, scraps from the building site next
            to the beach. A documentary team has been shooting them on 35mm since the beginning of
            the year. The campaign runs for thirty days from 30 April 2026.
          </p>
          <p className="mt-6">
            We&apos;re funding four things, in order: the safety gear, the mini ramp, a classroom
            build where the kids can plan the park, and — at the end of the 30 days — the concrete
            park itself. Every milestone unlocks a piece of the film. Every pound goes on the
            ledger.
          </p>
        </div>

        {/* Photo grid — placeholders until real photography lands */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StoryImage alt="Kids and boards, Siargao, 35mm" placeholder placeholderLabel="The kids · 35mm · 2026" aspectRatio="4 / 5" />
          <StoryImage alt="The first ramp under construction" placeholder placeholderLabel="The first ramp" aspectRatio="4 / 5" />
          <StoryImage alt="Coconut wood and borrowed wheels" placeholder placeholderLabel="Coconut wood · borrowed wheels" aspectRatio="4 / 5" />
          <StoryImage alt="Siargao horizon, end of day" placeholder placeholderLabel="Siargao · end of day" aspectRatio="4 / 5" />
        </div>

        {/* Milestone cascade */}
        <div className="mt-16 max-w-[720px]">
          <p
            className="mb-5 text-[11px] font-medium uppercase tracking-[0.14em] text-mute"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The four milestones
          </p>
          <div className="flex flex-col gap-3">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex items-center gap-4 border-b border-rule pb-3 last:border-b-0">
                <span className="text-[7px] leading-none text-ink">■</span>
                <span
                  className="w-20 text-[17px] text-ink md:w-24 md:text-[20px]"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.amt}
                </span>
                <span className="text-[7px] leading-none text-ink">■</span>
                <span
                  className="text-[13px] font-semibold uppercase tracking-[0.1em] text-foreground"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
