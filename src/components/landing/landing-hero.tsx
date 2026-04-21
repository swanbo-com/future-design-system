"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import { buttonVariants } from "@/components/ui/button";
import { Grain } from "@/components/brand/grain";
import { CountdownPill } from "@/components/brand/countdown-pill";
import { ARROWS, Glyph } from "@/components/brand/glyph";
import { LiquidTitle } from "@/components/brand/liquid-title";
import { cn } from "@/lib/utils";

/**
 * Landing hero — photo-masthead composition.
 *
 *   [FULL-BLEED PHOTO at natural 2:3 aspect, max-width 1440px centered]
 *     ├── dark gradient at top for text readability
 *     ├── typography overlaid at top:
 *     │     ├── PACIFIC KINGS (LiquidTitle — sine-wave letter bob) flanked by Pair D
 *     │     └── "a future.ly project" italic sub
 *     ├── CountdownPill floats top-right
 *     └── location caption bottom-right
 *   [CREAM LEDE BAND below the photo]
 *     ├── 3-line lede ("Thirty days. / One story. / Every receipt on the table.")
 *     └── dual CTA
 *
 * No black strip — typography sits directly over the photograph.
 * Source image is 1024×1536, so `max-w-[1440px]` caps upscaling at 140%
 * which the grain overlay then softens.
 */

export function LandingHero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mq = gsap.matchMedia();

      mq.add("(prefers-reduced-motion: no-preference)", () => {
        const masthead = gsap.timeline({ defaults: { ease: "power3.out" } });
        masthead
          .from(".hero-flanker-l, .hero-flanker-r", {
            opacity: 0,
            scale: 0.6,
            duration: 0.9,
            stagger: 0.1,
          })
          .from(".hero-sub", { y: 14, opacity: 0, duration: 0.6 }, "-=0.2")
          .from(".hero-caption", { opacity: 0, y: 10, duration: 0.6 }, "-=0.4")
          .from(".hero-scrollcue", { opacity: 0, y: -8, duration: 0.5 }, "-=0.2");

        const ledeTl = gsap.timeline({
          scrollTrigger: { trigger: ".hero-lede-band", start: "top 80%", once: true },
          defaults: { ease: "power3.out" },
        });
        ledeTl
          .from(".hero-lede > *", { y: 32, opacity: 0, duration: 0.7, stagger: 0.1 })
          .from(".hero-cta > *", { y: 16, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

        return () => {
          masthead.kill();
          ledeTl.kill();
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });

      mq.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-flanker-l",
            ".hero-flanker-r",
            ".hero-sub",
            ".hero-caption",
            ".hero-scrollcue",
            ".hero-lede > *",
            ".hero-cta > *",
          ],
          { clearProps: "all" },
        );
      });

      return () => mq.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="relative bg-cream">
      {/* ============================================ */}
      {/* PHOTO + OVERLAID MASTHEAD                    */}
      {/* ============================================ */}
      <div className="relative w-full bg-cream">
        {/* Photo container — width-capped to the source resolution comfort zone */}
        <div className="relative mx-auto w-full overflow-hidden" style={{ maxWidth: 1440 }}>
          <div className="relative w-full" style={{ aspectRatio: "2 / 3" }}>
            <Image
              src="/images/hero-pacific-kings.png"
              alt="A Siargao skate kid holds a handmade coconut-wood skateboard up to the sky on a palm-lined road at golden hour"
              fill
              priority
              quality={95}
              sizes="(min-width: 1440px) 1440px, 100vw"
              className="object-cover object-center"
            />

            {/* Grain overlay — softens upscaling, adds film texture */}
            <Grain opacity={0.16} />

            {/* Dark gradient at top for typography contrast */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-[55%]"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(15,15,15,0.82) 0%, rgba(15,15,15,0.55) 35%, rgba(15,15,15,0.15) 70%, transparent 100%)",
              }}
            />

            {/* Subtle dark gradient at bottom for the caption pill readability */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%]"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,15,15,0.55), transparent)",
              }}
            />

            {/* Countdown pill — pushed below the fixed nav on mobile so it
                doesn't collide. md+ drops back to the intended hero corner. */}
            <div className="pointer-events-auto absolute top-20 right-4 z-20 md:top-10 md:right-10">
              <CountdownPill variant="light" />
            </div>

            {/* ============================================ */}
            {/* MASTHEAD OVERLAY                             */}
            {/* ============================================ */}
            <div className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-28 text-center md:pt-36 lg:pt-40">
              {/* Wordmark row: flanker + PACIFIC KINGS + flanker */}
              <div className="flex items-center justify-center gap-4 md:gap-8">
                <span
                  className="hero-flanker-l leading-none text-cream"
                  style={{
                    fontFamily: "var(--font-display-48)",
                    fontSize: "clamp(22px, 5vw, 80px)",
                    fontWeight: 900,
                  }}
                >
                  {"\uE006"}
                </span>

                <LiquidTitle
                  text="PACIFIC KINGS"
                  className="text-cream drop-shadow-[0_4px_36px_rgba(0,0,0,0.55)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 8.5vw, 148px)",
                    lineHeight: 0.88,
                    letterSpacing: "-0.005em",
                    whiteSpace: "nowrap",
                  }}
                />

                <span
                  className="hero-flanker-r leading-none text-cream"
                  style={{
                    fontFamily: "var(--font-display-48)",
                    fontSize: "clamp(22px, 5vw, 80px)",
                    fontWeight: 900,
                  }}
                >
                  {"\uE007"}
                </span>
              </div>

              {/* Italic sub */}
              <p
                className="hero-sub mt-4 text-cream/90 md:mt-6"
                style={{
                  fontFamily: "var(--font-display-36)",
                  fontStyle: "italic",
                  fontWeight: 900,
                  fontSize: "clamp(20px, 2.4vw, 38px)",
                  letterSpacing: "0.005em",
                }}
              >
                a future.ly project
              </p>
            </div>

            {/* Location caption — bottom right of photo */}
            <div
              className="hero-caption absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-ink/75 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-cream backdrop-blur-sm md:bottom-8 md:right-10"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-vermillion" />
              Siargao · Philippines · 2026
            </div>

            {/* Scroll cue — bottom centre of photo */}
            <div
              className="hero-scrollcue pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-cream/80"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.28em]">Scroll</span>
                <div className="h-8 w-px bg-cream/60" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* CREAM LEDE BAND                              */}
      {/* ============================================ */}
      <div className="hero-lede-band relative bg-cream px-6 py-24 text-center md:py-32">
        <div className="relative mx-auto max-w-[900px]">
          <div
            className="hero-lede flex flex-col gap-1 text-ink"
            style={{ fontFamily: "var(--font-display-36)", fontWeight: 900 }}
          >
            <span className="text-[40px] leading-[1.02] md:text-[68px]">Thirty days.</span>
            <span className="text-[40px] leading-[1.02] md:text-[68px]">One story.</span>
            <span className="text-[40px] leading-[1.02] md:text-[68px]">
              Every receipt on the table.
            </span>
          </div>

          <div className="hero-cta mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-16">
            <Link
              href="#sponsor-tiers"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[220px] h-12 gap-2.5 text-[15px] no-underline",
              )}
            >
              Become a sponsor
              <Glyph
                char={ARROWS.cta}
                size="sm"
                fontSize={18}
                className="translate-y-[1px]"
                aria-hidden
              />
            </Link>
            <Link
              href="#waitlist"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-w-[220px] h-12 text-[15px] no-underline",
              )}
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
