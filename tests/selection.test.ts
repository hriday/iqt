import { describe, it, expect } from 'vitest'
import { selectRun } from '../src/lib/selection'
import type { Puzzle, Category, Difficulty } from '../src/lib/types'

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const CATS: Category[] = ['patterns', 'sequences', 'spatial']
const DIFFS: Difficulty[] = ['easy', 'medium', 'hard']
const fakePool: Puzzle[] = CATS.flatMap((category) =>
  DIFFS.flatMap((difficulty) =>
    Array.from({ length: 5 }, (_, i): Puzzle => ({
      id: `${category}-${difficulty}-${i}`, category, difficulty, kind: 'odd-one-out',
      options: [[{ shape: 'circle' }], [{ shape: 'square' }], [{ shape: 'star' }], [{ shape: 'cross' }]],
      correct: 2,
    })),
  ),
)

describe('selectRun', () => {
  const run = selectRun(fakePool, mulberry32(42))

  it('draws 15 unique questions', () => {
    expect(run).toHaveLength(15)
    expect(new Set(run.map((q) => q.puzzle.id)).size).toBe(15)
  })
  it('meets quotas: per category 2 easy / 2 medium / 1 hard', () => {
    for (const cat of CATS) {
      const mine = run.filter((q) => q.puzzle.category === cat)
      expect(mine.filter((q) => q.puzzle.difficulty === 'easy')).toHaveLength(2)
      expect(mine.filter((q) => q.puzzle.difficulty === 'medium')).toHaveLength(2)
      expect(mine.filter((q) => q.puzzle.difficulty === 'hard')).toHaveLength(1)
    }
  })
  it('orders easy → medium → hard', () => {
    const order = run.map((q) => DIFFS.indexOf(q.puzzle.difficulty))
    expect(order).toEqual([...order].sort((a, b) => a - b))
  })
  it('shuffles options but keeps correct pointing at the same cell', () => {
    for (const q of run) {
      expect(q.options).toHaveLength(q.puzzle.options.length)
      expect(q.options[q.correct]).toEqual(q.puzzle.options[q.puzzle.correct])
    }
  })
  it('different seeds give different runs', () => {
    const other = selectRun(fakePool, mulberry32(7))
    expect(other.map((q) => q.puzzle.id)).not.toEqual(run.map((q) => q.puzzle.id))
  })
})
