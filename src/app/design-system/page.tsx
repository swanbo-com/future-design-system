import { TypographyScale } from "@/components/design-system/typography-scale";
import { ColourSwatches } from "@/components/design-system/colour-swatches";
import { GlyphInventory } from "@/components/design-system/glyph-inventory";
import { Fractions } from "@/components/design-system/fractions";
import { OrnamentKickers } from "@/components/design-system/ornament-kickers";
import { TitleTreatments } from "@/components/design-system/title-treatments";
import { LogoLab } from "@/components/design-system/logo-lab";
import { LockupA, LockupB, LockupC, FaviconSection } from "@/components/design-system/lockups";
import { PrintApplications } from "@/components/design-system/print-applications";
import { SystemMoments, OtherOrnamentsInContext } from "@/components/design-system/system-moments";
import { TitleFlanker } from "@/components/design-system/glyph";

/**
 * future.ly — Design System (React port)
 *
 * Port of design-system/index.html (source of truth) into the Next.js app.
 * Sections are added phase by phase; this is the live reference alongside
 * the HTML prototype.
 */
export default function DesignSystemIndex() {
  return (
    <main className="mx-auto max-w-[1600px] px-12 py-22">
      {/* Page header */}
      <header className="mb-24 border-b border-rule pb-12">
        <h1
          className="mb-4 text-[96px] leading-[0.9] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 900 }}
        >
          PACIFIC KINGS
        </h1>
        <p
          className="mb-6 text-[28px] leading-none text-mute"
          style={{ fontFamily: "var(--font-display-36)", fontStyle: "italic", fontWeight: 900 }}
        >
          a future.ly project
        </p>
        <p className="max-w-[700px] text-[13px] leading-relaxed text-mute">
          Design system exploration — Ohno Blazeface, the full system. Wordmark, lockups,
          applications, and brand moments, all rendered in real Blazeface (Roman + Italic, nine
          optical sizes). React port of <code className="font-mono">design-system/index.html</code>.
        </p>
        <div className="mt-8">
          <TitleFlanker pair="B" flankerSize={24}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">
              Canonical fleuron pair — Pair B
            </span>
          </TitleFlanker>
        </div>
      </header>

      {/* Phase 2 — foundation */}
      <TypographyScale />
      <ColourSwatches />
      <GlyphInventory />

      {/* Phase 3 — typographic patterns */}
      <Fractions />
      <OrnamentKickers />
      <TitleTreatments />

      {/* Phase 4 — lockups + favicon */}
      <LogoLab />
      <LockupA />
      <LockupB />
      <LockupC />
      <FaviconSection />

      {/* Phase 5 — print applications */}
      <PrintApplications />

      {/* Phase 6 — system moments + editorial patterns */}
      <SystemMoments />
      <OtherOrnamentsInContext />

      {/* Footer */}
      <footer className="mt-24 border-t border-rule pt-8 text-[13px] text-mute">
        <p className="m-0 flex items-center gap-2">
          <span
            className="inline-block align-middle leading-none"
            style={{ fontFamily: "var(--font-display-14)", fontSize: 14, color: "var(--brand-ink)" }}
          >
            {"\u2749"}
          </span>
          <strong
            className="text-ink"
            style={{ fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            future.ly
          </strong>
          <span>
            — design system · React port · v0.1 — Ohno Blazeface by OH no Type Co. · Instrument Sans
            by Rodrigo Fuenzalida · JetBrains Mono by JetBrains.
          </span>
        </p>
      </footer>
    </main>
  );
}
