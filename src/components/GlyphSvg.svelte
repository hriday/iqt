<script lang="ts">
  import type { Cell, Glyph } from '../lib/types'
  import { SHAPE_PATHS, DOT_LAYOUTS } from '../lib/shapes'

  let { cell, size = 72 }: { cell: Cell; size?: number } = $props()
  const uid = Math.random().toString(36).slice(2, 8)
  const INK = '#7dd3fc'

  function transform(g: Glyph): string {
    const s = g.scale ?? 1
    return `translate(50 50) rotate(${g.rotation ?? 0}) scale(${g.mirror ? -s : s} ${s}) translate(-50 -50)`
  }
  type Layer = { fill: string; stroke: boolean; clip: string | null }
  function layers(g: Glyph): Layer[] {
    const f = g.fill ?? 'solid'
    if (f === 'solid') return [{ fill: INK, stroke: false, clip: null }]
    if (f === 'outline') return [{ fill: 'none', stroke: true, clip: null }]
    if (f === 'hatch') return [{ fill: `url(#hatch-${uid})`, stroke: true, clip: null }]
    return [
      { fill: 'none', stroke: true, clip: null },
      { fill: INK, stroke: false, clip: `url(#${f.slice(5)}-${uid})` },
    ]
  }
</script>

<svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
  <defs>
    <pattern id="hatch-{uid}" patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="7" stroke={INK} stroke-width="2.5" />
    </pattern>
    <clipPath id="left-{uid}"><rect x="0" y="0" width="50" height="100" /></clipPath>
    <clipPath id="right-{uid}"><rect x="50" y="0" width="50" height="100" /></clipPath>
    <clipPath id="top-{uid}"><rect x="0" y="0" width="100" height="50" /></clipPath>
    <clipPath id="bottom-{uid}"><rect x="0" y="50" width="100" height="50" /></clipPath>
  </defs>
  {#each cell as glyph}
    <g transform={transform(glyph)}>
      {#if glyph.shape === 'dot'}
        {#each DOT_LAYOUTS[Math.min(9, Math.max(1, glyph.count ?? 1))] as [cx, cy]}
          <circle {cx} {cy} r="8" fill={INK} />
        {/each}
      {:else}
        {#each layers(glyph) as layer}
          {#if glyph.shape === 'circle'}
            <circle cx="50" cy="50" r="34" fill={layer.fill} stroke={layer.stroke ? INK : 'none'} stroke-width="4" clip-path={layer.clip} />
          {:else}
            <path d={SHAPE_PATHS[glyph.shape]} fill={layer.fill} stroke={layer.stroke ? INK : 'none'} stroke-width="4" stroke-linejoin="round" clip-path={layer.clip} />
          {/if}
        {/each}
      {/if}
    </g>
  {/each}
</svg>
