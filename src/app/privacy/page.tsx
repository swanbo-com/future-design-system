import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingFooter } from "@/components/landing/landing-footer";
import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What future.ly collects, why, and how long we keep it. No tracking, no cookies, no newsletter drip.",
};

export default function PrivacyPage() {
  return (
    <>
      <LandingNav />
      <main className="pt-28 pb-24 md:pt-36 md:pb-32">
        <Container width="prose">
          <SectionHeading
            kicker="Policy · v0.1 · 15 April 2026"
            title="Privacy"
            titleSize="lg"
          />

          <div className="mt-12 flex flex-col gap-8 text-[16px] leading-relaxed text-foreground md:text-[17px]">
            <p>
              future.ly is in pre-launch. This page is a placeholder while the full privacy
              policy is finalised with the CIC governance team. The short version below is
              accurate and binding for anyone who interacts with the site today.
            </p>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                What we collect
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-mute">
                <li>
                  <strong className="text-foreground">Your email</strong>, only if you submit
                  the waitlist form. Stored in Resend (our transactional email provider) and
                  in the founder&apos;s inbox.
                </li>
                <li>
                  <strong className="text-foreground">UTM parameters</strong> (utm_source,
                  utm_medium, utm_campaign) from any link you arrive on, stored in a
                  first-party cookie (<code className="font-mono">_futurely_utm</code>) for
                  30 days. Used solely to attribute how you found us.
                </li>
                <li>
                  <strong className="text-foreground">Nothing else.</strong> No Google
                  Analytics. No Meta Pixel. No fingerprinting. No consent banner because
                  there&apos;s nothing to consent to.
                </li>
              </ul>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                What we do with it
              </h2>
              <ul className="mt-4 flex flex-col gap-2 text-mute">
                <li>We send you two emails maximum: trailer-drop and launch-day.</li>
                <li>We count how many people found us from each channel.</li>
                <li>We do not sell, share, or pass your data to any third party.</li>
              </ul>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                Your rights
              </h2>
              <p className="mt-4 text-mute">
                Under UK GDPR you can ask us to show you every piece of data we hold on
                you, correct anything that&apos;s wrong, or delete it entirely. Email{" "}
                <a
                  href="mailto:privacy@future.ly"
                  className="text-vermillion underline underline-offset-4"
                >
                  privacy@future.ly
                </a>{" "}
                and we&apos;ll respond within 7 days.
              </p>
            </section>

            <section>
              <h2
                className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
                style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
              >
                This will grow
              </h2>
              <p className="mt-4 text-mute">
                Once the campaign is live we&apos;ll take payments via Stripe, fulfil
                tangible exchanges, and store funder addresses for shipping. This page will
                expand to cover all of that, with specific retention periods and data
                controllers named. If you&apos;re reading this after 30 April 2026 and the
                page still looks short, email us and shame us.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <LandingFooter />
    </>
  );
}
