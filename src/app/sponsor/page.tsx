import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/landing-nav";
import { LandingHero } from "@/components/landing/landing-hero";
import { NumbersStrip } from "@/components/landing/numbers-strip";
import { ThesisSection } from "@/components/landing/thesis-section";
import { CampaignZeroSection } from "@/components/landing/campaign-zero-section";
import { ProofSection } from "@/components/landing/proof-section";
import { MockupShowcase } from "@/components/landing/mockup-showcase";
import { Timeline } from "@/components/landing/timeline";
import { WhySponsor } from "@/components/landing/why-sponsor";
import { SponsorTiers } from "@/components/landing/sponsor-tiers";
import { FounderLetter } from "@/components/landing/founder-letter";
import { TeamSection } from "@/components/landing/team-section";
import { WaitlistCapture } from "@/components/landing/waitlist-capture";
import { LandingFooter } from "@/components/landing/landing-footer";

export const metadata: Metadata = {
  title: "For sponsors",
  description:
    "The full pitch — why future.ly, why Campaign Zero, why Pacific Kings, how the exchange model works, and how to back it. Launching 30 April 2026.",
};

/**
 * /sponsor — the long-form sponsor pitch.
 *
 * Originally lived at /. Moved here on 16 April 2026 when we split the
 * routes into a minimal teaser (/) and a full pitch (/sponsor). People
 * who land on / from a share can click "Full pitch" in the nav to get
 * here; people who arrive directly (via sponsor email) land here
 * straightaway.
 *
 * Voice: documentary filmmaker. Short, real, punchy. Never charity-guilt,
 * never startup-hype. See docs/brand-spec.md §Voice and logo-wordmark-brief.md
 * for the full style guide.
 */
export default function SponsorLandingPage() {
  return (
    <>
      <LandingNav />
      <main className="flex flex-col">
        <LandingHero />
        <NumbersStrip />
        <ThesisSection />
        <CampaignZeroSection />
        <ProofSection />
        <MockupShowcase />
        <Timeline />
        <WhySponsor />
        <SponsorTiers />
        <FounderLetter />
        <TeamSection />
        <WaitlistCapture />
      </main>
      <LandingFooter />
    </>
  );
}
