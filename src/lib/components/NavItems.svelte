<script lang="ts">
  import AuthButton from '$lib/components/AuthButton.svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

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

  let isAuthenticated: boolean;

  authStore.subscribe((value) => {
    isAuthenticated = value.isAuthenticated;
  });
</script>

{#if isAuthenticated}
  <li><a href="/dashboard" class="secondary" class:contrast={$page.url.pathname === '/dashboard'}>Dashboard</a></li>
  <li>
    <a href="/form-builder" class="secondary" class:contrast={$page.url.pathname === '/form-builder'}>Form Builder</a>
  </li>
  <li>
    <a href="/form-reader" class="secondary" class:contrast={$page.url.pathname === '/form-reader'}>Form Analyzer</a>
  </li>
  <!-- TODO get rid of it after testing -->
  <li>
    <a href="/contract-test" class="secondary" class:contrast={$page.url.pathname === '/contract-test'}>TEMP</a>
  </li>
{/if}
<li><a href="/docs" class="secondary" class:contrast={$page.url.pathname === '/docs'}>Get Started</a></li>
<li><a href="https://github.com/stellar-dapps/4m00se" class="secondary" target="_blank">GitHub ↗️</a></li>
<li>
  <a href="/demo/Stellar _ Build Better on Stellar_ Smart Contract Challenge.html" class="secondary" target="_blank"
    >Demo ↗️</a
  >
</li>

{#if !isMobile}
  <li><AuthButton /></li>
{/if}
