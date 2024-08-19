import { generateRandomAssetId } from '$lib/utils/asset-id-generator.ts';
import { mockStellarConfig } from '$lib/content/mocks/stellar-config.ts';
import type { FormConfig } from '$lib/models/form-config.model.ts';
import { createIpfsFormConfigRecord } from '$lib/utils/ipfs.ts';
import type { PinataResponse } from '$lib/models/pinata-response.model.ts';
import FreighterAPI from '@stellar/freighter-api';

const { signTransaction } = FreighterAPI;

const network = import.meta.env.VITE_STELLAR_NETWORK_URL;
const networkPassphrase = import.meta.env.VITE_SOROBAN_NETWORK_PASSPHRASE;

export async function handleFormCreate(publicKey: string | null, formConfig: FormConfig | null) {
  if (!publicKey || !formConfig) {
    return;
  }

  let assetCode = generateRandomAssetId();

  let augmentedConfig: FormConfig = { ...formConfig, createdAt: new Date(), createdBy: publicKey, id: assetCode };

  let ipfsRecord: PinataResponse | null = await createIpfsFormConfigRecord(augmentedConfig);
  let cid: string | undefined = ipfsRecord?.IpfsHash;

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
