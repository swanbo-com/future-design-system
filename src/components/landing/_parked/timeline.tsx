import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS } from "@/components/brand/glyph";

/**
 * Timeline — vertical milestone strip.
 * Each event gets a floret mark, a mono date, a title, a short note.
 * The "now" event is highlighted in vermillion; future events in mute.
 */

type Event = {
  date: string;
  title: string;
  note: string;
  state: "now" | "soon" | "launch" | "future";
};

const EVENTS: Event[] = [
  {
    date: "15 April 2026",
    title: "Now — pre-launch",
    note: "Sponsor outreach, press kit, final photography from Siargao. This page is where we are today.",
    state: "now",
  },
  {
    date: "15 April 2026",
    title: "Waitlist opens",
    note: "Public waitlist, trailer drops, press kit goes live. Sponsors locked in by this date get named in the film credits.",
    state: "soon",
  },
  {
    date: "30 April 2026",
    title: "Campaign Zero goes live",
    note: "Pacific Kings launches at future.ly. 30-day countdown starts. The homepage becomes the campaign.",
    state: "launch",
  },
  {
    date: "30 May 2026",
    title: "Day 30 · funded",
    note: "Campaign closes. Final ledger published. Fulfilment planning begins. Documentary cut-down for sponsors ships.",
    state: "future",
  },
  {
    date: "15 June 2026",
    title: "Fulfilment begins",
    note: "Merch ships from Siargao for delivery worldwide. Kraft mailers, A3 prints, tees — the tangible exchanges backers chose.",
    state: "future",
  },
  {
    date: "September 2026",
    title: "Campaign Two",
    note: "Announcement of the second campaign. Founding sponsors from Campaign Zero get first access.",
    state: "future",
  },
];

function EventRow({ event }: { event: Event }) {
  const isNow = event.state === "now";
  const isLaunch = event.state === "launch";
  return (
    <div className="relative flex gap-6 pb-12 last:pb-0">
      {/* Vertical rule */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className={
            isNow
              ? "flex h-8 w-8 items-center justify-center rounded-full bg-vermillion text-[#FAFAF9]"
              : isLaunch
                ? "flex h-8 w-8 items-center justify-center rounded-full border-2 border-vermillion bg-background text-vermillion"
                : "flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-background text-mute"
          }
        >
          <Glyph char={DINGBATS.floret} size="xs" fontSize={14} />
        </div>
        <div className="mt-2 w-px flex-1 bg-rule last:hidden" />
      </div>

      {/* Content */}
      <div className="flex-1 pb-2">
        <p
          className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {event.date}
        </p>
        <h3
          className="m-0 text-[22px] leading-tight text-foreground md:text-[26px]"
          style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
        >
          {event.title}
        </h3>
        <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-mute">{event.note}</p>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section id="timeline" className="border-y border-rule bg-surface py-24 md:py-32">
      <Container width="default">
        <SectionHeading
          kicker="Timeline"
          title="The next sixty days"
          sub="From now through Campaign Zero and into fulfilment. Sponsors locked in before launch get the first writer's credit."
          titleSize="lg"
        />

        <div className="mt-16">
          {EVENTS.map((e) => (
            <EventRow key={e.title} event={e} />
          ))}
        </div>
      </Container>
    </section>
  );
}
