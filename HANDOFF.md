# Migration handoff — run after session

The Claude session that bootstrapped this project ran into two failures near the end:

1. **Git corruption in the old nested `.git`** — many missing blobs/trees. Fresh `git init` + single baseline commit (`chore: initial commit — future.ly design system baseline`). The old `.git` is preserved as `.git.corrupt-backup/` in case you want to dig for anything.
2. **The Bash tool stopped working mid-session.** File edits via Write/Edit kept succeeding, but shell commands (`npm install`, `cp`, `rm`, `git`, even `echo`) all failed. Couldn't finish some steps that need a shell.

Nothing is broken — the code is all here. But a few things still need a real terminal to complete.

## What's ready

- Project at `~/Documents/projects/future-design-system/` with single baseline commit.
- Scoped `CLAUDE.md`, `AGENTS.md`, `README.md` — frontend design system + two landing pages, zip-to-dev delivery model.
- `scripts/build-delivery-zip.sh` — produces `deliveries/future-ly-design-YYYY-MM-DD.zip`.
- `scripts/finish-migration.sh` — the one-shot to run now (see below).
- `.gitignore` extended for migration artefacts + `deliveries/`.
- Platform dev's `~/Documents/projects/future/future-repo/` is clean + synced with `origin/main` — their work is untouched.

## What you need to run

```bash
cd ~/Documents/projects/future-design-system
chmod +x scripts/finish-migration.sh scripts/build-delivery-zip.sh
bash scripts/finish-migration.sh
```

That script:
1. Reinstalls `node_modules` (the partial install from the broken session isn't trustworthy — `tailwindcss` was missing).
2. Copies `DECISIONS.md`, `GLYPHS.md`, and `design-system-reference/` from the platform repo into `docs/` (they were authored as part of this design system; the platform dev had a copy).
3. Hoists the design-scope docs from `_migrated-from-outer/docs/` into `docs/legacy/` (brand-spec, campaign-zero, content-strategy, ux-spec, project-brief). Leaves the platform-scope docs (architecture, data-model, economics, launch-plan, security, testing, dev-spec.pdf) in `_migrated-from-outer/` — gitignored, kept on disk as historical reference only.
4. Clears `.next/` cache (the old cache pointed at the previous path).

Then:

```bash
npm run dev
# open http://localhost:3000/ and http://localhost:3000/pacific-kings
# confirm images, typography, and the highway 5-photo strip all render
```

Then commit + push:

```bash
git add -A
git commit -m 'chore: complete migration — docs, gitignore, delivery script'

# Create the remote — name is whatever you like
gh repo create future-ly-design --private --source=. --push
```

## What's deliberately not here

- Backend, DB, auth, payments, admin, API routes, Docker, deploy infra — all in the platform repo at `swanbo-com/future`.
- `node_modules/` — reinstall after cloning.
- `deliveries/` — regenerate with `scripts/build-delivery-zip.sh` when you're ready to hand off.
- `.env*` — set up per local.

## Rollback

If you decide the migration was a mistake: the platform repo at `~/Documents/projects/future/future-repo/` is intact and synced with `origin/main`. Your design-system work lives here, and the history before extraction is preserved in `.git.corrupt-backup/objects/` (broken but parsable). You can `git checkout` files out of the corrupt repo with `GIT_DIR=.git.corrupt-backup git show <sha>:path` if needed. Once you're satisfied this project is working, you can `rm -rf .git.corrupt-backup` and `rm HANDOFF.md`.
