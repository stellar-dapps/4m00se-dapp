import { PinataSDK } from 'pinata';
import { StellarConfig } from '$lib/content/mocks/stellar-config.ts';

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
});

export async function createConfig() {
  try {
    const upload = await pinata.upload.json(StellarConfig);
    console.log(upload);
  } catch (error) {
    console.log(error);
  }
}

export async function listConfigs() {
  try {
    const file = await pinata.listFiles().cid('bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne');
    console.log(file);
  } catch (error) {
    console.log(error);
  }
}

// REQUIRES CORS ENABLED?
// export async function getConfig() {
//   try {
//     const file = await pinata.gateways.get('bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne');
//     console.log(file);
//   } catch (error) {
//     console.log(error);
//   }
// }

export async function getConfig(id?: string) {
  let jsonCid = id;
  if (!jsonCid) {
    // TODO return actually
    jsonCid = 'bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne';
  }

  const url = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${jsonCid}`;

  console.log('IPFS url', { url });

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
