import type { FormConfig } from '$lib/models/form-config.model.ts';
import type { FormSubmission } from '$lib/models/form-submission.model.ts';

export interface FormConfigListPageData {
  formConfigurations: FormConfig[];
}

export interface FormSubmissionListPageData {
  formSubmissions: FormSubmission[];
}
