import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request }) => {
  const { accountPublicKey, assetCode, cid, amount } = await request.json();

  const issuerKeypair = StellarSdk.Keypair.random();
  const issuerPublicKey = issuerKeypair.publicKey();

  const formAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);

  // Fund the issuer account using the friendbot
  const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(issuerPublicKey)}`;
  const friendbotResult = await fetch(friendbotUrl);

  const issuerAccount = await server.loadAccount(issuerPublicKey); // TODO error processing

  const issuanceTransaction = new StellarSdk.TransactionBuilder(issuerAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: issuerPublicKey,
        asset: StellarSdk.Asset.native(),
        amount: '100' // Issue 100 lumens to the issuer account
      })
    )
    .setTimeout(30)
    .build();

  issuanceTransaction.sign(issuerKeypair);

  // Submit the issuance transaction
  const transactionSubmission = await server.submitTransaction(issuanceTransaction);

  try {
    const targetAccount = await server.loadAccount(accountPublicKey);

    const transaction = new StellarSdk.TransactionBuilder(targetAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase
    })
      .addOperation(
        StellarSdk.Operation.changeTrust({
          asset: formAsset
        })
      )
      .addOperation(
        StellarSdk.Operation.payment({
          destination: accountPublicKey,
          asset: formAsset,
          amount: amount.toString()
        })
      )
      .addOperation(
        StellarSdk.Operation.manageData({
          name: `cid_${assetCode}`,
          value: cid
        })
      )
      .setTimeout(30)
      .build();

    return new Response(JSON.stringify({ xdr: transaction.toXDR() }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
