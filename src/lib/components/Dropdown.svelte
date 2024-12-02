<script lang="ts">
  interface Props {
    title?: string;
    options?: any[];
    onSelect: any;
  }

  let { title = '', options = [], onSelect }: Props = $props();
</script>

<details class="dropdown">
  <summary role="button">
    {title}
  </summary>
  <ul>
    {#each options as option}
      <li><a onclick={() => onSelect(option)}>{option.title}</a></li>
    {/each}
  </ul>
</details>
