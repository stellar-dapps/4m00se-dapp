<script lang="ts">
  import type { FormField } from '$lib/models/form-config.model.ts';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import TextInput from '$lib/components/TextInput.svelte';

  interface Props {
    formField: FormField;
    onFieldChange?: any;
  }

  let { formField, onFieldChange = (formField: FormField) => {} }: Props = $props();

  const fieldSet = formField.type === 'checkbox' ? ['Name', 'Label'] : ['Name', 'Label', 'Required', 'Placeholder'];

  const fieldSetData: { title: string; value: any }[] = $state(fieldSet.map((title) => ({ title, value: null })));

  function changeField(value, index) {
    fieldSetData[index].value = value;
    onFieldChange({
      name: fieldSetData.find((field) => field.title === 'Name')?.value || '',
      label: fieldSetData.find((field) => field.title === 'Label')?.value || '',
      required: fieldSetData.find((field) => field.title === 'Required')?.value || null,
      placeholder: fieldSetData.find((field) => field.title === 'Placeholder')?.value || null
    });
  }
</script>

<article class="grid-container">
  <div class="column grid-container-nested">
    {#each fieldSetData as field, index}
      <div class="sub-column">{field.title}</div>
      <div class="sub-column">
        {#if field.title === 'Checked' || field.title === 'Required'}
          <Checkbox checked={field.value} onChange={(checked) => changeField(checked, index)} />
        {:else}
          <TextInput value={field.value} onChange={(value) => changeField(value, index)} />
        {/if}
      </div>
    {/each}
  </div>
  <div class="column preview">
    {#if formField.type === 'checkbox'}
      <Checkbox disabled label={fieldSetData.find((field) => field.title === 'Label')?.value ?? ''} />
    {:else}
      <TextInput
        disabled
        label={fieldSetData.find((field) => field.title === 'Label')?.value ?? ''}
        required={fieldSetData.find((field) => field.title === 'Required')?.value}
        placeholder={fieldSetData.find((field) => field.title === 'Placeholder')?.value}
      />
    {/if}
  </div>
</article>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .grid-container-nested {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }
  .preview {
    border: 2px solid var(--pico-muted-border-color);
    border-radius: 0.5rem;
    padding: 1rem;
  }
</style>
