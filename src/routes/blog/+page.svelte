<script lang="ts">
  import type { PageData } from './$types';
  import { goto } from '$app/navigation';

  export let data: PageData;
</script>

<svelte:head>
  <title>4m00se Blog</title>
</svelte:head>

<h1>Blog</h1>
<ul class="list-unstyled">
  {#each data.posts as post}
    <li>
      <article on:click={() => goto(`/blog/${post.slug}`)}>
        <div>{post.date}</div>
        <h3>{post.title}</h3>
        <div>{post.description}</div>
        <div>By {post.author}</div>
      </article>
    </li>
  {/each}
</ul>

<style>
  article {
    cursor: pointer;
    color: var(--pico-muted-color);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  h3 {
    color: var(--pico-color);
    margin: 0;
  }
</style>
