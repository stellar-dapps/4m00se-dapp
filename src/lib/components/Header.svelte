<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import NavItems from '$lib/components/NavItems.svelte';
  import { page } from '$app/stores';
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import { mockFormConfigs } from '$lib/content/mocks/mock-configuration-list.ts';
  import { goto } from '$app/navigation';

  let isWideScreen = true;

  // TODO get everything from form store
  const currentFormName = 'My new form name';
  const currentFormDescription = 'My new form description';
  const formElements: any[] = [];
  const isNewForm = false;

  onMount(() => {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
      window.addEventListener('resize', handleResize);
    }
  });

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
          <h1>{currentFormName}</h1>
          {#if currentFormDescription}<div>{currentFormDescription}</div>{/if}
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
