<script lang="ts">
  import Dropdown from '$lib/components/Dropdown.svelte';

  export let mainTitle = 'No forms yet';
  export let mainSubTitle = `You haven't created any forms yet. Click the button below to get started.`;
  export let ctaTitle = '+ Add form';
  export let ctaOptions: any[] = [];
  export let isNoCta = false;
  export let onCtaTrigger = (_) => {};
  export let onDropdownCtaTrigger = (_) => {};
</script>

<section>
  <div>
    <h2>{mainTitle}</h2>
    <p>{mainSubTitle}</p>
    {#if ctaOptions?.length}
      <Dropdown title={ctaTitle} options={ctaOptions} onSelect={(option) => onDropdownCtaTrigger(option)} />
    {:else if !isNoCta}
      <button type="button" class="secondary" on:click={onCtaTrigger}>{ctaTitle}</button>
    {/if}
  </div>
</section>

<style>
  section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 50%;
  }
  p {
    text-align: center;
  }
  button {
    width: 100%;
  }
</style>
