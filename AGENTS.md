<!-- BEGIN:project-scope -->
# future.ly design-system repo

This repo is scoped to the **frontend design system + two landing pages** (`/` and `/pacific-kings`). Delivered to the platform developer as a zip. See `CLAUDE.md` for the full scope and conventions.

No backend, no auth, no database, no admin, no payment code. If a task description sounds like platform work, it belongs in the other repo — stop and flag it.
<!-- END:project-scope -->

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version (Next.js 16) has breaking changes — APIs, conventions, and file structure may differ from training data. Before writing Next-specific code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tailwind-v4-gotchas -->
# Tailwind v4 gotchas

- Arbitrary utilities like `aspect-[16/9]`, `md:grid-cols-5`, etc., do not always compile. Prefer inline `style={{ aspectRatio: "16/9" }}` and explicit CSS rules in `src/app/globals.css`.
- `next/image` is `loading="lazy"` by default. Fullpage screenshots may show below-the-fold images as black rectangles until scrolled into view — not a bug.
<!-- END:tailwind-v4-gotchas -->
