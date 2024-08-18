<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { listIpfsConfigs } from '$lib/utils/ipfs.ts';
  import type { PinataFile } from '$lib/models/pinata-response.model.ts';
  import type { FormSubmissionPinataMeta } from '$lib/models/form-submission.model.ts';
  import { onMount } from 'svelte';
  import { formStore } from '$lib/stores/form.store.js';

  let submissions: FormSubmissionPinataMeta[] = [];

  // TODO: write submissions to store (possibly earlier)
  formStore.subscribe(async (value) => {
    if (value.selectedAsset) {
      const configsFromIpfs: any[] = await listIpfsConfigs(value.selectedAsset.asset_code);

      const configOfInterest: PinataFile = configsFromIpfs?.find(
        (config) => config.metadata.name === value?.selectedAsset?.asset_code
      );

      if (!configOfInterest) {
        return;
      }

      submissions = configOfInterest?.metadata?.keyvalues?.submissions
        ? JSON.parse(configOfInterest?.metadata?.keyvalues?.submissions)
        : [];
    }
  });
</script>

{#if !submissions?.length}
  <EmptyState mainTitle="No form responses yet" mainSubTitle="You haven't received any form submissions yet." isNoCta />
{:else}
  <h1>You have {submissions.length} form responses</h1>
  <ul class="list-unstyled">
    {#each submissions as submission}
      <li>
        <article>
          <h6>{submission.submittedBy}</h6>
          <div>{submission.submittedAt}</div>
        </article>
      </li>
    {/each}
  </ul>
{/if}
