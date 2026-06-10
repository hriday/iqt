import type { Puzzle, Cell, Glyph, Shape } from '../types'

const g = (shape: Shape, rest: Partial<Glyph> = {}): Cell => [{ shape, ...rest }]

// Note on odd-one-out puzzles whose four "same" items look identical
// (spa-e1/e2/e4/e5): the pool test requires every option to serialize
// uniquely, so the lookalikes spell out renderer defaults explicitly
// (fill 'solid', rotation 0, scale 1) — distinct JSON, identical pixels.
//
// Note on rotation puzzles: only L and flag are chiral (their mirror image
// equals no rotation of the original — see SHAPE_PATHS), so a mirrored
// distractor at ANY rotation can never collide with a pure rotation of the
// base. Mirrored distractors at distinct rotations are also pairwise
// distinct because neither shape has any rotational symmetry.

export const SPATIAL: Puzzle[] = [
  // ── spa-e1 ───────────────────────────────────────────────────────────────
  // Rule: four solid circles, one solid square — the square is odd.
  {
    kind: 'odd-one-out',
    id: 'spa-e1',
    category: 'spatial',
    difficulty: 'easy',
    options: [
      g('circle'),
      g('circle', { fill: 'solid' }),
      g('square'),                     // odd: different shape
      g('circle', { rotation: 0 }),
      g('circle', { scale: 1 }),
    ],
    correct: 2,
  },

  // ── spa-e2 ───────────────────────────────────────────────────────────────
  // Rule: five stars — four solid, one outline. Fill is the discriminator.
  {
    kind: 'odd-one-out',
    id: 'spa-e2',
    category: 'spatial',
    difficulty: 'easy',
    options: [
      g('star', { fill: 'solid' }),
      g('star', { fill: 'outline' }),  // odd: only outline
      g('star'),
      g('star', { fill: 'solid', rotation: 0 }),
      g('star', { fill: 'solid', scale: 1 }),
    ],
    correct: 1,
  },

  // ── spa-e3 ───────────────────────────────────────────────────────────────
  // Rule: which is the base L rotated (not mirrored)? Correct = L rotated 90.
  // L is chiral, so the two mirrored options match no rotation of the base.
  {
    kind: 'rotation',
    id: 'spa-e3',
    category: 'spatial',
    difficulty: 'easy',
    base: g('L', { rotation: 0 }),
    options: [
      g('L', { rotation: 90 }),               // correct
      g('L', { mirror: true }),               // mirrored, unrotated
      g('L', { mirror: true, rotation: 90 }), // mirrored + rotated
      g('square'),                            // different shape entirely
    ],
    correct: 0,
  },

  // ── spa-e4 ───────────────────────────────────────────────────────────────
  // Rule: five diamonds — four at scale 0.6, one at scale 1.0. Size is the
  // discriminator.
  {
    kind: 'odd-one-out',
    id: 'spa-e4',
    category: 'spatial',
    difficulty: 'easy',
    options: [
      g('diamond', { scale: 0.6 }),
      g('diamond', { fill: 'solid', scale: 0.6 }),
      g('diamond', { scale: 0.6, rotation: 0 }),
      g('diamond', { scale: 1 }),              // odd: full size
      g('diamond', { fill: 'solid', scale: 0.6, rotation: 0 }),
    ],
    correct: 3,
  },

  // ── spa-e5 ───────────────────────────────────────────────────────────────
  // Rule: five dot cells — four show 3 dots, one shows 4. Count is the
  // discriminator.
  {
    kind: 'odd-one-out',
    id: 'spa-e5',
    category: 'spatial',
    difficulty: 'easy',
    options: [
      g('dot', { count: 3 }),
      g('dot', { count: 3, scale: 1 }),
      g('dot', { count: 4 }),              // odd: one dot more
      g('dot', { count: 3, rotation: 0 }),
      g('dot', { count: 3, scale: 1, rotation: 0 }),
    ],
    correct: 2,
  },

  // ── spa-m1 ───────────────────────────────────────────────────────────────
  // Rule: which is the base flag rotated (not mirrored)? Correct = flag
  // rotated 180. Flag is chiral; all three distractors are mirrored, so none
  // equals any rotation of the base.
  {
    kind: 'rotation',
    id: 'spa-m1',
    category: 'spatial',
    difficulty: 'medium',
    base: g('flag', { rotation: 0 }),
    options: [
      g('flag', { rotation: 180 }),               // correct
      g('flag', { mirror: true }),                // mirrored, unrotated
      g('flag', { mirror: true, rotation: 90 }),  // mirrored + 90
      g('flag', { mirror: true, rotation: 180 }), // mirrored + 180
    ],
    correct: 0,
  },

  // ── spa-m2 ───────────────────────────────────────────────────────────────
  // Rule: which is the base L rotated? Correct = L rotated 225 (an off-axis
  // angle). Distractors are mirrored at other 45°-family angles.
  {
    kind: 'rotation',
    id: 'spa-m2',
    category: 'spatial',
    difficulty: 'medium',
    base: g('L', { rotation: 0 }),
    options: [
      g('L', { rotation: 225 }),               // correct
      g('L', { mirror: true, rotation: 45 }),  // mirrored + 45
      g('L', { mirror: true, rotation: 135 }), // mirrored + 135
      g('L', { mirror: true, rotation: 315 }), // mirrored + 315
    ],
    correct: 0,
  },

  // ── spa-m3 ───────────────────────────────────────────────────────────────
  // Rule: five L's — four are pure rotations of one another (0/90/180/270),
  // one is mirrored and so can never be rotated to match. Mirrored = odd.
  {
    kind: 'odd-one-out',
    id: 'spa-m3',
    category: 'spatial',
    difficulty: 'medium',
    options: [
      g('L', { rotation: 0 }),
      g('L', { rotation: 90 }),
      g('L', { mirror: true, rotation: 0 }), // odd: mirrored
      g('L', { rotation: 180 }),
      g('L', { rotation: 270 }),
    ],
    correct: 2,
  },

  // ── spa-m4 ───────────────────────────────────────────────────────────────
  // Rule: fill is the property — four solid shapes, one outline. The shapes
  // all differing (circle/square/triangle/pentagon/star) is camouflage; only
  // the star is outline, so it is the odd one.
  {
    kind: 'odd-one-out',
    id: 'spa-m4',
    category: 'spatial',
    difficulty: 'medium',
    options: [
      g('circle', { fill: 'solid' }),
      g('square', { fill: 'solid' }),
      g('triangle', { fill: 'solid' }),
      g('star', { fill: 'outline' }), // odd: only non-solid fill
      g('pentagon', { fill: 'solid' }),
    ],
    correct: 3,
  },

  // ── spa-m5 ───────────────────────────────────────────────────────────────
  // Rule: base flag already rotated 45; correct = flag rotated 135 (90 more).
  // All distractors mirrored, including one at the correct angle (135) and
  // one at the base's own angle (45).
  {
    kind: 'rotation',
    id: 'spa-m5',
    category: 'spatial',
    difficulty: 'medium',
    base: g('flag', { rotation: 45 }),
    options: [
      g('flag', { rotation: 135 }),               // correct
      g('flag', { mirror: true, rotation: 45 }),  // mirrored at base angle
      g('flag', { mirror: true, rotation: 225 }), // mirrored + 225
      g('flag', { mirror: true, rotation: 135 }), // mirrored at correct angle
    ],
    correct: 0,
  },

  // ── spa-h1 ───────────────────────────────────────────────────────────────
  // Rule: base L with half-left fill; correct = same L rotated 270. The
  // half-fill clip lives in the glyph's local coordinates, so it rotates and
  // mirrors with the shape — all four options are genuinely distinct, and the
  // mirrored ones match no rotation of the base (L is chiral).
  {
    kind: 'rotation',
    id: 'spa-h1',
    category: 'spatial',
    difficulty: 'hard',
    base: g('L', { fill: 'half-left' }),
    options: [
      g('L', { fill: 'half-left', rotation: 270 }),               // correct
      g('L', { fill: 'half-left', mirror: true, rotation: 90 }),  // mirrored + 90
      g('L', { fill: 'half-left', mirror: true, rotation: 180 }), // mirrored + 180
      g('L', { fill: 'half-left', mirror: true, rotation: 270 }), // mirrored at correct angle
    ],
    correct: 0,
  },

  // ── spa-h2 ───────────────────────────────────────────────────────────────
  // Rule: base flag rotated 45; correct = flag rotated 225 (a half turn
  // more). Five options — four mirrored distractors, one at the base angle
  // and one at the correct angle.
  {
    kind: 'rotation',
    id: 'spa-h2',
    category: 'spatial',
    difficulty: 'hard',
    base: g('flag', { rotation: 45 }),
    options: [
      g('flag', { rotation: 225 }),               // correct
      g('flag', { mirror: true, rotation: 45 }),  // mirrored at base angle
      g('flag', { mirror: true, rotation: 135 }), // mirrored + 135
      g('flag', { mirror: true, rotation: 315 }), // mirrored + 315
      g('flag', { mirror: true, rotation: 225 }), // mirrored at correct angle
    ],
    correct: 0,
  },

  // ── spa-h3 ───────────────────────────────────────────────────────────────
  // Rule: nested cells [outer outline, inner solid scale 0.45] — in four
  // cells the inner shape matches the outer (square-in-square,
  // triangle-in-triangle, circle-in-circle, pentagon-in-pentagon); the odd
  // cell nests a circle inside a square.
  {
    kind: 'odd-one-out',
    id: 'spa-h3',
    category: 'spatial',
    difficulty: 'hard',
    options: [
      [{ shape: 'square', fill: 'outline' }, { shape: 'square', fill: 'solid', scale: 0.45 }],
      [{ shape: 'triangle', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.45 }],
      [{ shape: 'circle', fill: 'outline' }, { shape: 'circle', fill: 'solid', scale: 0.45 }],
      [{ shape: 'square', fill: 'outline' }, { shape: 'circle', fill: 'solid', scale: 0.45 }], // odd: inner ≠ outer
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'pentagon', fill: 'solid', scale: 0.45 }],
    ],
    correct: 3,
  },

  // ── spa-h4 ───────────────────────────────────────────────────────────────
  // Rule: five flags — four are pure rotations of one another (0/45/135/225),
  // one is mirrored (at rotation 90). Flag is chiral, so the mirrored flag
  // matches no rotation of the others — it is the odd one.
  {
    kind: 'odd-one-out',
    id: 'spa-h4',
    category: 'spatial',
    difficulty: 'hard',
    options: [
      g('flag', { rotation: 0 }),
      g('flag', { rotation: 45 }),
      g('flag', { mirror: true, rotation: 90 }), // odd: mirrored
      g('flag', { rotation: 135 }),
      g('flag', { rotation: 225 }),
    ],
    correct: 2,
  },

  // ── spa-h5 ───────────────────────────────────────────────────────────────
  // Rule: cells [outline polygon, dots scale 0.45] where dot count = polygon
  // sides − 2: triangle+1, square+2, pentagon+3, hexagon+4. The circle has no
  // sides, so its count (3, deliberately matching the pentagon's as
  // camouflage) follows no rule — circle is odd. Geometry: at scale 0.45 the
  // dot layouts (positions and radius 8 both scaled about the cell center)
  // stay inside every outline, including the single center dot in the
  // triangle, whose nearest edge is ~17 units from center vs dot radius 3.6.
  {
    kind: 'odd-one-out',
    id: 'spa-h5',
    category: 'spatial',
    difficulty: 'hard',
    options: [
      [{ shape: 'triangle', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.45 }],
      [{ shape: 'square', fill: 'outline' }, { shape: 'dot', count: 2, scale: 0.45 }],
      [{ shape: 'circle', fill: 'outline' }, { shape: 'dot', count: 3, scale: 0.45 }], // odd: no sides
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'dot', count: 3, scale: 0.45 }],
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'dot', count: 4, scale: 0.45 }],
    ],
    correct: 2,
  },
]
