<script lang="ts">
  import Dropdown from '$lib/components/Dropdown.svelte';

  interface Props {
    mainTitle?: string;
    mainSubTitle?: any;
    ctaTitle?: string;
    ctaOptions?: any[];
    isNoCta?: boolean;
    onCtaTrigger?: any;
    onDropdownCtaTrigger?: any;
  }

  let {
    mainTitle = 'No forms yet',
    mainSubTitle = `You haven't created any forms yet. Click the button below to get started.`,
    ctaTitle = '+ Add form',
    ctaOptions = [],
    isNoCta = false,
    onCtaTrigger = (_) => {},
    onDropdownCtaTrigger = (_) => {}
  }: Props = $props();
</script>

<section>
  <div>
    <h2>{mainTitle}</h2>
    <p>{mainSubTitle}</p>
    {#if ctaOptions?.length}
      <Dropdown title={ctaTitle} options={ctaOptions} onSelect={(option) => onDropdownCtaTrigger(option)} />
    {:else if !isNoCta}
      <button type="button" class="secondary" onclick={onCtaTrigger}>{ctaTitle}</button>
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
