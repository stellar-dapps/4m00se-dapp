<script lang="ts">
  export let bannerText = `<strong>4m00se</strong> is currently in early development, which may result in some functional limitations. At this stage,
    we support desktop browser environments due to Freighter wallet authentication. Mobile access offers a demo of our features.
    You may experience occasional slowness as we optimize the application. Please note that we are currently operating on
    Stellar's testnet, with no mainnet access available yet.`;

  // State to control the visibility of the banner
  let visible = true;

  // Function to hide the banner
  function closeBanner() {
    visible = false;
  }
</script>

{#if visible}
  <aside class="container">
    <article class="pico-background-pink-50 disclaimer">
      <span>⚠️</span>
      <span>{@html bannerText}</span>
      <span>
        <button class="close-button" on:click={closeBanner}>❌</button>
      </span>
    </article>
  </aside>
{/if}

<style>
  .disclaimer {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
  }

  .close-button {
    background: none;
    border: none;
    color: inherit;
    font: inherit;
    line-height: normal;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .close-button:focus {
    outline: none;
  }
</style>
