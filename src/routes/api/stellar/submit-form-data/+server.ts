import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';
import { getIssuedAssets } from '$lib/utils/stellar.ts';
import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';
import { listConfigs, listIpfsConfigs, updateMetadata } from '$lib/utils/ipfs.ts';
import type { FormSubmissionPinataMeta } from '$lib/models/form-submission.model.ts';
import type { PinataFile } from '$lib/models/pinata-response.model.ts';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request, fetch }) => {
  const { formData, assetCode, assetIssuer, tx } = await request.json();

  // 1. Get assets for issuer key
  // const issuerAssets: StellarAccountAsset[] = await (
  //   await fetch(`/api/stellar/get-account-assets?issuerPublicKey=${assetIssuer}`)
  // ).json();
  // 2. Filter assets by asset code
  // const formAsset = issuerAssets.find((asset: StellarAccountAsset) => asset.asset_code === assetCode);
  // 3. List IPFS files
  const configsFromIpfs: any[] = await listIpfsConfigs(assetCode);
  // 4. Filter files by Pinata's metadata.name (=== assetCode)
  const configOfInterest: PinataFile = configsFromIpfs.find((config) => config.metadata.name === assetCode);
  // 5. Take existing metadata.keyvalues as basis
  const currentSubmissions: FormSubmissionPinataMeta[] =
    JSON.parse(configOfInterest.metadata.keyvalues.submissions) ?? [];
  // 6. Augment them with new submission
  const newSubmission: FormSubmissionPinataMeta = {
    submittedAt: new Date(),
    formData,
    submittedBy: assetIssuer,
    tx
  };
  const updatedSubmissions: FormSubmissionPinataMeta[] = [...currentSubmissions, newSubmission];
  // 7. Take ipfs_pin_hash
  const cid: string = configOfInterest.ipfs_pin_hash;
  // 7. Update (augment) metadata using https://docs.pinata.cloud/api-reference/endpoint/update-file-metadata
  //  a. Use FormSubmissionPinataMeta
  const updated = await updateMetadata(cid, assetCode, JSON.stringify(updatedSubmissions));
  if (updated) {
    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: 'Failed to submit a form' }), { status: 500 });
  }
};
