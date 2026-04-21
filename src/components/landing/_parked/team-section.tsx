import { Container } from "@/components/brand/container";
import { SectionHeading } from "@/components/brand/section-heading";
import { Glyph, DINGBATS, HANDS } from "@/components/brand/glyph";
import type { ReactNode } from "react";

/**
 * TeamSection — five-up card grid of the people behind Campaign Zero.
 * Silhouette placeholder SVGs until real headshots land; swap `photoUrl`
 * when ready.
 */

type Person = {
  name: string;
  role: string;
  credit: ReactNode;
  mark: string;
  photoUrl?: string;
};

const TEAM: Person[] = [
  {
    name: "John Asbury",
    role: "Platform · Strategy",
    credit: "Building the platform, writing the thesis, running the business side. Previously in product and agency — now building future.ly full-time.",
    mark: HANDS.writing,
  },
  {
    name: "Bren",
    role: "Content · Siargao lead",
    credit: "Lead photographer. Left a media career to document grassroots communities across SE Asia. Embedded in Siargao with the Pacific Kings since January.",
    mark: DINGBATS.floret,
  },
  {
    name: "Rick",
    role: "Video · Documentary",
    credit: "Videographer and documentary producer. Responsible for the 30-day film that anchors the campaign content unlocks.",
    mark: HANDS.nib,
  },
  {
    name: "Janiece",
    role: "Nonprofit ops · Safeguarding",
    credit: "CIC governance, safeguarding policy, named safeguarding officer. Ensures every child on the platform appears with dignity and written consent.",
    mark: DINGBATS.star12,
  },
  {
    name: "Sam Graham",
    role: "Editorial · Distribution",
    credit: "Senior editor with a direct line to a major documentary-friendly publication. Holding space for a Week 1 feature on the campaign.",
    mark: HANDS.pointRight,
  },
];

function Silhouette({ name }: { name: string }) {
  // Tiny inline SVG silhouette — same vibe for every card until real
  // headshots drop. Uses brand tokens via currentColor.
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-kraft">
      <div
        className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--brand-kraft)_0_10px,#b89a72_10px_20px)]"
        aria-hidden
      />
      <svg
        viewBox="0 0 100 120"
        className="absolute inset-0 h-full w-full text-ink/30"
        role="img"
        aria-label={`${name} — headshot to follow`}
      >
        <circle cx="50" cy="42" r="18" fill="currentColor" />
        <path d="M50 64 Q22 68 16 116 L84 116 Q78 68 50 64 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function TeamSection() {
  return (
    <section id="team" className="border-y border-rule bg-cream py-24 md:py-32">
      <Container width="wide">
        <SectionHeading
          kicker="The team"
          title="Five people making Campaign Zero"
          sub="Documentary on the ground in Siargao, a CIC in the UK, an editor with a direct line to the pitch. Real headshots land with Bren's shoot."
          titleSize="lg"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((person) => (
            <div key={person.name} className="flex flex-col gap-4">
              <Silhouette name={person.name} />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Glyph
                    char={person.mark}
                    size="xs"
                    fontSize={13}
                    color="var(--brand-vermillion)"
                  />
                  <h3
                    className="m-0 text-[18px] leading-tight text-foreground"
                    style={{ fontFamily: "var(--font-display-24)", fontWeight: 900 }}
                  >
                    {person.name}
                  </h3>
                </div>
                <p
                  className="m-0 text-[10px] uppercase tracking-[0.14em] text-vermillion"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {person.role}
                </p>
                <p className="mt-2 m-0 text-[13px] leading-relaxed text-mute">{person.credit}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
