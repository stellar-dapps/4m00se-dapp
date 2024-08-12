import { writable } from 'svelte/store';
import { fetchFormConfigurations, createFormConfiguration } from '$lib/api/form-configurations.api.ts';
import { fetchFormSubmissions } from '$lib/api/form-submissions.api.ts';
import type { FormConfig } from '$lib/models/form-config.model.ts';

// TODO form store is practically not used yet (but should be)

interface FormStoreState {
  formConfigurations?: FormConfig[];
  formSubmissions?: any[];
  error?: string | null;
  loading?: boolean;
}

function createFormStore() {
  const { subscribe, set, update } = writable<FormStoreState>({
    formConfigurations: [],
    formSubmissions: [],
    loading: false,
    error: null
  });

  const fetchFormConfigurationsForUser = async (userId: string, fetch: any) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchFormConfigurations(userId, fetch);
      set({ formConfigurations: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  };

  const fetchFormSubmissionsForForm = async (formId: string, fetch: any) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchFormSubmissions(formId, fetch);
      set({ formSubmissions: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  };

  const createNewFormConfiguration = async (formData: any) => {
    set({ loading: true, error: null });
    try {
      const data = await createFormConfiguration(formData, fetch);
      update((state: FormStoreState) => ({
        formConfigurations: [...state?.formConfigurations!, data],
        loading: false
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  };

  return {
    subscribe,
    fetchFormConfigurationsForUser,
    fetchFormSubmissionsForForm,
    createNewFormConfiguration
  };
}

export const formStore = createFormStore();
