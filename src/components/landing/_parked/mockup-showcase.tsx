import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { StoryImage } from "@/components/brand/editorial";

/**
 * Mockup showcase — grid of the tangible work: campaign page, A3 print, mailer, tee.
 * Uses StoryImage placeholders until real screenshots are exported.
 */

const MOCKUPS = [
  { label: "The campaign page",  note: "30-day live site · dark mode · fleuron flankers", aspectRatio: "16 / 10" },
  { label: "The A3 print",       note: "Darkroom kraft · 35mm insert · QR to campaign",   aspectRatio: "3 / 4"   },
  { label: "The kraft mailer",   note: "Vintage shipping stamp · shipped from Siargao",   aspectRatio: "4 / 3"   },
  { label: "The chest print",    note: "White on red · balloon floret closing mark",      aspectRatio: "4 / 5"   },
];

export function MockupShowcase() {
  return (
    <section id="mockups" className="py-24 md:py-32">
      <Container width="wide">
        <SectionHeading
          kicker="What we're building"
          title="The work"
          sub="The tools that turn a 30-day story into a funded project. Each of these is production-ready — the campaign page ships with the platform, the print goods ship with the campaign."
          titleSize="lg"
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {MOCKUPS.map((m) => (
            <StoryImage
              key={m.label}
              alt={m.label}
              placeholder
              placeholderLabel={m.label}
              aspectRatio={m.aspectRatio}
              caption={m.note}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
