import type { PageLoad } from './$types.js';
import { fetchFormSubmissions } from '$lib/api/form-submissions.api.ts';
import type { FormSubmissionListPageData } from '$lib/models/page-data.model.ts';

export const load: PageLoad = async ({ params, fetch }) => {
  const formId = '1'; // Example form ID, you can get this from params or context
  const formSubmissions = await fetchFormSubmissions(formId, fetch);
  const data: FormSubmissionListPageData = {
    formSubmissions
  };
  return data;
};
