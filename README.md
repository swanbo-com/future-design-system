# future.ly — design system + landing pages

Frontend for [future.ly](https://future.ly). Parent homepage + Pacific Kings campaign page + the design system that powers them. **This repo is a design-system source; it is not deployed.** The platform developer receives a zip from `scripts/build-delivery-zip.sh` and integrates it into the platform repo.

## Develop

```bash
npm install
npm run dev
```

Dev server: `http://localhost:3000`. Key pages:

- `/` — parent homepage
- `/pacific-kings` — Campaign Zero pitch
- `/design-system` — live design-system reference
- `/deck` — pitch deck

## Build

```bash
npm run build    # production build
npx tsc --noEmit # typecheck
npm run lint
```

## Ship to the dev

```bash
scripts/build-delivery-zip.sh
```

Produces `deliveries/future-ly-design-YYYY-MM-DD.zip` containing the source the platform dev needs to integrate. `deliveries/` is gitignored.

## What's here

- `src/app/` — Next.js App Router pages
- `src/components/` — `ui/` (shadcn), `brand/` (wordmark, glyphs, flankers), `design-system/`, `landing/`
- `src/lib/` — brand constants, utilities
- `public/brand/pacific-kings/` — brand assets (SVG + favicon set + `_build/` scripts)
- `public/fonts/` — self-hosted Blazeface, Instrument Sans, JetBrains Mono
- `public/images/pitch/` — Tigasao documentary imagery
- `docs/` — brand spec, glyph table, decisions log, design-system reference (archived HTML)

## Conventions

See `CLAUDE.md` for scope, voice, palette, typography, and file-layout rules. Highlights:

- Max 200 lines per file, one component per file
- Path alias `@/` → `./src/`
- No stock photography — every image is from the real project
- Voice: documentary filmmaker. Never say "donate", "help these people", "revolutionary"
- Pair B (`U+E002/E003`) is the canonical hero title-flanker (Pair A demoted to editorial in v1.0c)

## License

Private. © future.ly CIC (UK CIC pending).
