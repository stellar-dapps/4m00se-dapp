<script lang="ts">
  import '@picocss/pico/css/pico.css';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
  <link
    rel="icon"
    href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫎</text></svg>"
  />
</svelte:head>

<Header />

<main class="container">
  <slot />
</main>

<Footer />
