<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formStore } from '$lib/stores/form.store.js';
</script>

{#if !$formStore.formSubmissionsForSelectedAsset?.length}
  <EmptyState mainTitle="No form responses yet" mainSubTitle="You haven't received any form submissions yet." isNoCta />
{:else}
  <h1 class="left">{$formStore.formSubmissionsForSelectedAsset.length} form responses</h1>
  <section class="table-container">
    <table>
      <thead>
        <tr>
          <th scope="col">Author</th>
          {#if $formStore?.selectedAsset?.ipfsData?.fields?.length}
            {#each $formStore?.selectedAsset?.ipfsData?.fields as field}
              <th scope="col">{field.name}</th>
            {/each}
          {/if}
        </tr>
      </thead>
      <tbody>
        {#each $formStore.formSubmissionsForSelectedAsset as submission}
          <tr>
            <th scope="row" title={submission.submittedBy}>
              {submission.submittedBy}
            </th>
            {#if $formStore?.selectedAsset?.ipfsData?.fields?.length}
              {#each $formStore?.selectedAsset?.ipfsData?.fields as field}
                {#if field?.name}
                  <td>{submission.formData[field.name] ?? '—'}</td>
                {/if}
              {/each}
            {/if}
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
{/if}

<style>
  .table-container {
    width: 100%;
    overflow-x: auto;
  }
</style>
