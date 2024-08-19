<script lang="ts">
  import { authStore } from '$lib/stores/auth.store.ts';
  import { generateRandomAssetId } from '$lib/utils/asset-id-generator.ts';
  import FreighterAPI from '@stellar/freighter-api';

  const network = import.meta.env.VITE_STELLAR_NETWORK_URL;
  const networkPassphrase = import.meta.env.VITE_SOROBAN_NETWORK_PASSPHRASE;

  const { signTransaction } = FreighterAPI;

  let publicKey: string;

  authStore.subscribe((value) => {
    publicKey = value.user!;
  });

  let assetCode = generateRandomAssetId();

  async function handleCreateAsset() {
    const cid = 'bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne';

    const response = await fetch('/api/stellar/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accountPublicKey: publicKey,
        assetCode,
        cid,
        amount: 1
      })
    });

    if (response.ok) {
      const { xdr } = await response.json();

      const signedTransaction = await signTransaction(xdr, { accountToSign: publicKey, network, networkPassphrase });

      // Step 3: Submit the signed transaction back to the server
      const submitResponse = await fetch('/api/stellar/submit-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ xdr: signedTransaction })
      });

      if (submitResponse.ok) {
        const data = await submitResponse.json();
      } else {
        const error = await submitResponse.json();
        console.error('Failed to submit transaction:', error);
      }
    } else {
      const error = await response.json();
      console.error('Failed to create transaction:', error);
    }
  }
</script>

<form on:submit|preventDefault={handleCreateAsset}>
  <label>
    Asset Code:
    <input type="text" bind:value={assetCode} />
  </label>
  <button type="submit">Create Asset</button>
</form>
