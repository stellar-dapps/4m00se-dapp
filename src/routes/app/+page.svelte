<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { getFormConfigFromIpfs } from '$lib/utils/ipfs.ts';
  import { decodeBase64 } from '$lib/utils/decoder.ts';
  import { handleFakeFormCreate } from '$lib/utils/form-create-manager.ts';
  import { formStore } from '$lib/stores/form.store.ts';
  import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';
  import type { FormConfig } from '$lib/models/form-config.model.ts';

  let publicKey: string | null = null;
  let forms: StellarAccountAsset[] = [];

  async function getUserAssets(publicKey: string) {
    return await (await fetch(`/api/stellar/get-account-assets?issuerPublicKey=${publicKey}`)).json();
  }

  function getFormAssets(assets: any[], prefix = '4m00se') {
    if (!assets || !Array.isArray(assets)) {
      return;
    }
    return assets.filter((asset) => asset?.asset_code?.includes(prefix));
  }

  async function getAccountData(publicKey: string) {
    const response = await fetch(`/api/stellar/get-account-data?publicKey=${publicKey}`);
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData;
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }

  async function getFormAssetsWithConfigs(userAccountData: any, assets: any[]): Promise<StellarAccountAsset[]> {
    const assetPromises = assets.map(async (bareAsset: StellarAccountAsset) => {
      let asset = bareAsset;
      const cidKey = `cid_${asset.asset_code}`;
      const cid = userAccountData[cidKey];
      const decodedCid = decodeBase64(cid);
      if (decodedCid) {
        const ipfsData: FormConfig | null = await getFormConfigFromIpfs(decodedCid);
        asset.ipfsData = ipfsData;
      }
      return asset;
    });

    return await Promise.all(assetPromises);
  }

  async function loadForms(publicKey: string) {
    const userAssets = await getUserAssets(publicKey);
    const formAssets = getFormAssets(userAssets);
    if (!formAssets) {
      return;
    }
    const userAccount = await getAccountData(publicKey);
    forms = await getFormAssetsWithConfigs(userAccount, formAssets);
    formStore.update((state) => ({
      ...state,
      formAssets: forms
    }));
  }

  function handleFormSelection(form: StellarAccountAsset) {
    formStore.update((state) => ({
      ...state,
      selectedAsset: form
    }));

    goto('/app/form');
  }

  onMount(() => {
    let isAuthenticated = false;

    authStore.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
      publicKey = value.user;
    });

    if (!isAuthenticated) {
      goto('/');
    }

    loadForms(publicKey!);
  });

  function triggerFormCreate() {
    formStore.update((state) => ({
      ...state,
      selectedAsset: null,
      formSubmissionsForSelectedAsset: []
    }));
    goto('/app/form');
  }
</script>

<svelte:head>
  <title>4m00se — Dashboard</title>
</svelte:head>

{#if !$formStore.formAssets?.length}
  <EmptyState onCtaTrigger={triggerFormCreate} />
{:else}
  <h1>You have {$formStore.formAssets.length} forms</h1>
  <ul class="list-unstyled">
    {#each $formStore.formAssets as form}
      <li>
        <article on:click={() => handleFormSelection(form)}>
          <h6>{form?.asset_code}</h6>
          <div>{form?.ipfsData?.name}</div>
        </article>
      </li>
    {/each}
  </ul>
  <button type="button" on:click={triggerFormCreate}>+ Add form</button>
{/if}

<style>
  article {
    cursor: pointer;
  }
</style>
