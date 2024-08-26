<script lang="ts">
  import type { BlogPageData } from '$lib/models/blog.model.ts';

  export let data: BlogPageData;
</script>

<svelte:head>
  <title>4m00se Blog</title>
</svelte:head>

<main>
  <h1>Blog</h1>
  <ul>
    {#each data.posts as post}
      <li>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </li>
    {/each}
  </ul>
</main>
