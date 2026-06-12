import { describe, it, expect } from 'vitest'
import {
  rawScore, maxRaw, toIQ, percentile, titleFor,
  QUESTION_SECONDS, PENALTY_AFTER_SECONDS, type RunRecord,
} from '../src/lib/scoring'

// remaining when exactly PENALTY_AFTER_SECONDS have elapsed: bonus is 0, no penalty
const AT_LIMIT = QUESTION_SECONDS - PENALTY_AFTER_SECONDS

const rec = (over: Partial<RunRecord>): RunRecord =>
  ({ correct: true, category: 'patterns', difficulty: 'easy', remaining: AT_LIMIT, ...over })

describe('rawScore', () => {
  it('awards base points by difficulty', () => {
    expect(rawScore([rec({ difficulty: 'easy' })])).toBe(1)
    expect(rawScore([rec({ difficulty: 'medium' })])).toBe(2)
    expect(rawScore([rec({ difficulty: 'hard' })])).toBe(3)
    expect(rawScore([rec({ difficulty: 'expert' })])).toBe(4)
  })
  it('awards nothing for wrong answers', () => {
    expect(rawScore([rec({ correct: false, remaining: QUESTION_SECONDS })])).toBe(0)
  })
  it('adds up to +0.5 speed bonus, linear down to zero at the 30s mark', () => {
    expect(rawScore([rec({ remaining: QUESTION_SECONDS })])).toBe(1.5)
    expect(rawScore([rec({ remaining: AT_LIMIT + PENALTY_AFTER_SECONDS / 2 })])).toBeCloseTo(1.25)
    expect(rawScore([rec({ remaining: AT_LIMIT })])).toBe(1)
  })
  it('subtracts 0.5 for answers slower than 30s, right or wrong', () => {
    expect(rawScore([rec({ remaining: 0 })])).toBe(0.5)
    expect(rawScore([rec({ difficulty: 'hard', remaining: 0 })])).toBe(2.5)
    expect(rawScore([
      rec({ correct: false, remaining: 0 }),
      rec({ difficulty: 'hard' }),
    ])).toBe(2.5)
  })
  it('never goes below zero', () => {
    expect(rawScore([rec({ correct: false, remaining: 0 })])).toBe(0)
  })
})

describe('maxRaw / toIQ', () => {
  const run = [
    ...Array(4).fill(rec({ difficulty: 'easy' })),
    ...Array(4).fill(rec({ difficulty: 'medium' })),
    ...Array(4).fill(rec({ difficulty: 'hard' })),
    ...Array(8).fill(rec({ difficulty: 'expert' })),
  ]
  it('max raw for the standard 4/4/4/8 run is 56 base + 10 bonus', () => {
    expect(maxRaw(run)).toBe(66)
  })
  it('maps 0 → 70 and max → 145, clamped and rounded', () => {
    expect(toIQ(0, 66)).toBe(70)
    expect(toIQ(66, 66)).toBe(145)
    expect(toIQ(16.5, 66)).toBe(70) // 25% guessing floor
    expect(toIQ(33, 66)).toBe(92) // half of max → corrected 1/3 on the curve
    expect(toIQ(99, 66)).toBe(145)
  })
  it('chance-level play stays at the floor', () => {
    expect(toIQ(0.22 * 66, 66)).toBe(70)
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
