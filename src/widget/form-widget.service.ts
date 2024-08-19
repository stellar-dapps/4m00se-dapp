import type { FormConfig } from '$lib/models/form-config.model.ts';
import FreighterAPI from '@stellar/freighter-api';

const { signTransaction, setAllowed, getUserInfo, isConnected } = FreighterAPI;

// const baseUrl: string = 'https://localhost:5173';
const baseUrl: string = 'https://4m.lol';

async function connectWallet() {
  if (await isConnected()) {
    await setAllowed();
    return await getUserInfo();
  }
}

async function signSubmissionTransaction(assetId: string) {
  let publicKey: string = '';
  const walletConnectResult = await connectWallet();

  if (walletConnectResult) {
    publicKey = walletConnectResult.publicKey;
  }

  const transactionResponse: any = await buildTransaction(publicKey, assetId);

  const transaction = await transactionResponse.json();

  // Sign the transaction using Freighter API
  const signedTransaction = await signTransaction(transaction.xdr, {
    accountToSign: publicKey,
    network: 'https://horizon-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015'
  });

  return signedTransaction;
}

async function buildTransaction(publicKey: string, assetId: string) {
  const response = await fetch(`${baseUrl}/api/stellar/create-submission-transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      publicKey,
      assetId
    })
  });

  return response;
}

export async function getFormConfig(configUrl: string): Promise<FormConfig | null> {
  try {
    const response = await fetch(configUrl);
    const formConfigData: FormConfig = await response.json();
    return formConfigData;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function onSubmitDefault(formData: any, formConfig: FormConfig) {
  const { createdBy, id } = formConfig;

  const tx = formConfig.name ? await signSubmissionTransaction(formConfig.name) : '';

  const response = await fetch(`${baseUrl}/api/stellar/submit-form-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      formData,
      assetCode: id,
      assetIssuer: createdBy,
      tx
    })
  });

  if (response.ok) {
    console.log('Form submitted successfully');
  } else {
    console.error('Form submission failed');
  }

  return { success: true };
}
