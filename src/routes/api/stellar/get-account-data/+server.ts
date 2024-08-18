import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);

export const GET: RequestHandler = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const publicKey = searchParams.get('publicKey');

  if (!publicKey) {
    return new Response(JSON.stringify({ error: 'Missing publicKey' }), { status: 400 });
  }

  try {
    const account = await server.loadAccount(publicKey);
    return new Response(JSON.stringify(account.data_attr), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
