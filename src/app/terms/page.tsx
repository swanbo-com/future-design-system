import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the future.ly pre-launch sponsor landing page.",
};

export default function TermsPage() {
  return (
    <>
      <LandingNav />
      <main className="pt-28 pb-24 md:pt-36 md:pb-32">
        <Container width="prose">
          <SectionHeading
            kicker="Terms · v0.1 · 15 April 2026"
            title="Terms of use"
            titleSize="lg"
          />

          <div className="mt-12 flex flex-col gap-8 text-[16px] leading-relaxed text-foreground md:text-[17px]">
            <p>
              future.ly is a pre-launch site operated by the team assembling future.ly CIC
              (UK Community Interest Company, filing in progress). This page describes the
              terms under which you can use the site today — before Campaign Zero launches
              on 30 April 2026.
            </p>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                What this page is
              </h2>
              <p className="mt-4 text-mute">
                An informational site for prospective sponsors, press, and waitlist
                signups. You can read, share, and submit your email. Nothing else happens
                today — no payments, no orders, no auctions.
              </p>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Sponsor applications
              </h2>
              <p className="mt-4 text-mute">
                If you email <a href="mailto:sponsor@future.ly" className="text-vermillion underline underline-offset-4">sponsor@future.ly</a> to apply as a sponsor, you&apos;re
                expressing interest. Nothing is binding until a separate sponsorship
                agreement is signed. All sponsorships are subject to CIC Regulator consent
                for any fund transfers to external project bodies.
              </p>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Content
              </h2>
              <p className="mt-4 text-mute">
                Photographs of children in Siargao appear on this site with written
                bilingual parental consent. If any image appears without consent, email{" "}
                <a
                  href="mailto:safeguarding@future.ly"
                  className="text-vermillion underline underline-offset-4"
                >
                  safeguarding@future.ly
                </a>{" "}
                immediately and we will remove it within 24 hours pending review.
              </p>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Limits
              </h2>
              <p className="mt-4 text-mute">
                The site is provided &ldquo;as is.&rdquo; We make no warranty that Campaign
                Zero will reach its funding target, that the documentary will be completed
                on any specific timeline, or that the site will be available without
                interruption. Full terms will be published when the campaign opens for
                transactions on 30 April 2026.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <LandingFooter />
    </>
  );
}
