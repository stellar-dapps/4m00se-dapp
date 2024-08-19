<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formStore } from '$lib/stores/form.store.ts';
  import type { FormConfig, FormField } from '$lib/models/form-config.model.ts';
  import TextInput from '$lib/components/TextInput.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import CodeSnippet from '$lib/components/test/CodeSnippet.svelte';
  import FormElementCard from '$lib/components/FormElementCard.svelte';
  import { formElementSelectOptions } from '$lib/content/settings/form-element-select.config.ts';
  import Dropdown from '$lib/components/Dropdown.svelte';
  import type { FormElementOption } from '$lib/models/form-element-option.model.ts';

  const basePinataUrl = import.meta.env.VITE_GATEWAY_URL + '/ipfs/';
  let elements: FormField[];
  let codeContent = '';
  const ctaTitle = '+ Add element';

  formStore.subscribe((value) => {
    if (value.selectedAsset) {
      elements = value.selectedAsset.ipfsData?.fields || [];
    }

    codeContent = `
      <!-- Add link to the script to you page’s head part -->
      <script src="https://4m.lol/widget/4m00s.js"><\/script>
      …
      <!-- Add a container element with the specific ID, and an init script inside you page’s body part -->
      <div id="4m00se-widget-container"></div>
      …
      <script>
        formWidgetSDK.initFormWidget({ configUrl: '${basePinataUrl}${value.selectedAsset?.cid}' });
      <\/script>
    `;
  });

  function handleElementAdd(option: FormElementOption) {
    console.log({ option });
    const newFormField: FormField = {
      name: 'N/A*',
      label: 'N/A*',
      type: option.type,
      required: false,
      placeholder: null
    };

    formStore.update((state) => {
      const config: FormConfig | null = state.inProgressFormConfig;
      if (!config) {
        return state;
      }
      const fields = config?.fields || [];
      fields.push(newFormField);
      return {
        ...state,
        inProgressFormConfig: {
          ...config,
          fields
        }
      };
    });
  }
</script>

<svelte:head>
  <title>4m00se — New form</title>
</svelte:head>

{#if !elements?.length && !$formStore.inProgressFormConfig?.fields.length}
  <EmptyState
    mainTitle="No form elements yet"
    mainSubTitle="You haven't added any form elements yet. Click the button below to get started."
    {ctaTitle}
    ctaOptions={formElementSelectOptions}
    onDropdownCtaTrigger={handleElementAdd}
  />
{:else}
  {#if $formStore.selectedAsset && codeContent}
    <section>
      <CodeSnippet {codeContent} />
    </section>
  {/if}

  <section>
    {#if $formStore.selectedAsset}
      {#each elements as field, index}
        <article>
          {#if field.type === 'text' || field.type === 'email' || !field.type}
            <TextInput
              disabled={!!$formStore.selectedAsset}
              required={field.required}
              label={field.label}
              placeholder={field.placeholder || null}
              name={field.name}
            />
          {/if}

          {#if field.type === 'checkbox'}
            <Checkbox label={field.label} />
          {/if}
        </article>
      {/each}
    {:else}
      <!-- Form builder -->
      {#if $formStore.inProgressFormConfig}
        <section>
          {#each $formStore.inProgressFormConfig?.fields as field, index}
            <FormElementCard formField={field} />
          {/each}
        </section>

        <Dropdown title={ctaTitle} options={formElementSelectOptions} onSelect={(option) => handleElementAdd(option)} />
      {/if}
    {/if}
  </section>
{/if}
