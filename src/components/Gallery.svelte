<script lang="ts">
  import { POOL } from '../lib/puzzles'
  import PuzzleView from './PuzzleView.svelte'

  let index = $state(0)

  function prev() {
    if (index > 0) index--
  }

  function next() {
    if (index < POOL.length - 1) index++
  }

  function onkeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
  }

</script>

<svelte:window {onkeydown} />

<div class="gallery-wrapper">
  <div class="gallery-header">
    <p class="label">
      {index + 1} / {POOL.length} · {POOL[index].id} · {POOL[index].category} · {POOL[index].difficulty} · {POOL[index].kind}
      <span class="note">(correct answer outlined indigo)</span>
    </p>
    <div class="nav-buttons">
      <button onclick={prev} disabled={index === 0}>← Prev</button>
      <button onclick={next} disabled={index === POOL.length - 1}>Next →</button>
    </div>
  </div>

  <PuzzleView question={{ puzzle: POOL[index], options: POOL[index].options, correct: POOL[index].correct }} locked reveal={POOL[index].correct} />
</div>

<style>
  .gallery-wrapper {
    padding: 20px 0;
  }

  .gallery-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .note {
    opacity: 0.7;
  }

  .nav-buttons {
    display: flex;
    gap: 10px;
  }
</style>
