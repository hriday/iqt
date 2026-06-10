import type { Puzzle, Cell, Glyph, Shape } from '../types'

const g = (shape: Shape, rest: Partial<Glyph> = {}): Cell => [{ shape, ...rest }]

export const SEQUENCES: Puzzle[] = [
  // ── seq-e1 ───────────────────────────────────────────────────────────────
  // Rule: arrow rotating +45° per step: 0, 45, 90, 135 → next = 180.
  {
    kind: 'sequence',
    id: 'seq-e1',
    category: 'sequences',
    difficulty: 'easy',
    sequence: [
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 45 }),
      g('arrow', { rotation: 90 }), g('arrow', { rotation: 135 }),
    ],
    options: [
      g('arrow', { rotation: 180 }),    // correct
      g('arrow', { rotation: 225 }),    // one step too far
      g('arrow', { rotation: 135 }),    // one step back (copy of shown cell)
      g('triangle', { rotation: 180 }), // wrong-shape twin, right rotation
    ],
    correct: 0,
  },

  // ── seq-e2 ───────────────────────────────────────────────────────────────
  // Rule: dot count grows +1 per step: 1, 2, 3, 4 → next = 5.
  {
    kind: 'sequence',
    id: 'seq-e2',
    category: 'sequences',
    difficulty: 'easy',
    sequence: [
      g('dot', { count: 1 }), g('dot', { count: 2 }),
      g('dot', { count: 3 }), g('dot', { count: 4 }),
    ],
    options: [
      g('dot', { count: 5 }), // correct
      g('dot', { count: 6 }), // one step too far
      g('dot', { count: 4 }), // one step back (copy of shown cell)
      g('dot', { count: 3 }), // copy of another shown cell
    ],
    correct: 0,
  },

  // ── seq-e3 ───────────────────────────────────────────────────────────────
  // Rule: shape alternates circle/square, all solid: c, s, c, s → next = circle.
  {
    kind: 'sequence',
    id: 'seq-e3',
    category: 'sequences',
    difficulty: 'easy',
    sequence: [
      g('circle', { fill: 'solid' }), g('square', { fill: 'solid' }),
      g('circle', { fill: 'solid' }), g('square', { fill: 'solid' }),
    ],
    options: [
      g('circle', { fill: 'solid' }),   // correct
      g('square', { fill: 'solid' }),   // one step too far (repeats last shown cell)
      g('circle', { fill: 'outline' }), // right shape, wrong-fill twin
      g('triangle', { fill: 'solid' }), // wrong shape entirely
    ],
    correct: 0,
  },

  // ── seq-e4 ───────────────────────────────────────────────────────────────
  // Rule: star shrinks −0.15 per step: scale 1.0, 0.85, 0.7, 0.55 → next = 0.4.
  {
    kind: 'sequence',
    id: 'seq-e4',
    category: 'sequences',
    difficulty: 'easy',
    sequence: [
      g('star', { scale: 1 }), g('star', { scale: 0.85 }),
      g('star', { scale: 0.7 }), g('star', { scale: 0.55 }),
    ],
    options: [
      g('star', { scale: 0.4 }),                  // correct
      g('star', { scale: 0.25 }),                 // one step too far
      g('star', { scale: 0.55 }),                 // one step back (copy of shown cell)
      g('star', { fill: 'outline', scale: 0.4 }), // right size, wrong-fill twin
    ],
    correct: 0,
  },

  // ── seq-e5 ───────────────────────────────────────────────────────────────
  // Rule: square fill cycles solid → outline → hatch: solid, outline, hatch,
  // solid → next = outline.
  {
    kind: 'sequence',
    id: 'seq-e5',
    category: 'sequences',
    difficulty: 'easy',
    sequence: [
      g('square', { fill: 'solid' }), g('square', { fill: 'outline' }),
      g('square', { fill: 'hatch' }), g('square', { fill: 'solid' }),
    ],
    options: [
      g('square', { fill: 'outline' }), // correct
      g('square', { fill: 'hatch' }),   // one step too far
      g('square', { fill: 'solid' }),   // one step back (copy of shown cell)
      g('circle', { fill: 'outline' }), // right fill, wrong-shape twin
    ],
    correct: 0,
  },

  // ── seq-m1 ───────────────────────────────────────────────────────────────
  // Rule (adjusted from spec): triangle rotates +90° per step AND fill toggles
  // solid/outline. The spec's +120°/step is a near-symmetry of the triangle
  // (cells would look almost identical), so the increment was changed to 90°
  // and the sequence trimmed to 3 cells. Shown: (0,solid), (90,outline),
  // (180,solid) → next = triangle rotation 270, outline.
  {
    kind: 'sequence',
    id: 'seq-m1',
    category: 'sequences',
    difficulty: 'medium',
    sequence: [
      g('triangle', { rotation: 0, fill: 'solid' }),
      g('triangle', { rotation: 90, fill: 'outline' }),
      g('triangle', { rotation: 180, fill: 'solid' }),
    ],
    options: [
      g('triangle', { rotation: 270, fill: 'outline' }), // correct
      g('triangle', { rotation: 270, fill: 'solid' }),   // right rotation, wrong-fill twin
      g('triangle', { rotation: 0, fill: 'solid' }),     // one step too far (360≡0; copy of shown cell)
      g('triangle', { rotation: 180, fill: 'outline' }), // rotation one step back, fill toggled
    ],
    correct: 0,
  },

  // ── seq-m2 ───────────────────────────────────────────────────────────────
  // Rule: dot count = odd numbers (+2 per step): 1, 3, 5, 7 → next = 9.
  {
    kind: 'sequence',
    id: 'seq-m2',
    category: 'sequences',
    difficulty: 'medium',
    sequence: [
      g('dot', { count: 1 }), g('dot', { count: 3 }),
      g('dot', { count: 5 }), g('dot', { count: 7 }),
    ],
    options: [
      g('dot', { count: 9 }), // correct
      g('dot', { count: 8 }), // off by one (+1 instead of +2)
      g('dot', { count: 7 }), // one step back (copy of shown cell)
      g('dot', { count: 6 }), // wrong count
    ],
    correct: 0,
  },

  // ── seq-m3 ───────────────────────────────────────────────────────────────
  // Rule (adjusted from spec): the two layered glyphs gradually swap sizes —
  // outline square shrinks −0.15/step while hatched circle grows +0.15/step:
  // (sq 1.0, ci 0.4), (0.85, 0.55), (0.7, 0.7), (0.55, 0.85) → next =
  // (sq 0.4, ci 1.0), the exact size-swap of cell 1. (The spec's strict A/B
  // alternation has period 2, so any continuation would duplicate a shown
  // cell; the gradual crossing keeps the "swap sizes" spirit with a unique
  // answer. Circle is hatched so neither glyph ever occludes the other.)
  {
    kind: 'sequence',
    id: 'seq-m3',
    category: 'sequences',
    difficulty: 'medium',
    sequence: [
      [{ shape: 'square', fill: 'outline', scale: 1 }, { shape: 'circle', fill: 'hatch', scale: 0.4 }],
      [{ shape: 'square', fill: 'outline', scale: 0.85 }, { shape: 'circle', fill: 'hatch', scale: 0.55 }],
      [{ shape: 'square', fill: 'outline', scale: 0.7 }, { shape: 'circle', fill: 'hatch', scale: 0.7 }],
      [{ shape: 'square', fill: 'outline', scale: 0.55 }, { shape: 'circle', fill: 'hatch', scale: 0.85 }],
    ],
    options: [
      [{ shape: 'square', fill: 'outline', scale: 0.4 }, { shape: 'circle', fill: 'hatch', scale: 1 }],     // correct
      [{ shape: 'square', fill: 'outline', scale: 0.55 }, { shape: 'circle', fill: 'hatch', scale: 0.85 }], // one step back (copy of shown cell)
      [{ shape: 'square', fill: 'outline', scale: 1 }, { shape: 'circle', fill: 'hatch', scale: 0.4 }],     // sequence restarted (copy of shown cell)
      [{ shape: 'square', fill: 'outline', scale: 0.4 }, { shape: 'circle', fill: 'outline', scale: 1 }],   // right sizes, wrong-fill twin
    ],
    correct: 0,
  },

  // ── seq-m4 ───────────────────────────────────────────────────────────────
  // Rule: shape cycles arrow → L → flag while rotation advances +90° per step:
  // arrow 0, L 90, flag 180, arrow 270 → next = L 360 ≡ 0. All three shapes
  // are rotation-asymmetric, so the +90° rule is visible on every shown cell
  // (the earlier cross/star/hexagon design hid it: cross is 90°-symmetric and
  // hexagon 180°-symmetric).
  {
    kind: 'sequence',
    id: 'seq-m4',
    category: 'sequences',
    difficulty: 'medium',
    sequence: [
      g('arrow', { rotation: 0 }), g('L', { rotation: 90 }),
      g('flag', { rotation: 180 }), g('arrow', { rotation: 270 }),
    ],
    options: [
      g('L', { rotation: 0 }),               // correct (360 ≡ 0)
      g('L', { rotation: 90 }),              // right shape, wrong-rotation twin (copy of shown cell)
      g('L', { rotation: 0, mirror: true }), // right shape & rotation, mirrored
      g('flag', { rotation: 0 }),            // wrong shape in cycle, right rotation
    ],
    correct: 0,
  },

  // ── seq-m5 ───────────────────────────────────────────────────────────────
  // Rule: dot count descends −2 per step: 9, 7, 5, 3 → next = 1.
  {
    kind: 'sequence',
    id: 'seq-m5',
    category: 'sequences',
    difficulty: 'medium',
    sequence: [
      g('dot', { count: 9 }), g('dot', { count: 7 }),
      g('dot', { count: 5 }), g('dot', { count: 3 }),
    ],
    options: [
      g('dot', { count: 1 }), // correct
      g('dot', { count: 2 }), // off by one (−1 instead of −2)
      g('dot', { count: 3 }), // one step back (copy of shown cell)
      g('dot', { count: 5 }), // copy of another shown cell
    ],
    correct: 0,
  },

  // ── seq-h1 ───────────────────────────────────────────────────────────────
  // Rule: Fibonacci dot counts (each = sum of previous two): 1, 1, 2, 3 →
  // next = 5.
  {
    kind: 'sequence',
    id: 'seq-h1',
    category: 'sequences',
    difficulty: 'hard',
    sequence: [
      g('dot', { count: 1 }), g('dot', { count: 1 }),
      g('dot', { count: 2 }), g('dot', { count: 3 }),
    ],
    options: [
      g('dot', { count: 5 }), // correct
      g('dot', { count: 8 }), // one Fibonacci step too far
      g('dot', { count: 4 }), // plausible +1 counting twin
      g('dot', { count: 3 }), // one step back (copy of shown cell)
    ],
    correct: 0,
  },

  // ── seq-h2 ───────────────────────────────────────────────────────────────
  // Rule: arrow rotation with growing increments +30, +60, +90, then +120:
  // 0, 30, 90, 180 → next = 180 + 120 = 300.
  {
    kind: 'sequence',
    id: 'seq-h2',
    category: 'sequences',
    difficulty: 'hard',
    sequence: [
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 30 }),
      g('arrow', { rotation: 90 }), g('arrow', { rotation: 180 }),
    ],
    options: [
      g('arrow', { rotation: 300 }), // correct
      g('arrow', { rotation: 270 }), // assumes constant +90
      g('arrow', { rotation: 330 }), // overshoot twin
      g('arrow', { rotation: 180 }), // one step back (copy of shown cell)
    ],
    correct: 0,
  },

  // ── seq-h3 ───────────────────────────────────────────────────────────────
  // Rule: outer pentagon outline shrinks −0.15/step (0.9, 0.75, 0.6, 0.45)
  // while inner dot count grows +1/step (1, 2, 3, 4); dots stay at scale 0.25
  // (small enough that even the 5-dot layout's corner dots stay inside the
  // pentagon at its smallest scale 0.3). Next = [pentagon outline 0.3, 5 dots].
  {
    kind: 'sequence',
    id: 'seq-h3',
    category: 'sequences',
    difficulty: 'hard',
    sequence: [
      [{ shape: 'pentagon', fill: 'outline', scale: 0.9 }, { shape: 'dot', count: 1, scale: 0.25 }],
      [{ shape: 'pentagon', fill: 'outline', scale: 0.75 }, { shape: 'dot', count: 2, scale: 0.25 }],
      [{ shape: 'pentagon', fill: 'outline', scale: 0.6 }, { shape: 'dot', count: 3, scale: 0.25 }],
      [{ shape: 'pentagon', fill: 'outline', scale: 0.45 }, { shape: 'dot', count: 4, scale: 0.25 }],
    ],
    options: [
      [{ shape: 'pentagon', fill: 'outline', scale: 0.3 }, { shape: 'dot', count: 5, scale: 0.25 }],  // correct
      [{ shape: 'pentagon', fill: 'outline', scale: 0.3 }, { shape: 'dot', count: 4, scale: 0.25 }],  // pentagon right, dots one step back
      [{ shape: 'pentagon', fill: 'outline', scale: 0.45 }, { shape: 'dot', count: 5, scale: 0.25 }], // dots right, pentagon one step back
      [{ shape: 'pentagon', fill: 'outline', scale: 0.45 }, { shape: 'dot', count: 4, scale: 0.25 }], // both one step back (copy of shown cell)
    ],
    correct: 0,
  },

  // ── seq-h4 ───────────────────────────────────────────────────────────────
  // Rule: two interleaved sequences — odd positions: arrow rotating +90°
  // (0, 90, …); even positions: dots +2 (2, 4, …). Shown: arrow 0, 2 dots,
  // arrow 90, 4 dots → next (position 5, odd) = arrow 180.
  {
    kind: 'sequence',
    id: 'seq-h4',
    category: 'sequences',
    difficulty: 'hard',
    sequence: [
      g('arrow', { rotation: 0 }), g('dot', { count: 2 }),
      g('arrow', { rotation: 90 }), g('dot', { count: 4 }),
    ],
    options: [
      g('arrow', { rotation: 180 }), // correct
      g('dot', { count: 6 }),        // continues the wrong (dot) subsequence
      g('arrow', { rotation: 270 }), // right subsequence, one step too far
      g('arrow', { rotation: 90 }),  // one step back (copy of shown cell)
    ],
    correct: 0,
  },

  // ── seq-h5 ───────────────────────────────────────────────────────────────
  // Rule: polygon side count grows triangle(3) → square(4) → pentagon(5) →
  // hexagon(6) while fill cycles solid → outline → hatch → solid.
  // Shown: triangle solid, square outline, pentagon hatch → next =
  // hexagon solid.
  {
    kind: 'sequence',
    id: 'seq-h5',
    category: 'sequences',
    difficulty: 'hard',
    sequence: [
      g('triangle', { fill: 'solid' }),
      g('square', { fill: 'outline' }),
      g('pentagon', { fill: 'hatch' }),
    ],
    options: [
      g('hexagon', { fill: 'solid' }),   // correct
      g('hexagon', { fill: 'outline' }), // right shape, fill cycle off by one
      g('hexagon', { fill: 'hatch' }),   // right shape, fill copied from previous cell
      g('pentagon', { fill: 'solid' }),  // shape one step back, right fill
    ],
    correct: 0,
  },
]
