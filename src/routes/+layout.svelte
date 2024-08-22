<script lang="ts">
  import '@picocss/pico/css/pico.min.css';
  import '@picocss/pico/css/pico.colors.min.css';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import Banner from '$lib/components/Banner.svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let authBlockedReason: string | null;

  authStore.subscribe((value) => {
    authBlockedReason = value.authBlockedReason;
  });

  let isMobile = false;

  onMount(() => {
    const userAgent = navigator.userAgent;

    // Check if the user agent is a mobile device
    if (
      userAgent.match(/Android/i) ||
      userAgent.match(/webOS/i) ||
      userAgent.match(/iPhone/i) ||
      userAgent.match(/iPad/i) ||
      userAgent.match(/iPod/i) ||
      userAgent.match(/BlackBerry/i) ||
      userAgent.match(/Windows Phone/i)
    ) {
      isMobile = true;
    }
  });
</script>

<Header />

{#if isMobile || $page.url.pathname.includes('/docs')}
  <Banner isWarning />
{/if}

{#if authBlockedReason}
  <Banner bannerText={authBlockedReason} />
{/if}

<main class="container">
  <slot />
</main>

<Footer />
