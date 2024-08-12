import FormWidget from './FormWidget.svelte';

declare global {
  interface Window {
    WidgetSDK: any;
  }
}

export function initFormWidget(options) {
  const { container, config, onSubmit } = options;
  const rootElement = document.getElementById(container);

  if (rootElement) {
    new FormWidget({
      target: rootElement,
      props: { config, onSubmit }
    });
  } else {
    console.error(`Container with id "${container}" not found.`);
  }
}

if (typeof window != 'undefined') {
  window.WidgetSDK = { initFormWidget };
}
