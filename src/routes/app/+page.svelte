<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { getFormConfigFromIpfs } from '$lib/utils/ipfs.ts';
  import { decodeBase64 } from '$lib/utils/decoder.ts';
  import { handleFakeFormCreate } from '$lib/utils/form-create-manager.ts';

  let publicKey: string | null = null;
  let forms: any[] = [];

  async function getUserAssets(publicKey: string) {
    return await (await fetch(`/api/stellar/get-account-assets?issuerPublicKey=${publicKey}`)).json();
  }

  function getFormAssets(assets: any[], prefix = '4m00se') {
    return assets?.filter((asset) => asset?.asset_code?.includes(prefix));
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

  async function getFormAssetsWithConfigs(userAccountData: any, assets: any[]) {
    const assetPromises = assets.map(async (bareAsset) => {
      let asset = bareAsset;
      const cidKey = `cid_${asset.asset_code}`;
      const cid = userAccountData[cidKey];
      const decodedCid = decodeBase64(cid);
      if (decodedCid) {
        const ipfsData = await getFormConfigFromIpfs(decodedCid);
        asset.ipfsData = ipfsData;
      }
      return asset;
    });

    return await Promise.all(assetPromises);
  }

  async function loadForms(publicKey: string) {
    const userAssets = await getUserAssets(publicKey);
    const formAssets = getFormAssets(userAssets);
    const userAccount = await getAccountData(publicKey);
    forms = await getFormAssetsWithConfigs(userAccount, formAssets);
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
</script>

<svelte:head>
  <title>4m00se — Dashboard</title>
</svelte:head>

{#if !forms?.length}
  <EmptyState onCtaTrigger={() => goto('/app/form')} />
{:else}
  <h1>You have {forms.length} forms</h1>
  <ul class="list-unstyled">
    {#each forms as form}
      <li>
        <article>
          <h6>{form?.asset_code}</h6>
          <div>{form?.ipfsData?.name}</div>
        </article>
      </li>
    {/each}
  </ul>
  <button type="button" class="secondary" on:click={() => /*goto('/app/form')*/ handleFakeFormCreate(publicKey)}
    >+ Add form</button
  >
{/if}
