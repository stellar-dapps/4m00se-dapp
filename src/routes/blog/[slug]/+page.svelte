<script lang="ts">
  import type { PageData } from './$types';
  import type { SvelteComponent } from 'svelte';

  export let data: PageData;

  type C = $$Generic<typeof SvelteComponent<any, any, any>>;
  $: component = data.component as unknown as C;
</script>

<svelte:head>
  <title>{data?.frontmatter?.title} — 4m00se Blog</title>
</svelte:head>

<div class="meta">{data?.frontmatter?.date}</div>

<h1>{data?.frontmatter?.title}</h1>

<svelte:component this={component} />

<style>
  .meta {
    color: var(--pico-muted-color);
  }
</style>
