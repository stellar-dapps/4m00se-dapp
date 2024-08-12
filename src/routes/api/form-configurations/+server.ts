import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { FormConfig } from '$lib/models/form-config.model.ts';
import { mockFormConfigs } from '$lib/content/mocks/mock-configuration-list.ts';

let temporaryFormConfigList: FormConfig[] = mockFormConfigs;

export const GET: RequestHandler = async ({ url }) => {
  const userId = url.searchParams.get('userId');
  if (!userId) {
    return json({ error: 'User ID is required' }, { status: 400 });
  }

  const formConfigurations = await fetchFormConfigurationsFromDatabase(userId);
  return json(formConfigurations);
};

export const POST: RequestHandler = async ({ request }) => {
  const formData = await request.json();

  const newFormConfiguration = await createFormConfigurationInDatabase(formData);
  return json(newFormConfiguration);
};

async function fetchFormConfigurationsFromDatabase(userId: string): Promise<FormConfig[]> {
  return temporaryFormConfigList;
}

async function createFormConfigurationInDatabase(newFormConfig: FormConfig): Promise<FormConfig> {
  temporaryFormConfigList = [...temporaryFormConfigList, newFormConfig];
  return newFormConfig;
}
