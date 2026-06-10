import { describe, it, expect } from 'vitest'
import { rawScore, maxRaw, toIQ, percentile, titleFor, QUESTION_SECONDS, type RunRecord } from '../src/lib/scoring'

const rec = (over: Partial<RunRecord>): RunRecord =>
  ({ correct: true, category: 'patterns', difficulty: 'easy', remaining: 0, ...over })

describe('rawScore', () => {
  it('awards base points by difficulty', () => {
    expect(rawScore([rec({ difficulty: 'easy' })])).toBe(1)
    expect(rawScore([rec({ difficulty: 'medium' })])).toBe(2)
    expect(rawScore([rec({ difficulty: 'hard' })])).toBe(3)
  })
  it('awards nothing for wrong answers', () => {
    expect(rawScore([rec({ correct: false, remaining: QUESTION_SECONDS })])).toBe(0)
  })
  it('adds up to +0.5 speed bonus, linear in remaining time', () => {
    expect(rawScore([rec({ remaining: QUESTION_SECONDS })])).toBe(1.5)
    expect(rawScore([rec({ remaining: QUESTION_SECONDS / 2 })])).toBeCloseTo(1.25)
  })
})

describe('maxRaw / toIQ', () => {
  const run = [
    ...Array(6).fill(rec({ difficulty: 'easy' })),
    ...Array(6).fill(rec({ difficulty: 'medium' })),
    ...Array(3).fill(rec({ difficulty: 'hard' })),
  ]
  it('max raw for the standard 6/6/3 run is 27 base + 7.5 bonus', () => {
    expect(maxRaw(run)).toBe(34.5)
  })
  it('maps 0 → 70 and max → 145, clamped and rounded', () => {
    expect(toIQ(0, 34.5)).toBe(70)
    expect(toIQ(34.5, 34.5)).toBe(145)
    expect(toIQ(17.25, 34.5)).toBe(108)
    expect(toIQ(99, 34.5)).toBe(145)
  })
})

describe('percentile', () => {
  it('matches the normal(100,15) CDF', () => {
    expect(percentile(100)).toBe(50)
    expect(percentile(130)).toBe(98)
    expect(percentile(70)).toBe(2)
  })
})

describe('titleFor', () => {
  it('assigns bands', () => {
    expect(titleFor(145).name).toBe('Pattern Prodigy')
    expect(titleFor(130).name).toBe('Pattern Prodigy')
    expect(titleFor(129).name).toBe('Logic Llama')
    expect(titleFor(115).name).toBe('Logic Llama')
    expect(titleFor(100).name).toBe('Puzzle Pathfinder')
    expect(titleFor(85).name).toBe('Curious Cadet')
    expect(titleFor(84).name).toBe('Rogue Variable')
  })
})
