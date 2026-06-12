<script lang="ts">
  import { rawScore, maxRaw, toIQ, percentile, titleFor, type RunRecord } from '../lib/scoring'
  import { buildShareText, copyText } from '../lib/share'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  let { records, onRetest }: { records: RunRecord[]; onRetest: () => void } = $props()

  // Results is recreated per run, so capturing the initial records is intended.
  // svelte-ignore state_referenced_locally
  const iq = toIQ(rawScore(records), maxRaw(records))
  const pct = percentile(iq)
  const top = Math.max(1, 100 - pct)
  const title = titleFor(iq)
  const subject = 1000 + Math.floor(Math.random() * 9000)
  const cats = (['patterns', 'sequences', 'spatial', 'analogies'] as const).map((c) => ({
    name: c.toUpperCase(),
    right: records.filter((r) => r.category === c && r.correct).length,
    total: records.filter((r) => r.category === c).length,
  }))

  const shownIQ = tweened(70, { duration: 1400, easing: cubicOut })
  const shownPct = tweened(0, { duration: 1400, easing: cubicOut })
  shownIQ.set(iq)
  shownPct.set(pct)

  let copied = $state(false)
  let fallbackText = $state('')
  async function share() {
    const text = buildShareText(iq, title, top)
    if (await copyText(text)) {
      copied = true
      setTimeout(() => (copied = false), 2000)
    } else fallbackText = text
  }
</script>

<div class="panel">
  <div class="label">ANALYSIS COMPLETE</div>
  <p class="sub">Subject #{subject} · Pattern Cognition Assessment</p>
  <div class="score">{Math.round($shownIQ)}</div>
  <div class="label">EST. IQ SCORE · FOR ENTERTAINMENT ONLY</div>
  <div class="badge">{title.emoji} {title.name}</div>
  <div class="label ptitle">PERCENTILE — TOP {top}%</div>
  <div class="track"><div class="fill" style="width:{$shownPct}%"></div></div>
  <div class="cats">
    {#each cats as c}
      <div class="cat"><div class="label">{c.name}</div><div class="n">{c.right}/{c.total}</div></div>
    {/each}
  </div>
  <div class="actions">
    <button class="primary" onclick={share}>{copied ? '✓ COPIED' : '⎘ COPY RESULT'}</button>
    <button onclick={onRetest}>↻ RETEST</button>
  </div>
  {#if fallbackText}<textarea readonly rows="3">{fallbackText}</textarea>{/if}
</div>

<style>
  .panel { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 28px 24px; text-align: center; margin-top: 6vh; }
  .sub { color: var(--dim); font-size: 13px; }
  .score { font-size: 64px; font-weight: 700; color: var(--accent); text-shadow: 0 0 24px var(--glow); line-height: 1.1; margin-top: 12px; }
  .badge {
    display: inline-block; margin: 18px 0; padding: 6px 16px; border-radius: 999px; font-size: 14px;
    color: #a5b4fc; background: rgba(129, 140, 248, 0.1); border: 1px solid #4338ca;
  }
  .ptitle { text-align: left; margin-bottom: 6px; }
  .track { height: 8px; background: var(--border); border-radius: 99px; margin-bottom: 20px; }
  .fill { height: 8px; border-radius: 99px; background: linear-gradient(90deg, var(--accent), var(--accent2)); box-shadow: 0 0 10px var(--glow); }
  .cats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }
  .cat { background: var(--cell); border: 1px solid var(--border2); border-radius: 8px; padding: 10px 4px; overflow: hidden; }
  .n { font-size: 18px; color: var(--ink); margin-top: 4px; }
  .actions { display: flex; gap: 8px; }
  .actions button { flex: 1; padding: 12px 0; font-size: 12px; }
  textarea { width: 100%; margin-top: 12px; background: var(--cell); color: var(--text); border: 1px solid var(--border2); border-radius: 8px; font-family: var(--mono); }
</style>
