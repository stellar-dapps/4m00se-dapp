import StellarSdk from '@stellar/stellar-sdk';
import FreighterAPI from '@stellar/freighter-api';

const { signTransaction } = FreighterAPI;

const stellarUrl = import.meta.env.VITE_STELLAR_NETWORK_URL;

const server = new StellarSdk.Horizon.Server(stellarUrl);

export async function getIssuedAssets(issuerPublicKey: string) {
  try {
    const assets = await server.assets().forIssuer(issuerPublicKey).call();
    console.log(assets.records);
    return assets.records;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAccountData(publicKey: string) {
  try {
    const account = await server.loadAccount(publicKey);
    console.log(account.data_attr);
    return account.data_attr;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function createAsset(
  accountPublicKey: string,
  assetCode: string,
  cid = 'bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne',
  amount = 1
) {
  const sourceAccount = await server.loadAccount(accountPublicKey);

  // Step 1: Create the asset by sending a payment to the same account
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.TESTNET
  })
    .addOperation(
      StellarSdk.Operation.changeTrust({
        asset: new StellarSdk.Asset(assetCode, accountPublicKey),
        limit: amount.toString()
      })
    )
    .addOperation(
      StellarSdk.Operation.payment({
        destination: accountPublicKey,
        asset: new StellarSdk.Asset(assetCode, accountPublicKey),
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

  // Step 2: Sign the transaction with the user's wallet using Freighter API
  const signedTransaction = await signTransactionWithFreighter(accountPublicKey, transaction);

  // Step 3: Submit the transaction to the Stellar network
  await server.submitTransaction(signedTransaction);
}

async function signTransactionWithFreighter(accountToSign: string, transaction) {
  const signedTransaction = await signTransaction(transaction.toXDR(), { accountToSign });
  return StellarSdk.TransactionBuilder.fromXDR(signedTransaction, StellarSdk.Networks.TESTNET);
}
