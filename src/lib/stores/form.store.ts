import { writable } from 'svelte/store';
import type { FormConfig } from '$lib/models/form-config.model.ts';
import type { FormSubmissionPinataMeta } from '$lib/models/form-submission.model.ts';
import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';

interface FormStoreState {
  formAssets?: StellarAccountAsset[];
  formConfigurations?: FormConfig[];
  selectedAsset?: StellarAccountAsset | null;
  selectedConfiguration?: FormConfig | null;
  formSubmissionsForSelectedConfig?: FormSubmissionPinataMeta[];
}

export const formStore = writable<FormStoreState>({
  formAssets: [],
  formConfigurations: [],
  selectedAsset: null,
  selectedConfiguration: null,
  formSubmissionsForSelectedConfig: []
});
