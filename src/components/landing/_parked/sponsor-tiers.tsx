import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS } from "@/components/brand/glyph";

/**
 * Sponsor tiers — three placeholder tiers for Campaign Zero.
 * All three can also be structured as donations rather than commercial
 * sponsorships; copy at the bottom calls that out.
 */

type Tier = {
  name: string;
  price: string;
  priceNote: string;
  blurb: string;
  benefits: string[];
  cta: string;
  accent?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Founding Patron",
    price: "£10,000+",
    priceNote: "sponsorship or donation",
    blurb: "The line across the top of the credits. Campaign Zero wouldn't have landed without this.",
    benefits: [
      "Named above the title in the documentary credits",
      "Exclusive A3 darkroom print, numbered + signed",
      "Sponsor mention in every press release and campaign update",
      "Founding-circle access to Campaign Two preview",
      "Private call with the founder + director before launch",
    ],
    cta: "Apply as Founding Patron",
    accent: true,
  },
  {
    name: "Campaign Sponsor",
    price: "£2,500–9,999",
    priceNote: "sponsorship or donation",
    blurb: "A meaningful place in the film and the press kit. Visible to the whole 30-day audience.",
    benefits: [
      "Logo + link in the campaign-page sponsor strip",
      "Credit in the documentary end-roll",
      "Press-kit mention for every story picked up",
      "Private preview of the documentary a week before launch",
      "Founding-50 tee and kraft mailer",
    ],
    cta: "Apply as Campaign Sponsor",
  },
  {
    name: "Community Backer",
    price: "£500–2,499",
    priceNote: "sponsorship or donation",
    blurb: "The supporter wall, early access, the founding tee. For smaller brands and individuals.",
    benefits: [
      "Name on the campaign-page supporter wall",
      "Founding-50 tee",
      "Early access to Campaign Two when it opens",
      "Printed thank-you from the team in Siargao",
    ],
    cta: "Apply as Community Backer",
  },
];

function TierCard({ tier }: { tier: Tier }) {
  const cardClass = tier.accent
    ? "relative flex flex-col gap-6 rounded-sm border-2 border-vermillion bg-surface p-8 shadow-lg"
    : "relative flex flex-col gap-6 rounded-sm border border-rule bg-surface p-8";

  return (
    <div className={cardClass}>
      {tier.accent ? (
        <div
          className="absolute -top-3 left-6 bg-vermillion px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FAFAF9]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Most visible
        </div>
      ) : null}

      <div>
        <h3
          className="m-0 text-[26px] leading-tight text-foreground"
          style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
        >
          {tier.name}
        </h3>
        <p
          className="mt-2 flex items-baseline gap-2 text-[32px] text-ink"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {tier.price}
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute" style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.14em" }}>
            {tier.priceNote}
          </span>
        </p>
      </div>

      <p className="m-0 text-[15px] leading-relaxed text-mute">{tier.blurb}</p>

      <ul className="flex flex-col gap-3 border-t border-rule pt-6">
        {tier.benefits.map((b, i) => (
          <li key={i} className="flex gap-3 text-[14px] leading-relaxed text-foreground">
            <Glyph char={DINGBATS.floret} size="xs" fontSize={11} color="var(--brand-vermillion)" className="mt-[5px]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a
        href="mailto:sponsor@future.ly"
        className={buttonVariants({
          size: "lg",
          variant: tier.accent ? "default" : "outline",
          className: "mt-auto no-underline",
        })}
      >
        {tier.cta}
      </a>
    </div>
  );
}

export function SponsorTiers() {
  return (
    <section id="sponsor-tiers" className="border-y border-rule bg-cream py-24 md:py-32">
      <Container width="wide">
        <SectionHeading
          kicker="Become a sponsor"
          title="Three ways to back Campaign Zero"
          sub="Placeholder tiers while we finalise the final benefit stack. All three can be structured as sponsorships or donations depending on your organisation — the tangible benefits stay the same."
          titleSize="lg"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-[640px] text-center text-[13px] leading-relaxed text-mute">
          Prefer to talk before committing? Email{" "}
          <a href="mailto:sponsor@future.ly" className="text-vermillion underline underline-offset-4">
            sponsor@future.ly
          </a>{" "}
          and we&apos;ll find a 20-minute window. CIC registration and full receipt transparency are
          available on request.
        </p>
      </Container>
    </section>
  );
}
