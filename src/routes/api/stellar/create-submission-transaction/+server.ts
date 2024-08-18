import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request }) => {
  const { publicKey, assetId } = await request.json();
  try {
    const account = await server.loadAccount(publicKey);

    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      // .addMemo(StellarSdk.Memo.text(assetId)) — TODO doesn't work, figure out why
      .setTimeout(30)
      .build();

    return new Response(JSON.stringify({ xdr: transaction.toXDR() }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
