<script lang="ts">
  import type { RunQuestion } from '../lib/selection'
  import GlyphSvg from './GlyphSvg.svelte'

  let { question, locked = false, selected = -1, reveal = -1, onAnswer = () => {} }: {
    question: RunQuestion; locked?: boolean; selected?: number; reveal?: number
    onAnswer?: (i: number) => void
  } = $props()

  const PROMPTS: Record<string, string> = {
    matrix: 'Complete the pattern',
    sequence: 'What comes next?',
    'odd-one-out': 'Which one doesn’t belong?',
    rotation: 'Which is the same shape, rotated — not mirrored?',
  }
  const LETTERS = 'ABCDEF'
</script>

<div class="puzzle">
  <p class="prompt">{PROMPTS[question.puzzle.kind]}</p>

  {#if question.puzzle.kind === 'matrix'}
    <div class="grid3">
      {#each question.puzzle.grid as cell}<div class="cell"><GlyphSvg {cell} size={64} /></div>{/each}
      <div class="cell missing">?</div>
    </div>
  {:else if question.puzzle.kind === 'sequence'}
    <div class="row">
      {#each question.puzzle.sequence as cell}<div class="cell"><GlyphSvg {cell} size={60} /></div>{/each}
      <div class="cell missing">?</div>
    </div>
  {:else if question.puzzle.kind === 'rotation'}
    <div class="row"><div class="cell base"><GlyphSvg cell={question.puzzle.base} size={88} /></div></div>
  {/if}

  <div class="opts">
    {#each question.options as cell, i}
      <button
        class="opt" class:picked={selected === i} class:answer={reveal === i}
        disabled={locked} onclick={() => onAnswer(i)}
      >
        <span class="label">{LETTERS[i]}</span>
        <GlyphSvg {cell} size={56} />
      </button>
    {/each}
  </div>
</div>

<style>
  .prompt { color: var(--dim); font-size: 14px; text-align: center; }
  .grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 320px; margin: 0 auto 20px; }
  .row { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; flex-wrap: wrap; }
  .cell {
    aspect-ratio: 1; min-width: 64px; display: flex; align-items: center; justify-content: center;
    background: var(--cell); border: 1px solid var(--border2); border-radius: 8px;
  }
  .cell.base { padding: 8px; }
  .missing { border: 1px dashed var(--accent); color: var(--accent); font-size: 22px; background: rgba(34, 211, 238, 0.05); }
  .opts { display: grid; grid-template-columns: repeat(auto-fit, minmax(86px, 1fr)); gap: 8px; }
  .opt {
    display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 10px 4px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .opt:hover:not(:disabled) { border-color: var(--accent); }
  .opt.picked { border-color: var(--accent); background: rgba(34, 211, 238, 0.08); box-shadow: 0 0 12px var(--glow); }
  .opt.answer { border-color: var(--accent2); }
</style>
