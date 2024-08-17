<script lang="ts">
  import '@picocss/pico/css/pico.min.css';
  import '@picocss/pico/css/pico.colors.min.css';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import { authStore } from '$lib/stores/auth.store.ts';

  let authBlockedReason: string | null;

  authStore.subscribe((value) => {
    authBlockedReason = value.authBlockedReason;
  });
</script>

<svelte:head>
  <link
    rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫎</text></svg>"
  />
</svelte:head>

<Header />

<Banner isWarning />

{#if authBlockedReason}
  <Banner bannerText={authBlockedReason} />
{/if}

<main class="container">
  <slot />
</main>

<Footer />
