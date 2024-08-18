import type { FormConfig } from '$lib/models/form-config.model.ts';

export async function getFormConfig(configUrl: string): Promise<FormConfig | null> {
  try {
    const response = await fetch(configUrl);
    const formConfigData = await response.json();
    return formConfigData;
  } catch (error) {
    console.log(error);
    return null;
  }
}
