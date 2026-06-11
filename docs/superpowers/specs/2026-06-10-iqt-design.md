# IQT — Fun IQ Test Webapp — Design

**Date:** 2026-06-10
**Host:** https://iqt.moosha.org (DigitalOcean droplet 143.110.208.106, deployed at `/opt/iqt`)
**Status:** Approved

## Purpose

A fun, engaging, visual IQ test. Explicitly **for entertainment only** — not a medical or psychometric instrument; every screen that shows a score carries a disclaimer. Short (~5–8 minutes), replayable, mobile-friendly.

## Product

Single-page Svelte 5 app, fully client-side (no backend, nothing stored server-side). Three screens:

1. **Intro** — Dark Lab framing ("Pattern Cognition Assessment"), what to expect (15 questions, ~6 min), start button, disclaimer.
2. **Test** — 15 puzzles, one at a time. Header shows question number (`Q.07 / 15`), progress bar, and a 35-second neon countdown ring.
3. **Results** — approved mockup: "ANALYSIS COMPLETE", large glowing IQ-style number with "EST. IQ SCORE · FOR ENTERTAINMENT ONLY" label, title badge (e.g. 🧬 Pattern Prodigy), percentile bar, per-category breakdown (Patterns / Sequences / Spatial, n/5 each), Copy Result and Retest buttons.

### Visual style — "Dark Lab"

Dark background (`#0b0f1a` / `#111827` panels), neon cyan accent (`#22d3ee`) with indigo gradient (`#818cf8`), subtle glow shadows, monospace for labels/numbers, small uppercase letter-spaced labels. Sleek "secret research facility" vibe.

## The test

- **3 categories × 5 questions per run:**
  - **Patterns** — 3×3 Raven-style matrix completion (bottom-right cell missing).
  - **Sequences** — sequence completion (what comes next).
  - **Spatial** — mental rotation and odd-one-out.
- All puzzles are language-free, rendered as SVG. 4–6 answer options each, exactly one correct.
- **Pool of 45 hand-authored puzzles**: 15 per category = 5 easy / 5 medium / 5 hard. Each run draws 5 per category (mixing difficulties: per category 1 easy, 2 medium, 2 hard — 15 total: 3 easy, 6 medium, 6 hard) and orders the run easy → hard overall. Random draw makes the test replayable a few times.
- **Puzzles are data, not artwork.** Each puzzle is a declarative spec (grid contents, shape/fill/rotation/count attributes, answer options, correct index) rendered by a small set of reusable SVG components. Authoring a puzzle = writing a spec object.
- **Soft timer:** 35s per question. Visible countdown ring; at zero it stops awarding speed bonus but never blocks answering. Clicking an option locks the answer and advances after a brief transition. No right/wrong reveal during the test.

## Scoring

- **Base points** by difficulty: easy 1, medium 2, hard 3 (max 33 base points per run with the 3/6/6 mix; +7.5 max speed bonus = 40.5 max raw).
- **Speed bonus:** up to +0.5 per correct answer, linear in remaining time (full bonus at instant answer, zero at 0s left).
- Total maps to an **IQ-style number clamped to 70–145** via a guessing floor + power curve: fractions of max raw at or below 25% (≈ chance level on 4–5 options) map to 70; above the floor the corrected fraction is raised to a mild power (1.1) so top scores demand near-perfect runs — `iq = 70 + 75 × ((f − 0.25)/0.75)^1.1`.
- **Percentile** from a normal-distribution lookup (mean 100, SD 15) on the displayed number.
- **Title badges** by band, playful tone (e.g. 130+ "Pattern Prodigy", 115–129 "Logic Llama", 100–114 "Puzzle Pathfinder", below "Curious Cadet" — final names at implementation).
- **Copy Result** writes a fun text snippet to the clipboard (score, title, percentile, URL). No server interaction.

## Architecture

- **Stack:** Vite + Svelte 5 + TypeScript. No router, no backend, no persistence.
- **Pure logic modules** (plain TS, unit-tested with Vitest):
  - `src/lib/puzzles/` — the 45 puzzle specs + spec types.
  - `src/lib/selection.ts` — draw 15 from pool (category/difficulty quotas), order easy→hard, shuffle options deterministically per run.
  - `src/lib/scoring.ts` — points → IQ number, percentile, title band.
- **Svelte components:** `App` (screen state machine: intro → test → results), `Intro`, `Test` (owns run state: current index, answers, timings), `PuzzleView` (SVG renderer for specs), `TimerRing`, `Results`.
- **Testing:** Vitest for selection (quotas, no duplicates, ordering) and scoring (boundaries, clamping, bands); a validation test asserting every pool spec is well-formed (correct index in range, unique options, quota counts present).

## Container & deploy

- **Build locally**, ship static files — the 1-vCPU droplet never runs node:
  - `npm run build` → `dist/`
  - Server gets `dist/`, a minimal `Dockerfile` (`nginx:alpine`, copy `dist/` to web root), and `docker-compose.yml` binding `127.0.0.1:8015:80` (matches host convention; 8015 is free).
- **`deploy.sh`** (run from the repo):
  1. `npm run build`
  2. rsync `dist/`, `Dockerfile`, `docker-compose.yml` to `root@iqt.moosha.org:/opt/iqt/`
  3. `ssh root@... 'cd /opt/iqt && docker compose up -d --build'`
  4. First deploy only: append `iqt.moosha.org` block to `/etc/caddy/Caddyfile` (reverse_proxy localhost:8015, `encode gzip zstd`, the standard security headers used by sibling apps, immutable cache for `/assets/*`) and `systemctl reload caddy`. The script checks for the block's existence before appending.
- DNS `iqt.moosha.org → 143.110.208.106` already exists; Caddy provisions TLS automatically.

## Error handling

- Client-side only; the main failure modes are authoring errors — guarded by the pool validation test at build time.
- Clipboard API failure (http/older browsers): fall back to a selectable text box.
- Refresh mid-test simply restarts (no persistence) — acceptable for a 6-minute fun quiz.

## Repository & documentation

- Code lives in a **private GitHub repo**: `github.com/hriday/iqt`.
- **README.md** (written at the end, once the app is real): stack overview, project layout, local dev instructions, deployment guide (deploy.sh, server layout, Caddy), and **screenshots of the live site** (intro, a question, results) stored in `docs/images/`.

## Out of scope

Leaderboards, shareable result URLs, accounts, analytics, i18n, procedural puzzle generation.
