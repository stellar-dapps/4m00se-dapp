import { generateRandomAssetId } from '$lib/utils/asset-id-generator.ts';
import { mockStellarConfig } from '$lib/content/mocks/stellar-config.ts';
import type { FormConfig } from '$lib/models/form-config.model.ts';
import { createIpfsFormConfigRecord } from '$lib/utils/ipfs.ts';
import type { PinataResponse } from '$lib/models/pinata-response.model.ts';
import FreighterAPI from '@stellar/freighter-api';

const { signTransaction } = FreighterAPI;

const network = import.meta.env.VITE_STELLAR_NETWORK_URL;
const networkPassphrase = import.meta.env.VITE_SOROBAN_NETWORK_PASSPHRASE;

export async function handleFakeFormCreate(publicKey: string | null) {
  if (!publicKey) {
    return;
  }
  // 1. Get config w/o meta
  let config = mockStellarConfig;

  // 2. Get (random?) issuer keypair (public key?)

  // 3. Get random form asset id
  let assetCode = generateRandomAssetId();

  // 4. Send data with creation date, form asset id, and issuer public key to IPFS
  let augmentedConfig: FormConfig = { ...config, createdAt: new Date(), createdBy: publicKey, id: assetCode };
  // ... and get cid from response
  let ipfsRecord: PinataResponse | null = await createIpfsFormConfigRecord(augmentedConfig);
  let cid: string | undefined = ipfsRecord?.IpfsHash;
  console.log({ cid });

  // 5. Create the transaction on the server side (of the dapp)
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

    // 6. Sign the transaction with the Freighter wallet
    const signedTransaction = await signTransaction(xdr, { accountToSign: publicKey, network, networkPassphrase });

    // 7. Submit the signed transaction back to the server (of the dapp)
    const submitResponse = await fetch('/api/stellar/submit-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ xdr: signedTransaction })
    });

    console.log({ submitResponse });

    if (submitResponse.ok) {
      const data = await submitResponse.json();
      console.log('Asset created:', data);
    } else {
      const error = await submitResponse.json();
      console.error('Failed to submit transaction:', error);
    }
  } else {
    const error = await response.json();
    console.error('Failed to create transaction:', error);
  }
}
