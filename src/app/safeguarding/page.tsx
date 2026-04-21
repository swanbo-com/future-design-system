import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";

export const metadata: Metadata = {
  title: "Safeguarding",
  description:
    "How future.ly protects the children who appear on the platform. Written consent, no surnames, no exact locations, immediate takedown on request.",
};

export default function SafeguardingPage() {
  return (
    <>
      <LandingNav />
      <main className="pt-28 pb-24 md:pt-36 md:pb-32">
        <Container width="prose">
          <SectionHeading
            kicker="Policy · v0.1 · 15 April 2026"
            title="Safeguarding"
            sub="Non-negotiable. The children who appear on this platform appear with dignity, with written consent, and with an immediate right to withdraw."
            titleSize="lg"
          />

          <div className="mt-12 flex flex-col gap-8 text-[16px] leading-relaxed text-foreground md:text-[17px]">
            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                The hard rules
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-mute">
                <li>
                  <strong className="text-foreground">Written parental consent</strong> is
                  required before any child&apos;s photograph, name, or story appears on the
                  platform. Consent forms are bilingual (English + Filipino) and explain use
                  on the platform, use on social media, and the right to withdraw at any time.
                </li>
                <li>
                  <strong className="text-foreground">First name only.</strong> No surnames
                  published. No exact addresses. Location limited to barangay level.
                </li>
                <li>
                  <strong className="text-foreground">NBI clearance</strong> (Philippines
                  background check) for every crew member embedded with the children,
                  including Bren and Rick.
                </li>
                <li>
                  <strong className="text-foreground">Safeguarding officer named.</strong>{" "}
                  Janiece holds the role on behalf of future.ly CIC. Every content decision
                  involving a child goes through her.
                </li>
                <li>
                  <strong className="text-foreground">Immediate takedown on request.</strong>{" "}
                  If any parent, guardian, child, or community member asks us to remove an
                  image or story, we take it down within 24 hours pending review.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                What we will never do
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-mute">
                <li>Rescue-narrative framing. &ldquo;These kids need saving&rdquo; copy is banned.</li>
                <li>Poverty porn. No tear-jerking close-ups, no deliberate despair-farming.</li>
                <li>Individual fundraising appeals for a single child.</li>
                <li>Location data that could identify a child&apos;s home.</li>
                <li>Use of a child&apos;s image for any purpose outside the platform without re-confirmed consent.</li>
              </ul>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Reporting a concern
              </h2>
              <p className="mt-4 text-mute">
                If something on this site looks wrong to you — an image you think
                shouldn&apos;t be up, a name that shouldn&apos;t be published, a framing
                that feels off — email{" "}
                <a
                  href="mailto:safeguarding@future.ly"
                  className="text-vermillion underline underline-offset-4"
                >
                  safeguarding@future.ly
                </a>{" "}
                and we will review within 24 hours. No judgement for raising a concern we
                later dismiss — that&apos;s how you find the ones we shouldn&apos;t.
              </p>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Compliance
              </h2>
              <p className="mt-4 text-mute">
                UK: Charity Commission safeguarding best practice, UK GDPR, the
                Children&apos;s Code. Philippines: RA 7610 (Child Abuse Act), RA 9775
                (Anti-Child Pornography Act), DSWD clearance for content involving minors.
                Full policy documentation available to sponsors, press, and regulators on
                request.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <LandingFooter />
    </>
  );
}
