<script lang="ts">
  let { onStart }: { onStart: () => void } = $props()
</script>

<div class="panel">
  <div class="label">PATTERN COGNITION ASSESSMENT</div>
  <h1>IQT<span class="cursor">_</span></h1>
  <p class="sub">20 visual puzzles · ~8 minutes · no words, just patterns</p>
  <ul>
    <li>Each question has a soft 35s timer — answer within 30s for a speed bonus; slower costs half a point, but it never cuts you off.</li>
    <li>Answers lock when you click. No going back.</li>
    <li>Four categories: patterns, sequences, spatial, analogies.</li>
  </ul>
  <button class="primary big" onclick={onStart}>▶ BEGIN ASSESSMENT</button>
  <p class="disclaimer">For entertainment only — this is a game, not a medical or psychometric instrument.</p>
</div>

<style>
  .panel { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 32px 24px; text-align: center; margin-top: 8vh; }
  h1 { font-size: 56px; margin: 8px 0; color: var(--accent); text-shadow: 0 0 24px var(--glow); }
  .cursor { animation: blink 1.2s step-end infinite; }
  @keyframes blink { 50% { opacity: 0; } }
  .sub { color: var(--dim); font-size: 14px; }
  ul { text-align: left; color: var(--dim); font-size: 13px; line-height: 1.8; margin: 20px auto; max-width: 420px; }
  .big { font-size: 15px; padding: 14px 28px; margin-top: 8px; }
  .disclaimer { color: var(--muted); font-size: 11px; margin-top: 18px; }
</style>
