<script lang="ts">
  import { QUESTION_SECONDS, PENALTY_AFTER_SECONDS } from '../lib/scoring'
  let { remaining = $bindable(QUESTION_SECONDS), epoch = 0 }: { remaining?: number; epoch?: number } = $props()
  const PENALTY_REMAINING = QUESTION_SECONDS - PENALTY_AFTER_SECONDS
  $effect(() => {
    void epoch // restart interval each question
    const start = Date.now()
    const full = QUESTION_SECONDS
    const t = setInterval(() => {
      remaining = Math.max(0, full - (Date.now() - start) / 1000)
    }, 100)
    return () => clearInterval(t)
  })
  const R = 15
  const CIRC = 2 * Math.PI * R
</script>

<span class="timer" class:low={remaining <= 10} class:penalty={remaining < PENALTY_REMAINING}>
  <svg viewBox="0 0 36 36" width="22" height="22">
    <circle cx="18" cy="18" r={R} fill="none" stroke="var(--border)" stroke-width="3" />
    <circle cx="18" cy="18" r={R} fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
      stroke-dasharray={CIRC} stroke-dashoffset={CIRC * (1 - remaining / QUESTION_SECONDS)} transform="rotate(-90 18 18)" />
  </svg>
  <span>{Math.ceil(remaining)}s</span>
</span>

<style>
  .timer { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); font-size: 12px; }
  .timer.low { color: #f59e0b; }
  .timer.penalty { color: #ef4444; }
</style>
