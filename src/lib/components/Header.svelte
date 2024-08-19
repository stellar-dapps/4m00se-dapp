<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import NavItems from '$lib/components/NavItems.svelte';
  import { page } from '$app/stores';
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import { mockFormConfigs } from '$lib/content/mocks/mock-configuration-list.ts';
  import { goto } from '$app/navigation';
  import EditableText from '$lib/components/EditableText.svelte';
  import { formStore } from '$lib/stores/form.store.ts';
  import Logo from '$lib/components/img/Logo.svelte';
  import Back from '$lib/components/img/Back.svelte';
  import Submitted from '$lib/components/Submitted.svelte';
  import { handleFormCreate } from '$lib/utils/form-create-manager.ts';
  import { authStore } from '$lib/stores/auth.store.js';

  let isWideScreen = true;

  // TODO get everything from form store
  let currentFormName = 'My new form name';
  let currentFormDescription = `<no description>`;
  const formElements: any[] = [];

  formStore.subscribe((value) => {
    currentFormName = value.selectedAsset?.ipfsData?.name ?? 'N/A*';
    currentFormDescription =
      (value.selectedAsset?.ipfsData?.description ?? value.selectedAsset) ? 'No description' : 'N/A';
  });

  onMount(() => {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 768px)').matches;
      window.addEventListener('resize', handleResize);
    }
  });

  function updateCurrentFormName(newName: string) {
    formStore.update((state) => ({
      ...state,
      inProgressFormConfig: {
        ...state.inProgressFormConfig,
        name: newName
      }
    }));
  }

  function updateCurrentFormDescription(newDescription: string) {
    formStore.update((state) => ({
      ...state,
      inProgressFormConfig: {
        ...state.inProgressFormConfig,
        description: newDescription
      }
    }));
  }

  async function saveForm() {
    const created = await handleFormCreate($authStore.user, $formStore.inProgressFormConfig);
  }

  function handleResize() {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 768px)').matches;
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
        <li>
          <a href="/app" class="contrast">
            <Back />
          </a>
        </li>
      </ul>
      <ul></ul>
    </nav>
    <nav class="context">
      <ul>
        <li>
          <h1 class="left">
            {#if !$formStore.selectedAsset}
              <EditableText text={$formStore.inProgressFormConfig?.name} onEdited={updateCurrentFormName} />
            {:else}
              {currentFormName}
            {/if}
          </h1>
          <div>
            {#if !$formStore.selectedAsset}
              <EditableText
                text={$formStore.inProgressFormConfig?.description || 'No description'}
                onEdited={updateCurrentFormDescription}
              />
            {:else}
              {currentFormDescription}
            {/if}
          </div>
        </li>
      </ul>
      {#if !$page.url.pathname.includes('/app/form/submissions')}
        <ul>
          {#if !$formStore.selectedAsset}
            <li>
              <button type="button" class="secondary" disabled={!$formStore.inProgressFormConfig?.fields?.length}
                >Preview</button
              >
            </li>
            <li>
              <button
                type="button"
                disabled={!$formStore.inProgressFormConfig?.fields?.length ||
                  !$formStore.inProgressFormConfig?.name ||
                  $formStore.inProgressFormConfig?.name === 'N/A*'}
                on:click={saveForm}>Save</button
              >
            </li>
          {/if}
          {#if $formStore.selectedAsset}
            <li><Submitted /></li>
          {/if}
        </ul>
      {/if}
    </nav>
    <nav>
      <ul class="tabs">
        <li>
          <div role="group">
            <button
              type="button"
              on:click={() => goto('/app/form')}
              class={!$page.url.pathname.includes('submissions') ? 'secondary' : 'outline secondary'}
              >Form elements</button
            >
            <button
              type="button"
              on:click={() => goto('/app/form/submissions')}
              class={$page.url.pathname.includes('submissions') ? 'secondary' : 'outline secondary'}
              disabled={!$formStore.selectedAsset}>Responses</button
            >
          </div>
        </li>
      </ul>
      <ul></ul>
    </nav>
  {:else}
    <nav>
      <ul>
        <li><a href="/" class="contrast"><Logo /></a></li>
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
  .tabs {
    min-width: 50%;
  }
  .tabs li {
    width: 100%;
  }
</style>
