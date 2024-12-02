<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<section class="blog-content">
  <div class="content-column">
    {@render children?.()}
  </div>
</section>

<style>
  .blog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  .content-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 736px;
    gap: 1rem;
  }
</style>
