# Expanded question pool: 20-question runs, analogies, expert tier, late penalty

Date: 2026-06-12

## Goal

Grow each run from 15 to 20 questions (still 5 per category), add variety via a new
category, guarantee at least 2 genuinely hard questions per category per run, and
penalize answers slower than 30 seconds.

## Design

### New category: analogies

Fourth category `analogies` with a new puzzle kind `analogy`: `pair: [A, B, C]`
cells shown as `A → B ∷ C → ?`; the answer D completes the relation. Fits the
existing declarative glyph spec and SVG renderer unchanged.

### New difficulty tier: expert

`Difficulty` gains `expert` (4 base points). "Really hard" puzzles live here so the
guarantee is structural, not editorial.

### Pool: 45 → 80

4 categories × 4 difficulties × 5 puzzles. New content: 20 analogies (5 per tier)
and 5 expert puzzles in each existing category (patterns, sequences, spatial).

### Per-run draw: 20 questions

Quota per category: 1 easy / 1 medium / 1 hard / 2 expert, ordered
easy → medium → hard → expert. Every category contributes exactly 2 expert
("really hard") questions per run.

### Scoring: 30-second penalty

- `PENALTY_AFTER_SECONDS = 30`, `LATE_PENALTY = 0.5`. Any answer (right or wrong)
  taking longer than 30s loses 0.5 points. Raw total clamps at ≥ 0.
- Speed bonus rescaled to reach exactly 0 at the 30s mark: with the 35s soft timer,
  bonus = 0.5 · clamp((remaining − 5) / 30, 0, 1). The timer remains soft — it
  never blocks the answer.
- Expert points make the standard run max 56 base + 10 bonus = 66.
- Guessing floor (0.25), curve (1.1), IQ mapping, percentile and titles unchanged.

### UI

- PuzzleView: analogy prompt + `A → B ∷ C → ?` row layout.
- TimerRing: turns red once inside the penalty zone (remaining < 5s).
- Intro: 20 puzzles, four categories, bonus/penalty copy.
- Results: 4-column category breakdown.
- Gallery picks up the new pool automatically.

## Testing

- pool.test: 80 puzzles, 5 per category × difficulty, analogy well-formedness
  (pair of 3, canonically unique options).
- selection.test: 20 unique questions, 1/1/1/2 quotas, easy→expert ordering.
- scoring.test: expert base points, bonus rescale, late penalty (correct, wrong,
  boundary, clamp-at-zero), new max raw 66.

## Alternatives considered

- Keeping 3 tiers and simply authoring harder "hard" puzzles: rejected — the draw
  could then skip them, so "at least 2 really hard per kind" wouldn't be guaranteed.
- Penalty as a multiplier on base points: rejected — a flat −0.5 mirrors the
  existing +0.5 bonus and keeps maxRaw simple.
