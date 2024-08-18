<script lang="ts">
  import MarkdownIt from 'markdown-it';
  import my_markdown from '/README.md?raw';

  const md = new MarkdownIt();
</script>

<svelte:head>
  <title>4m00se — Docs</title>
</svelte:head>

<section>{@html md.render(my_markdown)}</section>
