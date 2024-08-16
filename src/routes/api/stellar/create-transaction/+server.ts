import type { RequestHandler } from '@sveltejs/kit';
import StellarSdk from '@stellar/stellar-sdk';

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;
const server = new StellarSdk.Horizon.Server(stellarUrl);
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const POST: RequestHandler = async ({ request }) => {
  const { accountPublicKey, assetCode, cid, amount } = await request.json();

  // FIXME testnet only, for now, — need to take care of that
  const issuerKeypair = StellarSdk.Keypair.random();
  const issuerPublicKey = issuerKeypair.publicKey();
  console.log({ issuerPublicKey });

  const formAsset = new StellarSdk.Asset(assetCode, issuerPublicKey);

  console.log('Fundbotting');
  // Fund the issuer account using the friendbot
  const friendbotUrl = `https://friendbot.stellar.org?addr=${encodeURIComponent(issuerPublicKey)}`;
  const friendbotResult = await fetch(friendbotUrl);

  console.log('friendbot result ', friendbotResult);

  console.log('fetching account...');

  // const delay = 3000;
  // const retries = 12;
  // for (let i = 0; i < retries; i++) {
  //   try {
  //     const account = await server.loadAccount(issuerPublicKey);
  //     console.log(`Account ${issuerPublicKey} is now available.`, { account });
  //     return;
  //   } catch (error) {
  //     if (i < retries - 1) {
  //       console.log(`Account ${issuerPublicKey} not found. Retrying in ${delay / 1000} seconds...`);
  //       await new Promise(resolve => setTimeout(resolve, delay));
  //     } else {
  //       throw new Error(`Account ${issuerPublicKey} not found after ${retries} retries.`);
  //     }
  //   }
  // }

  console.log('loading account');

  const issuerAccount = await server.loadAccount(issuerPublicKey); // TODO error processing

  console.log('building transaction...');

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

  console.log('issuing...');

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
          // limit: amount.toString()
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

    console.log('ready to respond...');

    return new Response(JSON.stringify({ xdr: transaction.toXDR() }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
