import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);

export const GET: RequestHandler = async ({ request }) => {
  console.log('request to account assets', { request });
  const { searchParams } = new URL(request.url);
  const issuerPublicKey = searchParams.get('issuerPublicKey');

  console.log('assets public key', issuerPublicKey);

  if (!issuerPublicKey) {
    return new Response(JSON.stringify({ error: 'Missing issuerPublicKey' }), { status: 400 });
  }

  try {
    // const assets = await server.assets().forIssuer(issuerPublicKey).call();
    console.log('loading account');
    const account = await server.loadAccount(issuerPublicKey);
    console.log('acc: ', account);
    const assets = account.balances;
    console.log('fetched asset records: ', assets);
    return new Response(JSON.stringify(assets), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
