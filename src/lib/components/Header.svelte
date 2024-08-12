<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import NavItems from '$lib/components/NavItems.svelte';

  let isWideScreen = true;

  onMount(() => {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
      window.addEventListener('resize', handleResize);
    }
  });

  function handleResize() {
    if (typeof window !== 'undefined') {
      isWideScreen = window.matchMedia('(min-width: 1280px)').matches;
    }
  }

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', handleResize);
    }
  });
</script>

<header class="container">
  <nav>
    <ul>
      <li><a href="/" class="contrast"><strong>🫎 4m00se</strong></a></li>
    </ul>
    <ul>
      {#if isWideScreen}
        <NavItems />
      {:else}
        <li>
          <details class="dropdown">
            <summary> Menu </summary>
            <ul dir="rtl">
              <NavItems />
            </ul>
          </details>
        </li>
      {/if}
    </ul>
  </nav>
</header>

<style>
  nav ul:first-child li a {
    text-decoration: none;
  }
</style>
