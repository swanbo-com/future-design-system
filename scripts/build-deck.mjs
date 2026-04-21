#!/usr/bin/env node
/**
 * build-deck.mjs — export /deck to an editable PDF.
 *
 * Usage:
 *   (dev server must be running on http://localhost:3178)
 *   node scripts/build-deck.mjs
 *   OR
 *   npm run build:deck
 *
 * Output: app/dist/future-ly-pitch-deck.pdf (vector PDF with live text
 * layer — editable in Acrobat Pro, Affinity Publisher, Preview, etc.)
 *
 * How it works:
 *   1. Launches a headless Chromium via Playwright.
 *   2. Opens http://localhost:3178/deck with viewport 1920×1080.
 *   3. Waits for fonts and images to finish loading.
 *   4. Emulates @media print so the deck.css page-break rules fire.
 *   5. Calls page.pdf() with custom size matching a 1920×1080 slide.
 *
 * Source of truth: src/app/deck/page.tsx — edit copy there, re-run, and
 * the PDF updates. The PDF text layer stays editable for last-mile tweaks
 * by non-devs.
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "dist");
const OUT_FILE = join(OUT_DIR, "future-ly-pitch-deck.pdf");
const URL = process.env.DECK_URL ?? "http://localhost:3178/deck";

async function main() {
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log(`→ launching browser`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log(`→ loading ${URL}`);
  try {
    await page.goto(URL, { waitUntil: "networkidle", timeout: 30_000 });
  } catch (err) {
    console.error(`\n  ⚠ Could not reach ${URL}`);
    console.error(`  Is the dev server running? (cd app && PORT=3178 npm run dev)\n`);
    await browser.close();
    throw err;
  }

  // Give fonts a moment to finish swapping in. Blazeface OTFs are ~120 KB
  // each and the deck uses 5+ cuts — networkidle often fires before the
  // last render pass settles.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  console.log(`→ emulating print media`);
  await page.emulateMedia({ media: "print" });

  console.log(`→ rendering PDF → ${OUT_FILE}`);
  await page.pdf({
    path: OUT_FILE,
    width: "1920px",
    height: "1080px",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log(`✓ deck exported (${OUT_FILE})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
