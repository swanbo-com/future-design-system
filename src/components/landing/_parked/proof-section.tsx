import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS } from "@/components/brand/glyph";
import type { ReactNode } from "react";

/**
 * ProofSection — three validation points from campaign-zero.md §"Why This
 * Is Campaign Zero". Brands and outlets are anonymised ("a UK skate brand",
 * "a major editorial outlet") until permission is confirmed — the assertion
 * is the same either way and the copy can be swapped in-place.
 */

type ProofPoint = {
  badge: string;
  headline: string;
  body: ReactNode;
};

const POINTS: ProofPoint[] = [
  {
    badge: "Brand interest",
    headline: "A UK-listed skate brand has already sent decks",
    body: (
      <>
        Unprompted outreach from a major surf-skate brand with Philippine presence — before
        we&apos;ve pitched them. The signal is: the story is already travelling faster than
        the platform.
      </>
    ),
  },
  {
    badge: "Editorial",
    headline: "A major editorial outlet is a confirmed contact",
    body: (
      <>
        A senior editor at a documentary-friendly publication has a direct line to the team
        and is holding space for a Week 1 or Week 2 feature. The documentary angle — not the
        crowdfunding one — is the pitch.
      </>
    ),
  },
  {
    badge: "Audience",
    headline: "Strangers are messaging the team unprompted",
    body: (
      <>
        Instagram DMs asking to buy the boards. Before the platform exists, before the
        campaign launches, before any ad spend. Stranger demand is the only demand that
        matters for the stranger-ratio thesis.
      </>
    ),
  },
];

export function ProofSection() {
  return (
    <section id="proof" className="py-24 md:py-32">
      <Container width="default">
        <SectionHeading
          kicker="Proof before pitch"
          title="The story is already moving"
          sub="Three signals from the last three months. None of these are hypothetical — all three are warm, all three are verifiable on request."
          titleSize="lg"
        />

        <div className="mt-12 flex flex-col gap-4 md:mt-16 md:gap-6">
          {POINTS.map((p, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 border-l-2 border-vermillion bg-surface p-6 md:flex-row md:items-start md:gap-8 md:p-8"
            >
              <div className="flex items-center gap-3 md:w-[180px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                <Glyph
                  char={DINGBATS.floret}
                  size="sm"
                  fontSize={14}
                  color="var(--brand-vermillion)"
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.16em] text-vermillion"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p.badge}
                </span>
              </div>
              <div className="flex flex-col gap-2 md:flex-1">
                <h3
                  className="m-0 text-[18px] leading-tight text-foreground md:text-[22px]"
                  style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
                >
                  {p.headline}
                </h3>
                <p className="m-0 text-[14px] leading-relaxed text-mute md:text-[15px]">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[640px] text-[13px] leading-relaxed text-mute md:mt-12">
          Brands + outlets anonymised until we have permission to name them. Sponsors get the
          full list on a 20-minute call — email{" "}
          <a href="mailto:sponsor@future.ly" className="text-vermillion underline underline-offset-4">
            sponsor@future.ly
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
