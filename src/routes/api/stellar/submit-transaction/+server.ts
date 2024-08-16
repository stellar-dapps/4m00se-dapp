import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request }) => {
  const { xdr } = await request.json();

  try {
    console.log({ networkPassphrase });
    const transaction = StellarSdk.TransactionBuilder.fromXDR(xdr, networkPassphrase);
    const response = await server.submitTransaction(transaction, { skipMemoRequiredCheck: true });
    const result = new Response(JSON.stringify(response));
    console.log({ result });
    return result;
  } catch (error: any) {
    console.error('ERROR', error);
    return new Response(JSON.stringify({ error: error.message }), { status: error.status });
  }
};
