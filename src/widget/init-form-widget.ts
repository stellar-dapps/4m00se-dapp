import type { FormConfig } from '$lib/models/form-config.model.ts';
import type { FormWidgetOptions } from '$lib/models/form-widget-options.ts';
import FormWidget from './FormWidget.svelte';
import { getFormConfig } from './form-widget.service.ts';

declare global {
  interface Window {
    formWidgetSDK: any;
  }
}

export async function initFormWidget(options: FormWidgetOptions) {
  const { container = '4m00se-widget-container', configUrl, onSubmit = null } = options;
  const rootElement = document.getElementById(container);

  const config: FormConfig | null = await getFormConfig(configUrl);

  if (config) {
    if (rootElement) {
      new FormWidget({
        target: rootElement,
        props: { config, onSubmit }
      });
    } else {
      console.error(`Container with id "${container}" not found.`);
    }
  } else {
    console.error(`Error fetching the form config from "${configUrl}".`);
  }
}

if (typeof window != 'undefined') {
  window.formWidgetSDK = { initFormWidget };
}
