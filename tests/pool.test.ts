import { describe, it, expect } from 'vitest'
import { POOL } from '../src/lib/puzzles'

describe('puzzle pool', () => {
  it('has 45 puzzles: 5 per category × difficulty', () => {
    expect(POOL).toHaveLength(45)
    for (const category of ['patterns', 'sequences', 'spatial'] as const)
      for (const difficulty of ['easy', 'medium', 'hard'] as const)
        expect(POOL.filter((p) => p.category === category && p.difficulty === difficulty)).toHaveLength(5)
  })
  it('has unique ids', () => {
    expect(new Set(POOL.map((p) => p.id)).size).toBe(POOL.length)
  })
  it('every puzzle is well-formed', () => {
    for (const p of POOL) {
      expect(p.options.length, p.id).toBeGreaterThanOrEqual(4)
      expect(p.options.length, p.id).toBeLessThanOrEqual(6)
      expect(p.correct, p.id).toBeGreaterThanOrEqual(0)
      expect(p.correct, p.id).toBeLessThan(p.options.length)
      const serialized = p.options.map((o) => JSON.stringify(o))
      expect(new Set(serialized).size, `${p.id} has duplicate options`).toBe(p.options.length)
      if (p.kind === 'matrix') expect(p.grid, p.id).toHaveLength(8)
      if (p.kind === 'sequence') expect(p.sequence.length, p.id).toBeGreaterThanOrEqual(3)
    }
  })
})
