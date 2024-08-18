<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import NavItems from '$lib/components/NavItems.svelte';
  import { page } from '$app/stores';
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import { mockFormConfigs } from '$lib/content/mocks/mock-configuration-list.ts';
  import { goto } from '$app/navigation';
  import EditableText from '$lib/components/EditableText.svelte';
  import { formStore } from '$lib/stores/form.store.ts';

  let isWideScreen = true;

  // TODO get everything from form store
  let currentFormName = 'My new form name';
  let currentFormDescription = `<no description>`;
  const formElements: any[] = [];
  const isNewForm = false;

  formStore.subscribe((value) => {
    currentFormName = value.selectedAsset?.asset_code ?? 'N/A';
    currentFormDescription = value.selectedAsset?.ipfsData?.name ?? 'N/A';
  });

  onMount(() => {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
      window.addEventListener('resize', handleResize);
    }
  });

  function updateCurrentFormName(newName: string) {
    currentFormName = newName;
  }

  function updateCurrentFormDescription(newDescription: string) {
    currentFormDescription = newDescription;
  }

  function handleResize() {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
    }
  }

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

<header class="container">
  {#if $page.url.pathname.includes('/app/form')}
    <nav class="context">
      <ul>
        <li><a href="/app" class="contrast"><strong>{`< Forms`}</strong></a></li>
      </ul>
      <ul></ul>
    </nav>
    <nav class="context">
      <ul>
        <li>
          <h1><EditableText text={currentFormName} onEdited={updateCurrentFormName} /></h1>
          <div><EditableText text={currentFormDescription} onEdited={updateCurrentFormDescription} /></div>
        </li>
      </ul>
      <ul>
        <li><button type="button" class="secondary" disabled={!formElements?.length}>Preview</button></li>
        <li><button type="button" disabled={!formElements?.length}>Save</button></li>
      </ul>
    </nav>
    <nav>
      <ul>
        <li>
          <div role="group">
            <button
              type="button"
              on:click={() => goto('/app/form')}
              class={!$page.url.pathname.includes('submissions') ? 'outline' : 'outline secondary'}
              >Form elements</button
            >
            <button
              type="button"
              on:click={() => goto('/app/form/submissions')}
              class={$page.url.pathname.includes('submissions') ? 'outline' : 'outline secondary'}
              disabled={isNewForm}>Responses</button
            >
          </div>
        </li>
      </ul>
      <ul></ul>
    </nav>
  {:else}
    <nav>
      <ul>
        <li><a href="/" class="contrast"><strong>🫎 4m00se</strong></a></li>
      </ul>
      <ul>
        {#if isWideScreen || $page.url.pathname.includes('/app')}
          <NavItems />
        {:else}
          <li>
            <details class="dropdown">
              <summary> Menu </summary>
              <ul dir="rtl">
                <NavItems />
              </ul>
            </details>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}
</header>

<style>
  nav ul:first-child li a {
    text-decoration: none;
  }
</style>
