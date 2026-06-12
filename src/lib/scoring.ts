import type { Category, Difficulty } from './types'

export const QUESTION_SECONDS = 35
export const PENALTY_AFTER_SECONDS = 30 // answers slower than this lose LATE_PENALTY
export const LATE_PENALTY = 0.5
const PENALTY_REMAINING = QUESTION_SECONDS - PENALTY_AFTER_SECONDS
const POINTS: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3, expert: 4 }

export interface RunRecord {
  correct: boolean
  category: Category
  difficulty: Difficulty
  remaining: number // seconds left when answered
}

// Speed bonus tapers from +0.5 (instant) to 0 at the 30s mark; past it every
// answer — right or wrong — pays the flat late penalty. Total clamps at 0.
export function rawScore(records: { correct: boolean; difficulty: Difficulty; remaining: number }[]): number {
  const sum = records.reduce((sum, r) => {
    const penalty = r.remaining < PENALTY_REMAINING ? LATE_PENALTY : 0
    if (!r.correct) return sum - penalty
    const bonus = 0.5 * Math.max(0, Math.min(1, (r.remaining - PENALTY_REMAINING) / PENALTY_AFTER_SECONDS))
    return sum + POINTS[r.difficulty] + bonus - penalty
  }, 0)
  return Math.max(0, sum)
}

export function maxRaw(records: { difficulty: Difficulty }[]): number {
  return records.reduce((sum, r) => sum + POINTS[r.difficulty] + 0.5, 0)
}

// Fraction of max below GUESS_FLOOR (≈ chance level on 4–5 options) maps to 70;
// a mild power curve above it makes top scores demand near-perfect runs.
const GUESS_FLOOR = 0.25
const CURVE = 1.1

export function toIQ(raw: number, max: number): number {
  const f = raw / max
  const corrected = Math.max(0, (f - GUESS_FLOOR) / (1 - GUESS_FLOOR))
  const iq = 70 + 75 * Math.pow(corrected, CURVE)
  return Math.round(Math.min(145, Math.max(70, iq)))
}

// Standard normal CDF via Abramowitz–Stegun erf approximation (|error| < 1.5e-7)
export function percentile(iq: number): number {
  const z = (iq - 100) / 15
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const poly = ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t
  const erf = 1 - poly * Math.exp(-x * x)
  const cdf = 0.5 * (1 + Math.sign(z) * erf)
  return Math.round(cdf * 100)
}

export interface Title { name: string; emoji: string }
export function titleFor(iq: number): Title {
  if (iq >= 130) return { name: 'Pattern Prodigy', emoji: '🧬' }
  if (iq >= 115) return { name: 'Logic Llama', emoji: '🦙' }
  if (iq >= 100) return { name: 'Puzzle Pathfinder', emoji: '🧭' }
  if (iq >= 85) return { name: 'Curious Cadet', emoji: '🚀' }
  return { name: 'Rogue Variable', emoji: '🎲' }
}
