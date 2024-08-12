import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import type { FormSubmission } from '$lib/models/form-submission.model.ts';
import { mockFormSubmissions } from '$lib/content/mocks/mock-submission-list.ts';

export const GET: RequestHandler = async ({ url }) => {
  const formId = url.searchParams.get('formId');
  if (!formId) {
    return json({ error: 'Form ID is required' }, { status: 400 });
  }

  const formSubmissions = await fetchFormSubmissionsFromDatabase(formId);
  return json(formSubmissions);
};

async function fetchFormSubmissionsFromDatabase(formId: string): Promise<FormSubmission[]> {
  return mockFormSubmissions.filter((sub) => sub.formConfigId === formId);
}
