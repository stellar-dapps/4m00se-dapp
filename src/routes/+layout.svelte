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
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  let authBlockedReason: string | null | undefined = $state();

  authStore.subscribe((value) => {
    authBlockedReason = value.authBlockedReason;
  });

  let isMobile = $state(false);

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

{#if isMobile}
  <Banner isWarning />
{/if}

{#if authBlockedReason && $page.url.pathname === '/'}
  <Banner bannerText={authBlockedReason} />
{/if}

<main class="container">
  {@render children?.()}
</main>

{#if !$page.url.pathname.includes('/app')}
  <Footer />
{/if}
