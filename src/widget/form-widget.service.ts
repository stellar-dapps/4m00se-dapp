import type { FormConfig } from '$lib/models/form-config.model.ts';

export async function getFormConfig(configUrl: string): Promise<FormConfig | null> {
  try {
    const response = await fetch(configUrl);
    const formConfigData: FormConfig = await response.json();
    return formConfigData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function onSubmitDefault(formData: any, formConfig: FormConfig) {
  console.log('default callback triggered with: ', { formData, formConfig });

  const { createdBy, id } = formConfig;

  const response = await fetch('https://localhost:5173/api/stellar/submit-form-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      formData,
      assetCode: id,
      assetIssuer: createdBy
    })
  });

  if (response.ok) {
    console.log('Form submitted successfully');
  } else {
    console.error('Form submission failed');
  }

  return { success: true };
}
