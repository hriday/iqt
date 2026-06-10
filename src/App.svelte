<script lang="ts">
  import Gallery from './components/Gallery.svelte'
  const gallery = new URLSearchParams(location.search).has('gallery')
</script>

{#if gallery}<Gallery />{:else}<main><p class="label">IQT — under construction</p></main>{/if}
