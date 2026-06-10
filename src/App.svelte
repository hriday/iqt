<script lang="ts">
  import Intro from './components/Intro.svelte'
  import Test from './components/Test.svelte'
  import Gallery from './components/Gallery.svelte'
  import { POOL } from './lib/puzzles'
  import { selectRun, type RunQuestion } from './lib/selection'
  import type { RunRecord } from './lib/scoring'

  const gallery = new URLSearchParams(location.search).has('gallery')
  let screen: 'intro' | 'test' | 'results' = $state('intro')
  let run: RunQuestion[] = $state([])
  let records: RunRecord[] = $state([])

  function start() { run = selectRun(POOL, Math.random); screen = 'test' }
  function done(r: RunRecord[]) { records = r; screen = 'results' }
</script>

{#if gallery}
  <Gallery />
{:else if screen === 'intro'}
  <Intro onStart={start} />
{:else if screen === 'test'}
  <Test questions={run} onDone={done} />
{:else}
  <pre>{JSON.stringify(records, null, 2)}</pre>
{/if}
