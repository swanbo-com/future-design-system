import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS, HANDS, ARROWS } from "@/components/brand/glyph";
import type { ReactNode } from "react";

/**
 * Why sponsor — four value propositions as glyph-marked cards.
 */

type Reason = {
  mark: string;
  markSize: number;
  title: string;
  body: ReactNode;
};

const REASONS: Reason[] = [
  {
    mark: DINGBATS.floret,
    markSize: 24,
    title: "Integrated narrative",
    body: (
      <>
        Your brand appears in the film, on the A3 print insert, on the mailer, in the press kit. Not
        slapped on a logo wall — woven into the story the audience is actually watching.
      </>
    ),
  },
  {
    mark: HANDS.writing,
    markSize: 24,
    title: "Radical transparency",
    body: (
      <>
        Every pound on a public ledger. CIC-registered. Every invoice available on request. Net to
        project is published at the top of the campaign page in real time.
      </>
    ),
  },
  {
    mark: ARROWS.flourish,
    markSize: 24,
    title: "Founding moment",
    body: (
      <>
        Campaign Zero is the proof-of-concept for a platform with a five-year roadmap. Sponsors on
        the line now get the first writer&apos;s credit and founding-circle access to everything
        after.
      </>
    ),
  },
  {
    mark: DINGBATS.star12,
    markSize: 24,
    title: "Real audiences",
    body: (
      <>
        Surf, skate, documentary. 20–45. Australia, UK, US, Philippines. The people who buy from
        Rhythm, Heaps Normal, Day For It, The Lobster Shanty. Not a charity mailing list.
      </>
    ),
  },
];

export function WhySponsor() {
  return (
    <section id="why-sponsor" className="py-24 md:py-32">
      <Container width="default">
        <SectionHeading
          kicker="Why sponsor"
          title="Four reasons it's worth the line item"
          titleSize="lg"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-sm border border-rule bg-surface p-8"
            >
              <div className="flex items-center gap-3">
                <Glyph char={r.mark} size="md" fontSize={r.markSize} color="var(--brand-vermillion)" />
                <h3
                  className="m-0 text-[22px] leading-tight text-foreground"
                  style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
                >
                  {r.title}
                </h3>
              </div>
              <p className="m-0 text-[15px] leading-relaxed text-mute">{r.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
