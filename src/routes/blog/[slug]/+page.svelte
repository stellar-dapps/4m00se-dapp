<script lang="ts">
  import type { PageData } from './$types';
  import type { SvelteComponent } from 'svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  type C = $$Generic<typeof SvelteComponent<any, any, any>>;
  let component = $derived(data.component as unknown as C);

  const SvelteComponent_1 = $derived(component);
</script>

<svelte:head>
  <title>{data?.frontmatter?.title} — 4m00se Blog</title>
</svelte:head>

<div class="meta">{data?.frontmatter?.date}</div>

<h1>{data?.frontmatter?.title}</h1>

<SvelteComponent_1 />

<style>
  .meta {
    color: var(--pico-muted-color);
  }
</style>
