<script lang="ts">
  import type { FormConfig } from '$lib/models/form-config.model.ts';
  import MarkdownIt from 'markdown-it';

  const md = new MarkdownIt();

  export let config: FormConfig;
  export let onSubmit;

  let formData = {};

  function handleChange(event) {
    formData[event.target.name] = event.target.value;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(config.submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        onSubmit && onSubmit(formData);
      } else {
        console.error('Error submitting form:', await response.text());
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }
</script>

<form on:submit={handleSubmit} class:rounded={config?.styles?.isRounded}>
  {#each config.fields as field, index}
    <div>
      <label for={field.name + index}
        ><strong
          >{field.label}{#if field.required}<sup>*</sup>{/if}</strong
        ></label
      >
      <input
        id={field.name + index}
        type={field.type}
        name={field.name}
        on:input={handleChange}
        placeholder={field.placeholder ?? null}
        required={field.required || null}
      />
    </div>
  {/each}
  {#if config.consent}<small id="consent">{@html md.render(config.consent)}</small>{/if}
  <button type="submit" class="contrast">{config.submitButtonTitle ?? 'Submit'}</button>
</form>

<style>
  @import '@picocss/pico/css/pico.min.css';

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
