import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request }) => {
  const { formData, assetCode, assetIssuer } = await request.json();

  // 1. Get assets for issuer key
  // 2. Filter assets by asset code
  // 3. List IPFS files
  // 4. Filter files by Pinata's metadata.name (=== assetCode)
  // 5. Take existing metadata.keyvalues as basis
  // 5. Take ipfs_pin_hash
  // 6. Update (augment) metadata using https://docs.pinata.cloud/api-reference/endpoint/update-file-metadata
  //  a. Use FormSubmissionPinataMeta

  // try {
  //   // Deserialize the transaction from XDR
  //   const transaction = StellarSdk.TransactionBuilder.fromXDR(xdr, networkPassphrase);
  //
  //   // Check the presence of the transaction on the Stellar network
  //   const transactionHash = transaction.hash();
  //   const transactionResponse = await server.transactions().transaction(transactionHash).call();
  //
  //   if (!transactionResponse) {
  //     return new Response(JSON.stringify({ error: 'Transaction not found' }), { status: 404 });
  //   }
  //
  //   // Check the presence of the asset
  //   const assetResponse = await server.assets().forCode(assetCode).forIssuer(assetIssuer).call();
  //
  //   if (!assetResponse) {
  //     return new Response(JSON.stringify({ error: 'Asset not found' }), { status: 404 });
  //   }

  // If everything is valid, proceed with your logic (e.g., storing the transaction hash and form data)
  // Replace the following line with your actual storage logic
  console.log('Asset code: ', assetCode);
  console.log('Form data: ', formData);
  console.log('Asset issuer: ', assetIssuer);

  return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
  // } catch (error: any) {
  //   console.error('ERROR', error);
  //   return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  // }
};
