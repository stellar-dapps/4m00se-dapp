import { writable } from 'svelte/store';
import type { FormSubmissionPinataMeta } from '$lib/models/form-submission.model.ts';
import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';
import type { FormConfig } from '$lib/models/form-config.model.ts';

interface FormStoreState {
  formAssets?: StellarAccountAsset[];
  selectedAsset?: StellarAccountAsset | null;
  formSubmissionsForSelectedAsset?: FormSubmissionPinataMeta[];
  inProgressFormConfig: FormConfig | null;
}

export const formStore = writable<FormStoreState>({
  formAssets: [],
  selectedAsset: null,
  formSubmissionsForSelectedAsset: [],
  inProgressFormConfig: null
});
