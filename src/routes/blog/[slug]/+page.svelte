<script lang="ts">
  import type { BlogPost } from '$lib/models/blog.model.ts';

  export let data: BlogPost;
</script>

<svelte:head>
  <title>{data.metadata.title} — 4m00se Blog</title>
</svelte:head>

<main>
  <svelte:component this={data.content} />
</main>
