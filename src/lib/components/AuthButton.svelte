<script lang="ts">
  import { onMount } from 'svelte';
  import FreighterAPI from '@stellar/freighter-api';
  import { authStore } from '$lib/stores/auth.store.ts';

  const { isAllowed, setAllowed, getUserInfo, isConnected } = FreighterAPI;

  let stellarPublicKey: string;
  let isAuthenticated: boolean;
  let buttonText = 'Sign in';
  let isButtonDisabled = false;
  let isWalledActionInProgress = false;

  authStore.subscribe((value) => {
    isAuthenticated = value.isAuthenticated;
  });

  onMount(async () => {
    // isAllowed never finalize if not allowed
    if (await isAllowed()) {
      isWalledActionInProgress = true;
      const publicKey = await getStellarPublicKey();

      if (publicKey) {
        setLoggedIn(publicKey);
      } else {
        setWalletIsLocked();
      }
    }
  });

  async function getStellarPublicKey() {
    const { publicKey } = await getUserInfo();
    return publicKey;
  }

  async function setLoggedIn(publicKey: string) {
    isButtonDisabled = true;
    buttonText = `Signed in as ${publicKey}`;
    stellarPublicKey = publicKey;
    authStore.set({ isAuthenticated: true, user: publicKey });
    isWalledActionInProgress = false;
  }

  async function handleSignIn() {
    isWalledActionInProgress = true;
    if (await isConnected()) {
      await setAllowed();
      const publicKey = await getStellarPublicKey();
      await setLoggedIn(publicKey);
    } else {
      setWalletIsNotAvailable();
    }
  }

  function setWalletIsLocked() {
    isButtonDisabled = true;
    buttonText = 'Freighter is locked. Sign in & refresh the page.';
    isWalledActionInProgress = false;
  }

  function setWalletIsNotAvailable() {
    isButtonDisabled = true;
    buttonText = 'Freighter is not found. Install & refresh the page.';
    isWalledActionInProgress = false;
  }
</script>

<button
  aria-busy={isWalledActionInProgress}
  class="secondary"
  on:click={handleSignIn}
  disabled={isButtonDisabled || isWalledActionInProgress}
  title={buttonText}
>
  {buttonText}
</button>

<style>
  button {
    max-width: 15vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button[disabled] {
    pointer-events: auto;
    cursor: default;
  }
</style>
