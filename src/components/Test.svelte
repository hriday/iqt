<script lang="ts">
  import type { RunQuestion } from '../lib/selection'
  import { QUESTION_SECONDS, type RunRecord } from '../lib/scoring'
  import PuzzleView from './PuzzleView.svelte'
  import TimerRing from './TimerRing.svelte'

  let { questions, onDone }: { questions: RunQuestion[]; onDone: (records: RunRecord[]) => void } = $props()
  let index = $state(0)
  let locked = $state(false)
  let selected = $state(-1)
  let remaining = $state(QUESTION_SECONDS)
  const records: RunRecord[] = []

  function answer(i: number) {
    if (locked) return
    locked = true
    selected = i
    const q = questions[index]
    records.push({ correct: i === q.correct, category: q.puzzle.category, difficulty: q.puzzle.difficulty, remaining })
    setTimeout(() => {
      if (index + 1 >= questions.length) return onDone(records)
      remaining = QUESTION_SECONDS; index += 1; locked = false; selected = -1
    }, 350)
  }
</script>

<div class="head">
  <span class="label">Q.{String(index + 1).padStart(2, '0')} / {questions.length}</span>
  <TimerRing bind:remaining epoch={index} />
</div>
<div class="track"><div class="fill" style="width:{(index / questions.length) * 100}%"></div></div>
{#key index}
  <PuzzleView question={questions[index]} {locked} {selected} onAnswer={answer} />
{/key}

<style>
  .head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .track { height: 4px; background: var(--border); border-radius: 2px; margin-bottom: 22px; }
  .fill {
    height: 4px; border-radius: 2px; transition: width 0.3s;
    background: linear-gradient(90deg, var(--accent), var(--accent2)); box-shadow: 0 0 8px var(--glow);
  }
</style>
