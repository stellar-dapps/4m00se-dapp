<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { getFormConfigFromIpfs, listIpfsConfigs } from '$lib/utils/ipfs.ts';
  import { decodeBase64 } from '$lib/utils/decoder.ts';
  import { formStore } from '$lib/stores/form.store.ts';
  import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import type { PinataFile } from '$lib/models/pinata-response.model.ts';

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
        asset.cid = decodedCid;
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

  async function handleFormSelection(form: StellarAccountAsset) {
    formStore.update((state) => ({
      ...state,
      selectedAsset: form,
      formSubmissionsForSelectedAsset: []
    }));

    const configsFromIpfs: any[] = await listIpfsConfigs(form.asset_code);

    const configOfInterest: PinataFile = configsFromIpfs?.find((config) => config.metadata.name === form.asset_code);

    if (configOfInterest) {
      const formSubmissionsForSelectedAsset = configOfInterest?.metadata?.keyvalues?.submissions
        ? JSON.parse(configOfInterest?.metadata?.keyvalues?.submissions)
        : [];

      if (formSubmissionsForSelectedAsset) {
        formStore.update((state) => ({
          ...state,
          formSubmissionsForSelectedAsset
        }));
      }
    }

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
      formSubmissionsForSelectedAsset: [],
      inProgressFormConfig: { name: 'N/A*', fields: [] }
    }));
    goto('/app/form');
  }
</script>

<svelte:head>
  <title>4m00se — Your forms</title>
</svelte:head>

{#if !$formStore.formAssets?.length}
  <EmptyState onCtaTrigger={triggerFormCreate} />
{:else}
  <h1 class="left">{$formStore.formAssets.length} forms</h1>
  <ul class="list-unstyled">
    {#each $formStore.formAssets as form}
      <li>
        <article onclick={() => handleFormSelection(form)}>
          <div class="form-name">
            <h5>{form?.ipfsData?.name}</h5>
            <h5 class="additional">|</h5>
            <h5 class="additional">{form?.asset_code}</h5>
          </div>
          <div>{form?.ipfsData?.description || 'No description'}</div>
        </article>
      </li>
    {/each}
  </ul>
  <button type="button" onclick={triggerFormCreate}>+ Add form</button>
{/if}

<style>
  article {
    cursor: pointer;
  }
  .form-name {
    color: var(--pico-color);
    display: flex;
    gap: 16px;
  }
</style>
