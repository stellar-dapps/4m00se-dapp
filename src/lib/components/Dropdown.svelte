<script lang="ts">
  export let title = '';
  export let options: any[] = [];
  export let onSelect;
</script>

<details class="dropdown">
  <summary role="button">
    {title}
  </summary>
  <ul>
    {#each options as option}
      <li><a on:click={() => onSelect(option)}>{option.title}</a></li>
    {/each}
  </ul>
</details>
