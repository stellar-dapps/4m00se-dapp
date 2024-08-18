<script lang="ts">
  import { onMount } from 'svelte';
  import helloWorld from '../../contracts/hello_world.ts';
  import Counter from '$lib/components/Counter.svelte';
  import { createConfig, getFormConfigFromIpfs, listConfigs } from '$lib/utils/ipfs.ts';
  import { generateRandomAssetId } from '$lib/utils/asset-id-generator.ts';
  import { authStore } from '$lib/stores/auth.store.ts';
  import CreateAsset from '$lib/components/test/CreateAsset.svelte';
  import AssetList from '$lib/components/test/AssetList.svelte';

  let publicKey: string;

  authStore.subscribe((value) => {
    publicKey = value.user!;
  });

  let greeting = '';

  onMount(async () => {
    try {
      const { result } = await helloWorld.hello({ to: '4m00se' });
      greeting = result.join(' ');
    } catch (error) {
      console.error('Error fetching greeting:', error);
    }
  });
</script>

<svelte:head>
  <title>4m00se — Temporary contract tester page</title>
</svelte:head>

<div>
  <article>
    <h2>HW contract testing: {greeting}</h2>

    <h4>HW counter contract testing:</h4>
    <section>
      <Counter />
    </section>
  </article>

  <article>
    <h2>IPFS testing</h2>
    <section>
      <h4>Create test</h4>
      <button type="button" on:click={createConfig}>Create test JSON</button>

      <h4>Get config</h4>
      <button type="button" class="secondary" on:click={() => getFormConfigFromIpfs()}>Get test JSON</button>

      <h4>List configs</h4>
      <button type="button" class="contrast" on:click={listConfigs}>Get IPFS file data</button>
    </section>
  </article>

  <article>
    <h2>Stellar testing</h2>
    <section>
      <h4>Generate random id</h4>
      <button type="button" on:click={() => generateRandomAssetId()}>Generate random id</button>
    </section>
    <section>
      <h4>Public key: {publicKey}</h4>
    </section>
    <!-- some server-side stuff -->
    <section>
      <CreateAsset />
    </section>
    <section>
      <AssetList />
    </section>
  </article>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  h4 {
    max-width: 25vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
