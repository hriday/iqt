import { describe, it, expect } from 'vitest'
import { POOL } from '../src/lib/puzzles'
import type { Cell, Glyph } from '../src/lib/types'

/** Normalise a Cell to a stable canonical string for comparison.
 *
 * Per-glyph defaults applied: fill ?? 'solid', scale ?? 1, mirror ?? false,
 * rotation normalised to [0, 360). Circle is rotation-invariant so rotation
 * is dropped for circle. count is kept only for shape 'dot'.
 */
function canonical(cell: Cell): string {
  const glyphs = cell.map((g: Glyph) => {
    const fill = g.fill ?? 'solid'
    const scale = g.scale ?? 1
    const mirror = g.mirror ?? false
    const rawRot = g.rotation ?? 0
    const rotation = ((rawRot % 360) + 360) % 360

    const norm: Record<string, unknown> = { shape: g.shape, fill, scale, mirror }
    if (g.shape !== 'circle') norm.rotation = rotation
    if (g.shape === 'dot') norm.count = g.count
    return norm
  })
  return JSON.stringify(glyphs)
}

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

      const canonicals = p.options.map(canonical)
      if (p.kind === 'matrix' || p.kind === 'sequence' || p.kind === 'rotation') {
        // All options must be canonically unique
        expect(
          new Set(canonicals).size,
          `${p.id} has duplicate options (canonical)`,
        ).toBe(p.options.length)
      } else {
        // odd-one-out: correct option must differ from every other option;
        // lookalike "same" items may legitimately share a canonical form.
        const correctCanon = canonicals[p.correct]
        for (let i = 0; i < canonicals.length; i++) {
          if (i === p.correct) continue
          expect(
            correctCanon,
            `${p.id}: correct option (index ${p.correct}) is canonically identical to option ${i}`,
          ).not.toBe(canonicals[i])
        }
      }

      if (p.kind === 'matrix') expect(p.grid, p.id).toHaveLength(8)
      if (p.kind === 'sequence') expect(p.sequence.length, p.id).toBeGreaterThanOrEqual(3)
    }
  })
})
