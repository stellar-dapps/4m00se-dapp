import { PinataSDK } from 'pinata';
import { mockStellarConfig } from '$lib/content/mocks/stellar-config.ts';
import type { PinataResponse } from '$lib/models/pinata-response.model.ts';
import type { FormConfig } from '$lib/models/form-config.model.ts';

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
});

export async function createIpfsFormConfigRecord(config: FormConfig): Promise<PinataResponse | null> {
  try {
    const upload = await pinata.upload.json(config).addMetadata({
      name: config.id // add asset id for future filtering
    });
    console.log(upload);
    return upload;
  } catch (error) {
    console.log(error);
    return null;
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

export async function getFormConfigFromIpfs(id?: string) {
  let jsonCid = id;
  if (!jsonCid) {
    // TODO return actually
    jsonCid = 'bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne';
  }

  const url = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${jsonCid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
