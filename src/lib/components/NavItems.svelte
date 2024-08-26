<script lang="ts">
  import AuthButton from '$lib/components/AuthButton.svelte';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

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

  function goToApp() {
    goto('/app');
  }
</script>

<!--{#if $page.url.pathname.includes('/app')}-->
<!--  <li>-->
<!--    <input type="search" name="search" placeholder="Search" aria-label="Search" />-->
<!--  </li>-->
<!--{/if}-->

<li>
  <a href="/docs" class="secondary" class:contrast={$page.url.pathname === '/docs'}
    >{$page.url.pathname.includes('/app') ? 'Documentation' : 'Get Started'}</a
  >
</li>

{#if !$page.url.pathname.includes('/app')}
  <li>
    <a href="/blog" class="secondary" class:contrast={$page.url.pathname === '/blog'}>Blog</a>
  </li>

  <li><a href="https://github.com/stellar-dapps/4m00se-dapp" class="secondary" target="_blank">GitHub</a></li>
  <li>
    <a href="/demo/Stellar _ Build Better on Stellar_ Smart Contract Challenge.html" class="secondary" target="_blank"
      >Examples</a
    >
  </li>
{/if}

{#if !isMobile}
  {#if isAuthenticated && !$page.url.pathname.includes('/app')}
    <li><button type="button" on:click={goToApp} class="auth-button">4m00se app</button></li>
  {:else}
    <li><AuthButton /></li>
  {/if}
{/if}

<style>
  @media (max-width: 1024px) {
    input[type='search'] {
      width: 8rem;
    }
  }
  @media (max-width: 640px) {
    input[type='search'] {
      display: none;
    }
  }
</style>
