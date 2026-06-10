<script lang="ts">
  import { POOL } from '../lib/puzzles'
  import PuzzleView from './PuzzleView.svelte'
</script>

<h1 class="label">GALLERY — ALL {POOL.length} PUZZLES (correct answer outlined indigo)</h1>
{#each POOL as puzzle}
  <section>
    <p class="label">{puzzle.id} · {puzzle.category} · {puzzle.difficulty} · {puzzle.kind}</p>
    <PuzzleView question={{ puzzle, options: puzzle.options, correct: puzzle.correct }} locked reveal={puzzle.correct} />
  </section>
{/each}

<style>
  section { border-bottom: 1px solid var(--border); padding: 20px 0; }
</style>
