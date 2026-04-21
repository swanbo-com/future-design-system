/**
 * Back-compat re-export. `Glyph`, `Flanker`, `TitleFlanker`, and the glyph
 * constants now live in `@/components/brand/glyph`. This shim exists so the
 * existing design-system section files keep importing from their old path
 * without breakage. New code should import from `@/components/brand/glyph`.
 */
export * from "@/components/brand/glyph";
export type { FleuronPair } from "@/components/brand/glyph";
