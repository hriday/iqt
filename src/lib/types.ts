export type Category = 'patterns' | 'sequences' | 'spatial' | 'analogies'
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'
export type Shape =
  | 'circle' | 'square' | 'triangle' | 'diamond' | 'pentagon' | 'hexagon'
  | 'star' | 'cross' | 'arrow' | 'dot' | 'L' | 'flag'
export type Fill = 'solid' | 'outline' | 'hatch' | 'half-left' | 'half-right' | 'half-top' | 'half-bottom'

export interface Glyph {
  shape: Shape
  fill?: Fill        // default 'solid'
  rotation?: number  // degrees, clockwise, around cell center
  scale?: number     // default 1
  count?: number     // only for shape 'dot': 1–9 dice-style dots
  mirror?: boolean   // horizontal flip (for chiral shapes L/flag)
}
export type Cell = Glyph[] // layered glyphs, drawn in order

interface PuzzleBase {
  id: string
  category: Category
  difficulty: Difficulty
  options: Cell[]    // 4–6 answer cells
  correct: number    // index into options
}
export interface MatrixPuzzle extends PuzzleBase { kind: 'matrix'; grid: Cell[] }       // 8 cells row-major, bottom-right missing
export interface SequencePuzzle extends PuzzleBase { kind: 'sequence'; sequence: Cell[] } // 3–4 cells, next is missing
export interface OddOneOutPuzzle extends PuzzleBase { kind: 'odd-one-out' }              // options ARE the items; correct = the odd one
export interface RotationPuzzle extends PuzzleBase { kind: 'rotation'; base: Cell }      // pick rotation of base (distractors mirrored)
export interface AnalogyPuzzle extends PuzzleBase { kind: 'analogy'; pair: [Cell, Cell, Cell] } // A → B ∷ C → ?
export type Puzzle = MatrixPuzzle | SequencePuzzle | OddOneOutPuzzle | RotationPuzzle | AnalogyPuzzle
