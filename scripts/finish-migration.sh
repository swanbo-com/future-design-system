#!/usr/bin/env bash
# One-shot completion script for the Phase 1–4 design-system extraction.
#
# Run ONCE after the Claude-Code session that bootstrapped the project.
# Safe to re-run — each step is idempotent.
#
# What this does:
#   1. Reinstall node_modules (session's Bash tool broke mid-work).
#   2. Copy design-system docs from the old platform repo into docs/.
#   3. Hoist usable docs out of _migrated-from-outer/ into docs/legacy/.
#   4. Add _migrated-from-outer/ + deliveries/ + .git.corrupt-backup/ to .gitignore.
#   5. Start dev server for a smoke test.
#
# Usage:  bash scripts/finish-migration.sh

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLATFORM_REPO="$HOME/Documents/projects/future/future-repo"
cd "$PROJECT_ROOT"

say() { printf "\n→ %s\n" "$*"; }

say "Step 1 — node_modules"
if [ ! -d node_modules/next ]; then
  rm -f package-lock.json
  npm install
else
  echo "already installed, skipping"
fi

say "Step 2 — copy design-system docs from platform repo"
mkdir -p docs
for f in DECISIONS.md GLYPHS.md; do
  if [ -f "$PLATFORM_REPO/docs/$f" ] && [ ! -f "docs/$f" ]; then
    cp "$PLATFORM_REPO/docs/$f" "docs/$f"
    echo "  + docs/$f"
  fi
done
if [ -d "$PLATFORM_REPO/docs/design-system-reference" ] && [ ! -d "docs/design-system-reference" ]; then
  cp -R "$PLATFORM_REPO/docs/design-system-reference" "docs/design-system-reference"
  echo "  + docs/design-system-reference/ (archived HTML + fonts)"
fi

say "Step 3 — hoist usable docs from _migrated-from-outer/"
if [ -d _migrated-from-outer/docs ]; then
  mkdir -p docs/legacy
  # Keep these — design-scope, still useful reference
  for f in brand-spec.md campaign-zero.md campaign-zero-sprint-plan.md content-strategy.md ux-spec.md project-brief.md; do
    if [ -f "_migrated-from-outer/docs/$f" ] && [ ! -f "docs/legacy/$f" ]; then
      mv "_migrated-from-outer/docs/$f" "docs/legacy/$f"
      echo "  + docs/legacy/$f"
    fi
  done
  # The rest (architecture, data-model, economics, launch-plan, security, testing, dev-spec.pdf)
  # are out-of-scope platform docs — leave in _migrated-from-outer/ as historical reference.
fi

say "Step 4 — .gitignore for migration + build artefacts"
for entry in '_migrated-from-outer/' 'deliveries/' '.git.corrupt-backup/' '.delivery-staging/'; do
  if ! grep -qxF "$entry" .gitignore 2>/dev/null; then
    printf "\n# migration artefacts\n%s\n" "$entry" >> .gitignore
    echo "  + .gitignore: $entry"
  fi
done

say "Step 5 — dev server smoke test"
# Kill any stale dev server on :3000 from the previous session
if lsof -ti :3000 >/dev/null 2>&1; then
  lsof -ti :3000 | xargs kill -9 2>/dev/null || true
  sleep 1
fi
# Clear any stale Next cache pointing at the old path
rm -rf .next

echo ""
echo "Migration housekeeping complete."
echo ""
echo "Next:"
echo "  1. npm run dev"
echo "  2. Open http://localhost:3000/ and http://localhost:3000/pacific-kings"
echo "  3. git add -A && git commit -m 'chore: complete migration — docs, gitignore, scripts'"
echo "  4. (When ready) gh repo create future-ly-design --private --source=. --push"
