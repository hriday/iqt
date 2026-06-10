import type { Puzzle, Cell, Glyph, Shape } from '../types'

const g = (shape: Shape, rest: Partial<Glyph> = {}): Cell => [{ shape, ...rest }]

export const PATTERNS: Puzzle[] = [
  // ── pat-e1 ───────────────────────────────────────────────────────────────
  // Rule: rows fix shape (circle/square/triangle), columns fix fill
  // (solid/outline/hatch). Missing cell (2,2) = triangle hatch.
  {
    kind: 'matrix',
    id: 'pat-e1',
    category: 'patterns',
    difficulty: 'easy',
    grid: [
      g('circle', { fill: 'solid' }), g('circle', { fill: 'outline' }), g('circle', { fill: 'hatch' }),
      g('square', { fill: 'solid' }), g('square', { fill: 'outline' }), g('square', { fill: 'hatch' }),
      g('triangle', { fill: 'solid' }), g('triangle', { fill: 'outline' }),
    ],
    options: [
      g('triangle', { fill: 'hatch' }),  // correct
      g('triangle', { fill: 'solid' }),  // right shape, wrong fill (copy of grid cell)
      g('circle', { fill: 'hatch' }),    // wrong shape, right fill (copy of grid cell)
      g('square', { fill: 'hatch' }),    // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-e2 ───────────────────────────────────────────────────────────────
  // Rule: rows fix shape (diamond/circle/star), scale grows by column
  // 0.5 / 0.75 / 1.0. Missing cell (2,2) = star scale 1.0.
  {
    kind: 'matrix',
    id: 'pat-e2',
    category: 'patterns',
    difficulty: 'easy',
    grid: [
      g('diamond', { scale: 0.5 }), g('diamond', { scale: 0.75 }), g('diamond', { scale: 1 }),
      g('circle', { scale: 0.5 }), g('circle', { scale: 0.75 }), g('circle', { scale: 1 }),
      g('star', { scale: 0.5 }), g('star', { scale: 0.75 }),
    ],
    options: [
      g('star', { scale: 1 }),       // correct
      g('star', { scale: 0.75 }),    // right shape, wrong scale (copy of grid cell)
      g('circle', { scale: 1 }),     // wrong shape, right scale (copy of grid cell)
      g('diamond', { scale: 0.5 }),  // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-e3 ───────────────────────────────────────────────────────────────
  // Rule: arrow everywhere, rotation by column 0/90/180 (same every row).
  // Missing cell (2,2) = arrow rotation 180.
  {
    kind: 'matrix',
    id: 'pat-e3',
    category: 'patterns',
    difficulty: 'easy',
    grid: [
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 90 }), g('arrow', { rotation: 180 }),
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 90 }), g('arrow', { rotation: 180 }),
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 90 }),
    ],
    options: [
      g('arrow', { rotation: 180 }),    // correct
      g('arrow', { rotation: 270 }),    // right shape, wrong rotation
      g('triangle', { rotation: 180 }), // wrong shape, right rotation
      g('arrow', { rotation: 0 }),      // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-e4 ───────────────────────────────────────────────────────────────
  // Rule: dots, count = column number (1/2/3) in every row.
  // Missing cell (2,2) = dot count 3.
  {
    kind: 'matrix',
    id: 'pat-e4',
    category: 'patterns',
    difficulty: 'easy',
    grid: [
      g('dot', { count: 1 }), g('dot', { count: 2 }), g('dot', { count: 3 }),
      g('dot', { count: 1 }), g('dot', { count: 2 }), g('dot', { count: 3 }),
      g('dot', { count: 1 }), g('dot', { count: 2 }),
    ],
    options: [
      g('dot', { count: 3 }), // correct
      g('dot', { count: 4 }), // right shape, wrong count
      g('dot', { count: 2 }), // copy of another grid cell
      g('dot', { count: 1 }), // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-e5 ───────────────────────────────────────────────────────────────
  // Rule: row shape constant (pentagon/cross/diamond), all solid, all
  // columns identical. Missing cell (2,2) = diamond solid.
  {
    kind: 'matrix',
    id: 'pat-e5',
    category: 'patterns',
    difficulty: 'easy',
    grid: [
      g('pentagon', { fill: 'solid' }), g('pentagon', { fill: 'solid' }), g('pentagon', { fill: 'solid' }),
      g('cross', { fill: 'solid' }), g('cross', { fill: 'solid' }), g('cross', { fill: 'solid' }),
      g('diamond', { fill: 'solid' }), g('diamond', { fill: 'solid' }),
    ],
    options: [
      g('diamond', { fill: 'solid' }),   // correct
      g('diamond', { fill: 'outline' }), // right shape, wrong fill
      g('pentagon', { fill: 'solid' }),  // wrong shape (copy of grid cell)
      g('cross', { fill: 'solid' }),     // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-m1 ───────────────────────────────────────────────────────────────
  // Rule: shape by row (square/triangle/L), rotation by column (0/90/180).
  // Missing cell (2,2) = L rotation 180.
  {
    kind: 'matrix',
    id: 'pat-m1',
    category: 'patterns',
    difficulty: 'medium',
    grid: [
      g('square', { rotation: 0 }), g('square', { rotation: 90 }), g('square', { rotation: 180 }),
      g('triangle', { rotation: 0 }), g('triangle', { rotation: 90 }), g('triangle', { rotation: 180 }),
      g('L', { rotation: 0 }), g('L', { rotation: 90 }),
    ],
    options: [
      g('L', { rotation: 180 }),        // correct
      g('L', { rotation: 270 }),        // right shape, wrong rotation
      g('triangle', { rotation: 180 }), // wrong shape, right rotation (copy of grid cell)
      g('L', { rotation: 90 }),         // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-m2 ───────────────────────────────────────────────────────────────
  // Rule: shape by row (circle/square/triangle); fill solid where (row+col)
  // is even, outline where odd (0-indexed). Missing cell (2,2): 2+2=4 even
  // → triangle solid.
  {
    kind: 'matrix',
    id: 'pat-m2',
    category: 'patterns',
    difficulty: 'medium',
    grid: [
      g('circle', { fill: 'solid' }), g('circle', { fill: 'outline' }), g('circle', { fill: 'solid' }),
      g('square', { fill: 'outline' }), g('square', { fill: 'solid' }), g('square', { fill: 'outline' }),
      g('triangle', { fill: 'solid' }), g('triangle', { fill: 'outline' }),
    ],
    options: [
      g('triangle', { fill: 'solid' }),   // correct
      g('triangle', { fill: 'outline' }), // right shape, wrong fill (copy of grid cell)
      g('circle', { fill: 'solid' }),     // wrong shape, right fill (copy of grid cell)
      g('square', { fill: 'solid' }),     // wrong shape (copy of grid cell)
    ],
    correct: 0,
  },

  // ── pat-m3 ───────────────────────────────────────────────────────────────
  // Rule: dots, count = row+col+1 (0-indexed): 1,2,3 / 2,3,4 / 3,4,?.
  // Missing cell (2,2) = 5 dots.
  {
    kind: 'matrix',
    id: 'pat-m3',
    category: 'patterns',
    difficulty: 'medium',
    grid: [
      g('dot', { count: 1 }), g('dot', { count: 2 }), g('dot', { count: 3 }),
      g('dot', { count: 2 }), g('dot', { count: 3 }), g('dot', { count: 4 }),
      g('dot', { count: 3 }), g('dot', { count: 4 }),
    ],
    options: [
      g('dot', { count: 5 }), // correct
      g('dot', { count: 4 }), // wrong count (copy of grid cell)
      g('dot', { count: 6 }), // wrong count
      g('dot', { count: 3 }), // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-m4 ───────────────────────────────────────────────────────────────
  // Rule: col0 = big outline shape (square/circle/pentagon by row); col1 =
  // small solid companion (triangle/diamond/star, scale 0.4); col2 = both
  // layered. Missing cell (2,2) = [pentagon outline, star solid scale 0.4].
  {
    kind: 'matrix',
    id: 'pat-m4',
    category: 'patterns',
    difficulty: 'medium',
    grid: [
      g('square', { fill: 'outline' }), g('triangle', { fill: 'solid', scale: 0.4 }),
      [{ shape: 'square', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.4 }],
      g('circle', { fill: 'outline' }), g('diamond', { fill: 'solid', scale: 0.4 }),
      [{ shape: 'circle', fill: 'outline' }, { shape: 'diamond', fill: 'solid', scale: 0.4 }],
      g('pentagon', { fill: 'outline' }), g('star', { fill: 'solid', scale: 0.4 }),
    ],
    options: [
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'star', fill: 'solid', scale: 0.4 }],    // correct
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'star', fill: 'outline', scale: 0.4 }],  // right shapes, wrong companion fill
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'diamond', fill: 'solid', scale: 0.4 }], // wrong companion shape
      [{ shape: 'circle', fill: 'outline' }, { shape: 'diamond', fill: 'solid', scale: 0.4 }],   // copy of grid cell (1,2)
    ],
    correct: 0,
  },

  // ── pat-m5 ───────────────────────────────────────────────────────────────
  // Rule: latin square of shapes (circle/square/triangle), all solid — each
  // row and column contains all three shapes.
  //   circle  square   triangle
  //   triangle circle  square
  //   square  triangle ?        → row needs circle, col2 needs circle → circle.
  {
    kind: 'matrix',
    id: 'pat-m5',
    category: 'patterns',
    difficulty: 'medium',
    grid: [
      g('circle', { fill: 'solid' }), g('square', { fill: 'solid' }), g('triangle', { fill: 'solid' }),
      g('triangle', { fill: 'solid' }), g('circle', { fill: 'solid' }), g('square', { fill: 'solid' }),
      g('square', { fill: 'solid' }), g('triangle', { fill: 'solid' }),
    ],
    options: [
      g('circle', { fill: 'solid' }),   // correct (only shape missing from row 2 / col 2)
      g('square', { fill: 'solid' }),   // already in row 2 (copy of grid cell)
      g('triangle', { fill: 'solid' }), // already in row 2 (copy of grid cell)
      g('circle', { fill: 'outline' }), // right shape, wrong fill
    ],
    correct: 0,
  },

  // ── pat-h1 ───────────────────────────────────────────────────────────────
  // Rule: Graeco-latin square — shapes (circle/square/triangle) AND fills
  // (solid/outline/hatch) both form latin squares (every shape-fill pair
  // occurs once):
  //   circle-solid    square-outline  triangle-hatch
  //   square-hatch    triangle-solid  circle-outline
  //   triangle-outline circle-hatch   ?
  // Row 2 lacks shape square + fill solid; col 2 lacks square + solid
  // → square solid.
  {
    kind: 'matrix',
    id: 'pat-h1',
    category: 'patterns',
    difficulty: 'hard',
    grid: [
      g('circle', { fill: 'solid' }), g('square', { fill: 'outline' }), g('triangle', { fill: 'hatch' }),
      g('square', { fill: 'hatch' }), g('triangle', { fill: 'solid' }), g('circle', { fill: 'outline' }),
      g('triangle', { fill: 'outline' }), g('circle', { fill: 'hatch' }),
    ],
    options: [
      g('square', { fill: 'solid' }),   // correct
      g('square', { fill: 'outline' }), // right shape, fill already in row/col (copy of grid cell)
      g('triangle', { fill: 'solid' }), // wrong shape, right fill (copy of grid cell)
      g('circle', { fill: 'hatch' }),   // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-h2 ───────────────────────────────────────────────────────────────
  // Rule: arrow rotation = 90°·col + 45°·row (0-indexed):
  //   0  90 180 / 45 135 225 / 90 180 ? → 90·2 + 45·2 = 270.
  {
    kind: 'matrix',
    id: 'pat-h2',
    category: 'patterns',
    difficulty: 'hard',
    grid: [
      g('arrow', { rotation: 0 }), g('arrow', { rotation: 90 }), g('arrow', { rotation: 180 }),
      g('arrow', { rotation: 45 }), g('arrow', { rotation: 135 }), g('arrow', { rotation: 225 }),
      g('arrow', { rotation: 90 }), g('arrow', { rotation: 180 }),
    ],
    options: [
      g('arrow', { rotation: 270 }), // correct
      g('arrow', { rotation: 315 }), // right shape, wrong rotation
      g('flag', { rotation: 270 }),  // wrong shape, right rotation
      g('arrow', { rotation: 225 }), // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-h3 ───────────────────────────────────────────────────────────────
  // Rule: dots, count = (row+1)×(col+1): 1,2,3 / 2,4,6 / 3,6,? → 9 dots.
  {
    kind: 'matrix',
    id: 'pat-h3',
    category: 'patterns',
    difficulty: 'hard',
    grid: [
      g('dot', { count: 1 }), g('dot', { count: 2 }), g('dot', { count: 3 }),
      g('dot', { count: 2 }), g('dot', { count: 4 }), g('dot', { count: 6 }),
      g('dot', { count: 3 }), g('dot', { count: 6 }),
    ],
    options: [
      g('dot', { count: 9 }), // correct
      g('dot', { count: 8 }), // wrong count
      g('dot', { count: 7 }), // wrong count
      g('dot', { count: 6 }), // copy of another grid cell
    ],
    correct: 0,
  },

  // ── pat-h4 ───────────────────────────────────────────────────────────────
  // Rule: col0 = [outer outline shape, inner solid shape scale 0.45];
  // col1 = inner alone (solid, scale 0.45); col2 = outer alone (outline).
  // Row pairs (outer/inner): square/circle, pentagon/triangle,
  // hexagon/diamond. Missing cell (2,2) = hexagon outline.
  {
    kind: 'matrix',
    id: 'pat-h4',
    category: 'patterns',
    difficulty: 'hard',
    grid: [
      [{ shape: 'square', fill: 'outline' }, { shape: 'circle', fill: 'solid', scale: 0.45 }],
      g('circle', { fill: 'solid', scale: 0.45 }), g('square', { fill: 'outline' }),
      [{ shape: 'pentagon', fill: 'outline' }, { shape: 'triangle', fill: 'solid', scale: 0.45 }],
      g('triangle', { fill: 'solid', scale: 0.45 }), g('pentagon', { fill: 'outline' }),
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'diamond', fill: 'solid', scale: 0.45 }],
      g('diamond', { fill: 'solid', scale: 0.45 }),
    ],
    options: [
      g('hexagon', { fill: 'outline' }),  // correct
      g('hexagon', { fill: 'solid' }),    // right shape, wrong fill
      g('pentagon', { fill: 'outline' }), // wrong shape, right fill (copy of grid cell)
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'diamond', fill: 'solid', scale: 0.45 }], // copy of grid cell (2,0)
    ],
    correct: 0,
  },

  // ── pat-h5 ───────────────────────────────────────────────────────────────
  // Rule: shape latin square (cross/star/hexagon); fill by column
  // solid/outline/solid; where fill is outline, add a center dot:
  // cell = [shape outline, dot count 1 scale 0.5].
  //   cross-solid   star-outline+dot    hexagon-solid
  //   star-solid    hexagon-outline+dot cross-solid
  //   hexagon-solid cross-outline+dot   ?
  // Col 2 fill is solid; row 2 / col 2 shape by elimination = star
  // → star solid.
  {
    kind: 'matrix',
    id: 'pat-h5',
    category: 'patterns',
    difficulty: 'hard',
    grid: [
      g('cross', { fill: 'solid' }),
      [{ shape: 'star', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.5 }],
      g('hexagon', { fill: 'solid' }),
      g('star', { fill: 'solid' }),
      [{ shape: 'hexagon', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.5 }],
      g('cross', { fill: 'solid' }),
      g('hexagon', { fill: 'solid' }),
      [{ shape: 'cross', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.5 }],
    ],
    options: [
      g('star', { fill: 'solid' }),    // correct
      [{ shape: 'star', fill: 'outline' }, { shape: 'dot', count: 1, scale: 0.5 }], // right shape, wrong column fill (copy of grid cell)
      g('hexagon', { fill: 'solid' }), // wrong shape (already in row 2; copy of grid cell)
      g('cross', { fill: 'solid' }),   // wrong shape (already in row 2; copy of grid cell)
    ],
    correct: 0,
  },
]
