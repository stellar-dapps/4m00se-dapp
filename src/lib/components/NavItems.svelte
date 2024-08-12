<script lang="ts">
  import AuthButton from '$lib/components/AuthButton.svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { page } from '$app/stores';

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
{/if}
<li><a href="/docs" class="secondary" class:contrast={$page.url.pathname === '/docs'}>Get Started</a></li>
<li><a href="https://github.com/stellar-dapps/4m00se" class="secondary" target="_blank">GitHub ↗️</a></li>
<li>
  <a href="/demo/Stellar _ Build Better on Stellar_ Smart Contract Challenge.html" class="secondary" target="_blank"
    >Demo ↗️</a
  >
</li>

<li><AuthButton /></li>
