import { Container } from "@/components/brand/container";
import { Glyph, HANDS } from "@/components/brand/glyph";

/**
 * Founder letter — "Note from John" pattern.
 * Uses the ✍ writing-hand glyph to establish editorial voice.
 */
export function FounderLetter() {
  return (
    <section id="founder" className="py-24 md:py-32">
      <Container width="prose">
        <div className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-vermillion">
          <Glyph char={HANDS.writing} size="sm" fontSize={18} />
          <span>A note from the founder</span>
        </div>

        <div
          className="text-[18px] italic leading-[1.5] text-foreground md:text-[22px]"
          style={{ fontFamily: "var(--font-display-18)", fontWeight: 900 }}
        >
          <p className="m-0">
            I spent a month in Siargao last year. I watched kids build skateboards out of whatever
            the island gave them — coconut wood, borrowed wheels, scraps from the building site
            next to the beach. Then I watched them ride them. And I thought: every fundraising
            platform I&apos;ve ever seen is built for scale. Endless feeds of causes, most of them
            blurred by the noise.
          </p>
          <p className="mt-6">
            What if just one story got all the attention? What if the platform made that story
            beautiful, made the transparency real, and turned a 30-day window into the whole point?
            That&apos;s future.ly. Campaign Zero is Pacific Kings. We launch 30 April.
          </p>
        </div>

        <div
          className="mt-10 flex items-center gap-3 text-[14px] text-mute"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "-0.01em" }}
        >
          <span className="text-[7px] leading-none text-ink">■</span>
          <span>John Asbury · founder · future.ly</span>
        </div>
      </Container>
    </section>
  );
}
