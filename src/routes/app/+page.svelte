<script lang="ts">
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';

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

<h1>Welcome to the app</h1>
