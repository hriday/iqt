import type { Puzzle, Cell, Glyph, Shape } from '../types'

const g = (shape: Shape, rest: Partial<Glyph> = {}): Cell => [{ shape, ...rest }]

// Analogy puzzles: pair = [A, B, C], shown as A → B ∷ C → ?. The relation that
// turns A into B must be applied to C. Distractors are: C unchanged, the
// relation half-applied, the relation misread, or a copy of B.

export const ANALOGIES: Puzzle[] = [
  // ── ana-e1 ───────────────────────────────────────────────────────────────
  // Relation: shrink to half size. circle 1.0 → circle 0.5 ∷ square 1.0 → ?
  {
    kind: 'analogy',
    id: 'ana-e1',
    category: 'analogies',
    difficulty: 'easy',
    pair: [g('circle'), g('circle', { scale: 0.5 }), g('square')],
    options: [
      g('square', { scale: 0.5 }),  // correct
      g('square'),                  // C unchanged
      g('square', { scale: 0.75 }), // shrunk too little
      g('circle', { scale: 0.5 }),  // copy of B
    ],
    correct: 0,
  },

  // ── ana-e2 ───────────────────────────────────────────────────────────────
  // Relation: solid → outline. triangle solid → triangle outline ∷ star solid → ?
  {
    kind: 'analogy',
    id: 'ana-e2',
    category: 'analogies',
    difficulty: 'easy',
    pair: [g('triangle'), g('triangle', { fill: 'outline' }), g('star')],
    options: [
      g('star', { fill: 'outline' }),     // correct
      g('star'),                          // C unchanged
      g('star', { fill: 'hatch' }),       // wrong non-solid fill
      g('triangle', { fill: 'outline' }), // copy of B
    ],
    correct: 0,
  },

  // ── ana-e3 ───────────────────────────────────────────────────────────────
  // Relation: rotate +90°. arrow 0 → arrow 90 ∷ L 0 → ?
  {
    kind: 'analogy',
    id: 'ana-e3',
    category: 'analogies',
    difficulty: 'easy',
    pair: [g('arrow', { rotation: 0 }), g('arrow', { rotation: 90 }), g('L', { rotation: 0 })],
    options: [
      g('L', { rotation: 90 }),               // correct
      g('L', { rotation: 180 }),              // rotated too far
      g('L', { rotation: 90, mirror: true }), // right rotation, mirrored
      g('arrow', { rotation: 90 }),           // copy of B
    ],
    correct: 0,
  },

  // ── ana-e4 ───────────────────────────────────────────────────────────────
  // Relation: dot count +2. 1 dot → 3 dots ∷ 4 dots → ?
  {
    kind: 'analogy',
    id: 'ana-e4',
    category: 'analogies',
    difficulty: 'easy',
    pair: [g('dot', { count: 1 }), g('dot', { count: 3 }), g('dot', { count: 4 })],
    options: [
      g('dot', { count: 6 }), // correct
      g('dot', { count: 5 }), // +1 instead of +2
      g('dot', { count: 8 }), // ×2 misread
      g('dot', { count: 4 }), // C unchanged
    ],
    correct: 0,
  },

  // ── ana-e5 ───────────────────────────────────────────────────────────────
  // Relation: add a center dot. pentagon outline → pentagon outline + dot ∷
  // hexagon outline → ?
  {
    kind: 'analogy',
    id: 'ana-e5',
    category: 'analogies',
    difficulty: 'easy',
    pair: [
      g('pentagon', { fill: 'outline' }),
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.4 }],
      g('hexagon', { fill: 'outline' }),
    ],
    options: [
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.4 }],  // correct
      g('hexagon', { fill: 'outline' }),                                                // C unchanged
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'dot', count: 2, scale: 0.4 }],  // wrong dot count
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.4 }], // copy of B
    ],
    correct: 0,
  },

  // ── ana-m1 ───────────────────────────────────────────────────────────────
  // Relation: rotate +135° (off-axis). flag 0 → flag 135 ∷ flag 90 → 225.
  {
    kind: 'analogy',
    id: 'ana-m1',
    category: 'analogies',
    difficulty: 'medium',
    pair: [g('flag', { rotation: 0 }), g('flag', { rotation: 135 }), g('flag', { rotation: 90 })],
    options: [
      g('flag', { rotation: 225 }),               // correct
      g('flag', { rotation: 180 }),               // +90 misread
      g('flag', { rotation: 225, mirror: true }), // right rotation, mirrored
      g('flag', { rotation: 135 }),               // copy of B
    ],
    correct: 0,
  },

  // ── ana-m2 ───────────────────────────────────────────────────────────────
  // Relation: two changes at once — solid → outline AND shrink to 0.6.
  // hexagon solid 1.0 → hexagon outline 0.6 ∷ cross solid 1.0 → ?
  {
    kind: 'analogy',
    id: 'ana-m2',
    category: 'analogies',
    difficulty: 'medium',
    pair: [g('hexagon'), g('hexagon', { fill: 'outline', scale: 0.6 }), g('cross')],
    options: [
      g('cross', { fill: 'outline', scale: 0.6 }), // correct
      g('cross', { fill: 'outline' }),             // fill only, size missed
      g('cross', { scale: 0.6 }),                  // size only, fill missed
      g('cross', { fill: 'hatch', scale: 0.6 }),   // right size, wrong fill
    ],
    correct: 0,
  },

  // ── ana-m3 ───────────────────────────────────────────────────────────────
  // Relation: the filled half turns a quarter, left → top. circle half-left →
  // circle half-top ∷ square half-left → square half-top.
  {
    kind: 'analogy',
    id: 'ana-m3',
    category: 'analogies',
    difficulty: 'medium',
    pair: [
      g('circle', { fill: 'half-left' }),
      g('circle', { fill: 'half-top' }),
      g('square', { fill: 'half-left' }),
    ],
    options: [
      g('square', { fill: 'half-top' }),    // correct
      g('square', { fill: 'half-bottom' }), // quarter turn the wrong way
      g('square', { fill: 'half-right' }),  // half turn, not quarter
      g('circle', { fill: 'half-top' }),    // copy of B
    ],
    correct: 0,
  },

  // ── ana-m4 ───────────────────────────────────────────────────────────────
  // Relation: mirror. L → L mirrored ∷ flag → flag mirrored. Both shapes are
  // chiral, so the mirror is never a rotation in disguise.
  {
    kind: 'analogy',
    id: 'ana-m4',
    category: 'analogies',
    difficulty: 'medium',
    pair: [g('L', { rotation: 0 }), g('L', { rotation: 0, mirror: true }), g('flag', { rotation: 0 })],
    options: [
      g('flag', { rotation: 0, mirror: true }),   // correct
      g('flag', { rotation: 180 }),               // half-turn ≠ mirror
      g('flag', { rotation: 180, mirror: true }), // mirrored AND rotated
      g('L', { rotation: 0, mirror: true }),      // copy of B
    ],
    correct: 0,
  },

  // ── ana-m5 ───────────────────────────────────────────────────────────────
  // Relation: one more side. triangle (3) → square (4) ∷ pentagon (5) → hexagon (6).
  {
    kind: 'analogy',
    id: 'ana-m5',
    category: 'analogies',
    difficulty: 'medium',
    pair: [g('triangle'), g('square'), g('pentagon')],
    options: [
      g('hexagon'),  // correct
      g('pentagon'), // C unchanged
      g('star'),     // "fancier shape" misread
      g('square'),   // copy of B
    ],
    correct: 0,
  },

  // ── ana-h1 ───────────────────────────────────────────────────────────────
  // Relation: rotate −90° (counter-clockwise). arrow 90 → arrow 0 ∷ L 180 → 90.
  // The tempting answer is +90.
  {
    kind: 'analogy',
    id: 'ana-h1',
    category: 'analogies',
    difficulty: 'hard',
    pair: [g('arrow', { rotation: 90 }), g('arrow', { rotation: 0 }), g('L', { rotation: 180 })],
    options: [
      g('L', { rotation: 90 }),               // correct
      g('L', { rotation: 270 }),              // +90 (wrong direction)
      g('L', { rotation: 90, mirror: true }), // right rotation, mirrored
      g('L', { rotation: 180 }),              // C unchanged
    ],
    correct: 0,
  },

  // ── ana-h2 ───────────────────────────────────────────────────────────────
  // Relation: two changes — solid → hatch AND rotate +45°.
  // square solid 0 → square hatch 45 ∷ triangle solid 0 → triangle hatch 45.
  {
    kind: 'analogy',
    id: 'ana-h2',
    category: 'analogies',
    difficulty: 'hard',
    pair: [
      g('square', { rotation: 0 }),
      g('square', { fill: 'hatch', rotation: 45 }),
      g('triangle', { rotation: 0 }),
    ],
    options: [
      g('triangle', { fill: 'hatch', rotation: 45 }),   // correct
      g('triangle', { fill: 'hatch', rotation: 0 }),    // fill only, rotation missed
      g('triangle', { rotation: 45 }),                  // rotation only, fill missed
      g('triangle', { fill: 'outline', rotation: 45 }), // right rotation, wrong fill
    ],
    correct: 0,
  },

  // ── ana-h3 ───────────────────────────────────────────────────────────────
  // Relation: two fewer dots, frame kept. [circle frame, 5 dots] →
  // [circle frame, 3 dots] ∷ [square frame, 6 dots] → [square frame, 4 dots].
  {
    kind: 'analogy',
    id: 'ana-h3',
    category: 'analogies',
    difficulty: 'hard',
    pair: [
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 5, scale: 0.45 }],
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 3, scale: 0.45 }],
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 6, scale: 0.45 }],
    ],
    options: [
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 4, scale: 0.45 }], // correct
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 2, scale: 0.45 }], // −4 overshoot
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 5, scale: 0.45 }], // −1 undershoot
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 4, scale: 0.45 }], // right count, frame from A
    ],
    correct: 0,
  },

  // ── ana-h4 ───────────────────────────────────────────────────────────────
  // Relation: inner and outer swap roles. [square frame, circle inside] →
  // [circle frame, square inside] ∷ [pentagon frame, triangle inside] →
  // [triangle frame, pentagon inside].
  {
    kind: 'analogy',
    id: 'ana-h4',
    category: 'analogies',
    difficulty: 'hard',
    pair: [
      [{ shape: 'square', fill: 'outline' }, { shape: 'circle', fill: 'solid', scale: 0.45 }],
      [{ shape: 'circle', fill: 'outline' }, { shape: 'square', fill: 'solid', scale: 0.45 }],
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.45 }],
    ],
    options: [
      [{ shape: 'triangle', fill: 'outline' }, { shape: 'pentagon', fill: 'solid', scale: 0.45 }], // correct
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.45 }], // C unchanged
      [{ shape: 'triangle', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.45 }], // outer swapped, inner not
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'pentagon', fill: 'solid', scale: 0.45 }], // inner swapped, outer not
    ],
    correct: 0,
  },

  // ── ana-h5 ───────────────────────────────────────────────────────────────
  // Relation: rotate +45° AND mirror. L 0 → L mirror 45 ∷ L 90 → L mirror 135.
  // Chirality makes every distractor a near-miss.
  {
    kind: 'analogy',
    id: 'ana-h5',
    category: 'analogies',
    difficulty: 'hard',
    pair: [g('L', { rotation: 0 }), g('L', { rotation: 45, mirror: true }), g('L', { rotation: 90 })],
    options: [
      g('L', { rotation: 135, mirror: true }), // correct
      g('L', { rotation: 135 }),               // rotated, mirror missed
      g('L', { rotation: 90, mirror: true }),  // mirrored, rotation missed
      g('L', { rotation: 45, mirror: true }),  // copy of B
    ],
    correct: 0,
  },

  // ── ana-x1 ───────────────────────────────────────────────────────────────
  // Relation: three changes at once — rotate +90°, solid → outline, shrink to
  // 0.7. arrow (solid, 0, 1.0) → arrow (outline, 90, 0.7) ∷ flag (solid, 45) →
  // flag (outline, 135, 0.7). Missing any one of the three picks a distractor.
  {
    kind: 'analogy',
    id: 'ana-x1',
    category: 'analogies',
    difficulty: 'expert',
    pair: [
      g('arrow', { rotation: 0 }),
      g('arrow', { fill: 'outline', rotation: 90, scale: 0.7 }),
      g('flag', { rotation: 45 }),
    ],
    options: [
      g('flag', { fill: 'outline', rotation: 135, scale: 0.7 }), // correct
      g('flag', { fill: 'outline', rotation: 135 }),             // size missed
      g('flag', { fill: 'outline', rotation: 45, scale: 0.7 }),  // rotation missed
      g('flag', { rotation: 135, scale: 0.7 }),                  // fill missed
    ],
    correct: 0,
  },

  // ── ana-x2 ───────────────────────────────────────────────────────────────
  // Relation: count the sides. pentagon (5 sides) → 5 dots ∷ hexagon (6 sides)
  // → 6 dots. The relation crosses representations: shape → number.
  {
    kind: 'analogy',
    id: 'ana-x2',
    category: 'analogies',
    difficulty: 'expert',
    pair: [g('pentagon', { fill: 'outline' }), g('dot', { count: 5 }), g('hexagon', { fill: 'outline' })],
    options: [
      g('dot', { count: 6 }), // correct
      g('dot', { count: 5 }), // copy of B
      g('dot', { count: 7 }), // off by one
      g('dot', { count: 4 }), // sides − 2 misread
    ],
    correct: 0,
  },

  // ── ana-x3 ───────────────────────────────────────────────────────────────
  // Relation: the inner glyph is promoted — it becomes the whole cell at full
  // size, and the frame disappears. [hexagon frame, small star] → star ∷
  // [square frame, small cross] → cross. The pull is to keep the frame instead.
  {
    kind: 'analogy',
    id: 'ana-x3',
    category: 'analogies',
    difficulty: 'expert',
    pair: [
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'star', fill: 'solid', scale: 0.45 }],
      g('star'),
      [{ shape: 'square', fill: 'outline' }, { shape: 'cross', fill: 'solid', scale: 0.45 }],
    ],
    options: [
      g('cross'),                                                                    // correct
      g('square'),                                                                   // outer promoted instead
      g('cross', { scale: 0.45 }),                                                   // inner kept small
      [{ shape: 'square', fill: 'outline' }, { shape: 'cross', fill: 'solid', scale: 0.45 }], // C unchanged
    ],
    correct: 0,
  },

  // ── ana-x4 ───────────────────────────────────────────────────────────────
  // Relation: mirror AND solid → hatch. flag solid → flag mirror hatch ∷
  // L solid → L mirror hatch. Chirality plus a fill change — both must be seen.
  {
    kind: 'analogy',
    id: 'ana-x4',
    category: 'analogies',
    difficulty: 'expert',
    pair: [
      g('flag', { rotation: 0 }),
      g('flag', { fill: 'hatch', rotation: 0, mirror: true }),
      g('L', { rotation: 0 }),
    ],
    options: [
      g('L', { fill: 'hatch', rotation: 0, mirror: true }),   // correct
      g('L', { fill: 'hatch', rotation: 0 }),                 // fill right, mirror missed
      g('L', { rotation: 0, mirror: true }),                  // mirror right, fill missed
      g('L', { fill: 'outline', rotation: 0, mirror: true }), // mirrored, wrong fill
    ],
    correct: 0,
  },

  // ── ana-x5 ───────────────────────────────────────────────────────────────
  // Relation: frame shrinks to 0.7 while the dots inside gain one.
  // [square 1.0, 2 dots] → [square 0.7, 3 dots] ∷ [circle 1.0, 4 dots] →
  // [circle 0.7, 5 dots]. Two co-varying quantities, opposite directions.
  // Geometry: dots at scale 0.4 stay well inside both frames at scale 0.7
  // (5-dot corner offset ≈ 8 + dot radius 3.2 < circle radius 23.8).
  {
    kind: 'analogy',
    id: 'ana-x5',
    category: 'analogies',
    difficulty: 'expert',
    pair: [
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 2, scale: 0.4 }],
      [{ shape: 'square', fill: 'outline', scale: 0.7 }, { shape: 'dot', count: 3, scale: 0.4 }],
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 4, scale: 0.4 }],
    ],
    options: [
      [{ shape: 'circle', fill: 'outline', scale: 0.7 }, { shape: 'dot', count: 5, scale: 0.4 }], // correct
      [{ shape: 'circle', fill: 'outline', scale: 0.7 }, { shape: 'dot', count: 4, scale: 0.4 }], // frame shrunk, dots unchanged
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 5, scale: 0.4 }],             // dots grown, frame unchanged
      [{ shape: 'circle', fill: 'outline', scale: 0.7 }, { shape: 'dot', count: 6, scale: 0.4 }], // dots +2 overshoot
    ],
    correct: 0,
  },
]
