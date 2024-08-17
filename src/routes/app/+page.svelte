<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';
  import EmptyState from '$lib/components/EmptyState.svelte';

  const forms: any[] = [];

  onMount(() => {
    let isAuthenticated;

    authStore.subscribe((value) => {
      isAuthenticated = value.isAuthenticated;
    });

    if (!isAuthenticated) {
      goto('/');
    }
  });
</script>

<svelte:head>
  <title>4m00se — Dashboard</title>
</svelte:head>

{#if !forms?.length}
  <EmptyState onCtaTrigger={() => goto('/app/form')} />
{:else}
  <!-- form card list -->
{/if}
