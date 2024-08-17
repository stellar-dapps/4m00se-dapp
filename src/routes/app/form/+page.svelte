<script lang="ts">
  import { goto } from '$app/navigation';
  import EmptyState from '$lib/components/EmptyState.svelte';

  const elements: any[] = [];
  const options: any[] = [
    {
      title: 'Text',
      id: '1'
    },
    {
      title: 'Checkbox',
      id: '2'
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
  <!-- element card list -->
{/if}
