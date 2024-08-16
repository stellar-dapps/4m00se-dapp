<script lang="ts">
  import { onMount } from 'svelte';
  import helloWorld from '../../contracts/hello_world.ts';
  import Counter from '$lib/components/Counter.svelte';
  import { createConfig, getConfig, listConfigs } from '$lib/utils/ipfs.ts';

  let greeting = '';

  onMount(async () => {
    try {
      const { result } = await helloWorld.hello({ to: '4m00se' });
      greeting = result.join(' ');
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  });

  const createTestJSON = () => {
    createConfig();
  };

  const getTestJSON = () => {
    getConfig();
  };

  const listStoresConfigs = () => {
    listConfigs();
  };
</script>

<svelte:head>
  <title>4m00se — Temporary contract tester page</title>
</svelte:head>

<h1>{greeting}</h1>

<section>
  <Counter />
</section>

<section>
  <h3>Create test</h3>
  <button type="button" on:click={createTestJSON}>Create test JSON</button>

  <h3>Get config</h3>
  <button type="button" class="secondary" on:click={getTestJSON}>Get test JSON</button>

  <h3>List configs</h3>
  <button type="button" class="contrast" on:click={listStoresConfigs}>List files</button>
</section>
