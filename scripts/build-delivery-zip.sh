#!/usr/bin/env bash
# Build a dated zip of the design-system source for handoff to the platform dev.
#
# Usage:   scripts/build-delivery-zip.sh
# Output:  deliveries/future-ly-design-YYYY-MM-DD.zip
#
# What's included: src/, public/, docs/, scripts/, top-level configs
# (package.json, tsconfig, next.config, postcss, eslint, components.json,
# CLAUDE.md, AGENTS.md, README.md, .gitignore).
#
# What's excluded: node_modules, .next, .git, deliveries, _migrated-from-outer,
# .DS_Store, *.tsbuildinfo, .env*, any OS / editor junk.

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

DATE_STAMP="$(date +%Y-%m-%d)"
STAGING_DIR=".delivery-staging"
OUT_DIR="deliveries"
OUT_NAME="future-ly-design-${DATE_STAMP}.zip"
OUT_PATH="${OUT_DIR}/${OUT_NAME}"

mkdir -p "$OUT_DIR"
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR/future-ly-design"

# rsync with explicit excludes so we never accidentally ship secrets, caches,
# or the migration staging area.
rsync -a \
  --exclude='node_modules/' \
  --exclude='.next/' \
  --exclude='.git/' \
  --exclude='.git.corrupt-backup/' \
  --exclude='deliveries/' \
  --exclude="$STAGING_DIR/" \
  --exclude='_migrated-from-outer/' \
  --exclude='.DS_Store' \
  --exclude='*.tsbuildinfo' \
  --exclude='.env*' \
  --exclude='.turbo/' \
  --exclude='.cache/' \
  --exclude='coverage/' \
  --exclude='test-results/' \
  --exclude='playwright-report/' \
  ./ "$STAGING_DIR/future-ly-design/"

cd "$STAGING_DIR"
rm -f "../${OUT_PATH}"
zip -r -q "../${OUT_PATH}" future-ly-design
cd "$PROJECT_ROOT"

rm -rf "$STAGING_DIR"

SIZE=$(du -h "$OUT_PATH" | awk '{print $1}')
echo "→ $OUT_PATH ($SIZE)"
