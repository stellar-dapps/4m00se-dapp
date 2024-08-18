<script lang="ts">
  export let isWarning = false;
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
  <div class="container">
    <article
      class={isWarning ? 'pico-background-pink-50 disclaimer' : 'pico-background-azure-50 disclaimer'}
      role="alert"
    >
      <span class="banner-content">{@html bannerText}</span>
    </article>
  </div>
{/if}

<style>
  .disclaimer {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
  }

  .banner-content {
    flex: 1;
  }
</style>
