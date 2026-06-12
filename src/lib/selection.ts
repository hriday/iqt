import type { Puzzle, Category, Difficulty, Cell } from './types'

export type RNG = () => number
export interface RunQuestion { puzzle: Puzzle; options: Cell[]; correct: number }

const CATEGORIES: Category[] = ['patterns', 'sequences', 'spatial', 'analogies']
const QUOTA: [Difficulty, number][] = [['easy', 1], ['medium', 1], ['hard', 1], ['expert', 2]]
const DIFF_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

function shuffle<T>(items: T[], rng: RNG): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function selectRun(pool: Puzzle[], rng: RNG): RunQuestion[] {
  const picked: Puzzle[] = []
  for (const category of CATEGORIES) {
    for (const [difficulty, n] of QUOTA) {
      const candidates = pool.filter((p) => p.category === category && p.difficulty === difficulty)
      picked.push(...shuffle(candidates, rng).slice(0, n))
    }
  }
  const ordered = DIFF_ORDER.flatMap((d) => shuffle(picked.filter((p) => p.difficulty === d), rng))
  return ordered.map((puzzle) => {
    const perm = shuffle(puzzle.options.map((_, i) => i), rng)
    return { puzzle, options: perm.map((i) => puzzle.options[i]), correct: perm.indexOf(puzzle.correct) }
  })
}
