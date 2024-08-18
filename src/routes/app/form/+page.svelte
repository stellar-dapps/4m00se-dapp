<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formStore } from '$lib/stores/form.store.ts';
  import type { FormField } from '$lib/models/form-config.model.ts';
  import TextInput from '$lib/components/TextInput.svelte';
  import Checkbox from '$lib/components/Checkbox.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import CodeSnippet from '$lib/components/test/CodeSnippet.svelte';

  const basePinataUrl = import.meta.env.VITE_GATEWAY_URL + '/ipfs/';
  let elements: FormField[];
  let codeContent = '';

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

  const options: any[] = [
    {
      title: 'Base text field',
      id: '1'
    },
    {
      title: 'Email address',
      id: '2'
    },
    {
      title: 'Yes/No option',
      id: '3'
    }
  ];

  function handleElementAdd(option) {
    console.log('requested ', option.title);
  }
</script>

<svelte:head>
  <title>4m00se — New form</title>
</svelte:head>

{#if !elements?.length}
  <EmptyState
    mainTitle="No form elements yet"
    mainSubTitle="You haven't added any form elements yet. Click the button below to get started."
    ctaTitle="+ Add element"
    ctaOptions={options}
    onDropdownCtaTrigger={handleElementAdd}
  />
{:else}
  {#if codeContent}
    <section>
      <CodeSnippet {codeContent} />
    </section>
  {/if}
  <section>
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

        {#if !$formStore.selectedAsset}
          <button class="secondary" type="button" on:click={() => {}}>Remove</button>
        {/if}
      </article>
    {/each}
  </section>
{/if}
