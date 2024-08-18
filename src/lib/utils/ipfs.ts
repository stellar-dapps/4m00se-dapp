import { PinataSDK, type PinListItem } from 'pinata';
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

    return upload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function listConfigs(cid: string) {
  try {
    const file = await pinata.listFiles().cid(cid);

    return file;
  } catch (error) {
    console.log(error);
  }
}

export async function listIpfsConfigs(assetCode: string): Promise<PinListItem[]> {
  const files: PinListItem[] = await pinata.listFiles().name(assetCode);
  return files;
}

export async function updateMetadata(cid: string, name: string, submissions: string) {
  const update = await pinata.updateMetadata({
    cid,
    name,
    keyValues: {
      submissions: submissions
    }
  });

  return update;
}

export async function getFormConfigFromIpfs(id?: string): Promise<FormConfig | null> {
  let jsonCid = id;
  if (!jsonCid) {
    // TODO return actually
    jsonCid = 'bafkreicv32orr7mardh6mioh2r5nls74lgu3gcle3pm7tnvbqpj76rxkne';
  }

  const url = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${jsonCid}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}
