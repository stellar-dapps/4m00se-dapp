<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formStore } from '$lib/stores/form.store.js';
</script>

{#if !$formStore.formSubmissionsForSelectedAsset?.length}
  <EmptyState mainTitle="No form responses yet" mainSubTitle="You haven't received any form submissions yet." isNoCta />
{:else}
  <h1 class="left">{$formStore.formSubmissionsForSelectedAsset.length} form responses</h1>
  <ul class="list-unstyled">
    {#each $formStore.formSubmissionsForSelectedAsset as submission}
      <li>
        <article>
          <h6>{submission.submittedBy}</h6>
          <div>{submission.submittedAt}</div>
        </article>
      </li>
    {/each}
  </ul>
{/if}
