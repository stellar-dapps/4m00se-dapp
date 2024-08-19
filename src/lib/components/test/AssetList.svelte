<script lang="ts">
  import { authStore } from '$lib/stores/auth.store.ts';
  import { getFormConfigFromIpfs } from '$lib/utils/ipfs.ts';

  let publicKey: string;

  authStore.subscribe((value) => {
    publicKey = value.user!;
  });

  let bareAssets: any[] = [];
  let assets: any[] = [];

  function decodeBase64(base64String) {
    try {
      return atob(base64String);
    } catch (e) {
      console.error('Invalid Base64 string:', e);
      return null;
    }
  }

  async function loadAssets() {
    const response = await fetch(`/api/stellar/get-account-assets?issuerPublicKey=${publicKey}`);

    if (response.ok) {
      bareAssets = await response.json();
      bareAssets = bareAssets.filter((asset) => asset?.asset_code?.includes('4m00se'));

      const accountData = await getAccountData(publicKey);

      const assetPromises = bareAssets.map(async (bareAsset) => {
        let asset = bareAsset;
        const cidKey = `cid_${asset.asset_code}`;
        const cid = accountData[cidKey];
        const decodedCid = decodeBase64(cid);
        if (decodedCid) {
          const ipfsData = await getFormConfigFromIpfs(decodedCid);
          asset.ipfsData = ipfsData;
        }
        return asset;
      });

      assets = await Promise.all(assetPromises);
    } else {
      const error = await response.json();
      console.error('Failed to fetch assets:', error);
    }
  }

  async function getAccountData(publicKey: string) {
    const response = await fetch(`/api/stellar/get-account-data?publicKey=${publicKey}`);
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  }
</script>

<h4>Your Assets</h4>
<button type="button" on:click|preventDefault={loadAssets}>Load assets</button>
<ul>
  {#each assets as asset}
    <li>
      <p>Asset Code: {asset?.asset_code}</p>
      <p>IPFS Data: {asset?.ipfsData?.name}</p>
    </li>
  {/each}
</ul>
