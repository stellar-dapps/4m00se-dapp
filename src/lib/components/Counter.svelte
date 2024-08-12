<script>
  import incrementor from '../../contracts/soroban_increment_contract';
  import { onMount } from 'svelte';

  import pkg from '@stellar/freighter-api';
  const { isAllowed, getPublicKey, signTransaction } = pkg;

  let currentValue = '???';
  let isLoading = false;

  onMount(async () => {
    if (await isAllowed()) {
      const publicKey = await getPublicKey();
      if (publicKey) incrementor.options.publicKey = publicKey;
    }
  });

  async function handleIncrement() {
    isLoading = true;
    currentValue += '<span class="visually-hidden"> – updating…</span>';

    try {
      const tx = await incrementor.increment();
      const { result } = await tx.signAndSend({ signTransaction });

      // Only use `innerHTML` with contract values you trust!
      // Blindly using values from an untrusted contract opens your users to script injection attacks!
      currentValue = result.toString();
    } catch (error) {
      console.error('Error incrementing:', error);
    } finally {
      isLoading = false;
    }
  }
</script>

<strong>Incrementor</strong><br />
Current value: <strong id="current-value" aria-live="polite">{@html currentValue}</strong><br />
<br />
<button on:click={handleIncrement} aria-controls="current-value" disabled={isLoading} class:loading={isLoading}>
  {#if isLoading}
    Loading...
  {:else}
    Increment
  {/if}
</button>
