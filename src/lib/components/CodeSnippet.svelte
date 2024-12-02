<script lang="ts">
  interface Props {
    codeContent?: string;
  }

  let { codeContent = '' }: Props = $props();
</script>

<pre><code>{codeContent}</code></pre>
