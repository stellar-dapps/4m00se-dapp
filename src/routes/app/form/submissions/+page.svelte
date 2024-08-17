<script lang="ts">
  import EmptyState from '$lib/components/EmptyState.svelte';

  const submissions: any[] = [];
</script>

{#if !submissions?.length}
  <EmptyState mainTitle="No form responses yet" mainSubTitle="You haven't received any form submissions yet." isNoCta />
{:else}
  <!-- submission list -->
{/if}
