<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import TextInput from '$lib/components/TextInput.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import type { FormBuilderItem } from '$lib/models/form-builder-item.model.ts';
  import { authStore } from '$lib/stores/auth.store.ts';

  onMount(() => {
    let isAuthenticated;

    authStore.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
    });

    if (!isAuthenticated) {
      goto('/');
    }
  });

  let formFields: FormBuilderItem[] = [
    { type: 'text', label: 'Name', name: 'name', value: '' },
    { type: 'checkbox', label: 'Agree to Terms', name: 'terms', checked: false }
  ];

  function handleChange(index, value) {
    formFields[index].value = value;
    formFields = formFields; // Trigger reactivity — check if necessary
  }

  function handleCheckboxChange(index, checked) {
    formFields[index].checked = checked;
    formFields = formFields; // Trigger reactivity — check if necessary
  }

  function addField(type: string) {
    // add ways to populate labels and stuff
    formFields = [...formFields, { type, label: '', name: '', value: '', checked: false }];
  }

  function removeField(index) {
    formFields.splice(index, 1);
    formFields = formFields; // Trigger reactivity
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // Submit the form data and sign it with a smart contract
    // ...
  }

  // TODO implement the functionality
  const createNewForm = async () => {
    const newFormData = {
      /* ... */
    };
    // await formStore.createNewFormConfiguration(newFormData);
  };
</script>

<svelte:head>
  <title>4m00se — Form builder</title>
</svelte:head>

<h1>Form Builder</h1>

<form on:submit={handleSubmit}>
  {#each formFields as field, index}
    {#if field.type === 'text'}
      <TextInput
        label={field.label}
        name={field.name}
        value={field.value}
        onChange={(value) => handleChange(index, value)}
      />
    {/if}
    {#if field.type === 'checkbox'}
      <Checkbox
        label={field.label}
        name={field.name}
        checked={field.checked}
        onChange={(checked) => handleCheckboxChange(index, checked)}
      />
    {/if}
    <button class="secondary" type="button" on:click={() => removeField(index)}>Remove</button>
  {/each}
  <button class="secondary" type="submit">Submit</button>
</form>

<h2>Add Field</h2>
<button class="secondary" on:click={() => addField('text')}>Add Text Input</button>
<button class="secondary" on:click={() => addField('checkbox')}>Add Checkbox</button>
