<script lang="ts">
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import MarkdownIt from 'markdown-it';
  import { onSubmitDefault } from './form-widget.service.ts';
  import '@picocss/pico/css/pico.min.css';

  const md = new MarkdownIt();

  interface Props {
    config: FormConfig;
    onSubmit: Function | null;
  }

  let { config, onSubmit }: Props = $props();

  let formData = {};
  let isSubmittedSuccessfully = $state(false);

  function handleChange(event) {
    formData[event.target.name] = event.target.value;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      onSubmit ? onSubmit(formData) : (isSubmittedSuccessfully = (await onSubmitDefault(formData, config))?.success);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
</script>

<form onsubmit={handleSubmit} class:rounded={config?.styles?.isRounded}>
  {#if isSubmittedSuccessfully}
    <h6>🎉 Success!</h6>
  {:else}
    {#if config?.fields}
      {#each config?.fields as field, index}
        <div>
          <label for={field?.name ?? '' + index}
            ><strong
              >{field?.label}{#if field.required}<sup>*</sup>{/if}</strong
            ></label
          >
          <input
            id={field.name ?? '' + index}
            type={field.type}
            name={field.name}
            oninput={handleChange}
            placeholder={field.placeholder ?? null}
            required={field.required || null}
          />
        </div>
      {/each}
    {/if}
    {#if config.consent}<small id="consent">{@html md.render(config.consent)}</small>{/if}
    <button type="submit" class="contrast">{config.submitButtonTitle ?? 'Submit'}</button>
  {/if}
</form>

<style>
  form {
    font-family: var(--pico-font-family);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .rounded input,
  .rounded button {
    border-radius: 5rem;
  }
</style>
