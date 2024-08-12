import type { PageLoad } from './$types.js';
import { fetchFormConfigurations } from '$lib/api/form-configurations.api.ts';
import type { FormConfigListPageData } from '$lib/models/page-data.model.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const userId = '1'; // Example user ID, you can get this from params or context
  const formConfigurations = await fetchFormConfigurations(userId, fetch);
  const data: FormConfigListPageData = {
    formConfigurations
  };
  return data;
};
