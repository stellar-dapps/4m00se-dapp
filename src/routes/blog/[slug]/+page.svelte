<script lang="ts">
  import type { BlogPost } from '$lib/models/blog.model.ts';

  export let data: BlogPost;
</script>

<svelte:head>
  <title>{data.metadata.title} — 4m00se Blog</title>
</svelte:head>

<div class="created-at">{data.metadata.createdAt}</div>

<h1>{data.metadata.title}</h1>

<svelte:component this={data.content} />

<style>
  .created-at {
    color: var(--pico-muted-color);
  }
</style>
