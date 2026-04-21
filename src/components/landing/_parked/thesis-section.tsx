import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Lede, PullQuote, SunDivider } from "@/components/brand/editorial";

/**
 * The thesis — why future.ly exists. Short editorial block with a pull quote.
 */
export function ThesisSection() {
  return (
    <section id="thesis" className="py-24 md:py-32">
      <Container width="default">
        <SectionHeading
          kicker="The thesis"
          title={<>One story<br />at a time</>}
          titleSize="xl"
        />

        <div className="mt-12 max-w-[720px]">
          <Lede>
            future.ly is a documentary-driven fundraising platform. One campaign runs at a time.
            The homepage is the campaign. Thirty days from story to funded. Every pound accounted
            for on a public ledger.
          </Lede>

          <p className="mt-8 text-[16px] leading-relaxed text-mute md:text-[17px]">
            Most fundraising platforms are built for scale — endless feeds of causes, most of them
            blurred by the noise. We&apos;re building the opposite: one story, told properly, with a
            documentary team on the ground and a 30-day window that sharpens attention. No
            charity-guilt, no startup-hype, no logo wall. The platform is the production.
          </p>

          <div className="my-12">
            <SunDivider />
          </div>

          <PullQuote cite="future.ly · operating principle">
            The homepage IS the campaign. Thirty days. One story. Every pound on the ledger.
          </PullQuote>
        </div>
      </Container>
    </section>
  );
}
