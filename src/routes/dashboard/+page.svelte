<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { toggleModal } from '$lib/utils/modal.ts';
  import type { FormConfigListPageData } from '$lib/models/page-data.model.ts';

  export let data: FormConfigListPageData;

  const { formConfigurations } = data;

  onMount(() => {
    let isAuthenticated;

    authStore.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
    });

    if (!isAuthenticated) {
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>4m00se — Dashboard</title>
</svelte:head>

<h1>Welcome to your <strong>4m00se</strong>Dashboard</h1>

<a href="/form-builder" role="button" class="contrast">
  Build your {formConfigurations.length ? 'next' : 'first'} form
</a>

<ul>
  {#each formConfigurations as formConfig}
    <li><code>{JSON.stringify(formConfig, null, 4)}</code></li>
  {/each}
</ul>

<button class="secondary" data-target="modal-example" on:click={toggleModal}>Modal test</button>

<dialog id="modal-example">
  <article>
    <header>
      <h3>Confirm your action!</h3>
    </header>
    <p>
      Cras sit amet maximus risus. Pellentesque sodales odio sit amet augue finibus pellentesque. Nullam finibus risus
      non semper euismod.
    </p>
    <footer>
      <button class="secondary" data-target="modal-example" on:click={toggleModal}>Cancel</button>
      <button data-target="modal-example" on:click={toggleModal}> Confirm </button>
    </footer>
  </article>
</dialog>

<style>
  #modal-example header,
  #modal-example footer {
    background-color: transparent;
    border: none;
  }
</style>
