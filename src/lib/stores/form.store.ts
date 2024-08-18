import { writable } from 'svelte/store';
import type { FormSubmissionPinataMeta } from '$lib/models/form-submission.model.ts';
import type { StellarAccountAsset } from '$lib/models/stellar-account-asset.model.ts';

interface FormStoreState {
  formAssets?: StellarAccountAsset[];
  selectedAsset?: StellarAccountAsset | null;
  formSubmissionsForSelectedAsset?: FormSubmissionPinataMeta[];
}

export const formStore = writable<FormStoreState>({
  formAssets: [],
  selectedAsset: null,
  formSubmissionsForSelectedAsset: []
});
