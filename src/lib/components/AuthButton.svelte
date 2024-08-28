<script lang="ts">
  import { onMount } from 'svelte';
  import FreighterAPI from '@stellar/freighter-api';
  import { authStore } from '$lib/stores/auth.store.ts';
  import { goto } from '$app/navigation';

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

  function setAuthBlockedReason(reason: string) {
    authStore.update((state) => ({
      ...state,
      authBlockedReason: reason
    }));
  }

  async function getStellarPublicKey() {
    const { publicKey } = await getUserInfo();
    return publicKey;
  }

  async function handleSignIn() {
    isWalledActionInProgress = true;
    setAuthBlockedReason(`Waiting for Freighter sign in. Refresh the page in case of any issues.`);
    if (await isConnected()) {
      await setAllowed();
      const publicKey = await getStellarPublicKey();
      await setLoggedIn(publicKey, true);
    } else {
      setWalletIsNotAvailable();
    }
  }

  /** Redirect to app if logging in was triggered explicitly (by log in button), ignore redirect otherwise */
  async function setLoggedIn(publicKey: string, isExplicit = false) {
    isButtonDisabled = true;
    buttonText = publicKey;
    stellarPublicKey = publicKey;
    authStore.set({ isAuthenticated: true, user: publicKey, authBlockedReason: null });
    isWalledActionInProgress = false;
    isExplicit && goto('/app');
  }

  function setWalletIsLocked() {
    isButtonDisabled = true;
    buttonText = 'Freighter locked';
    setAuthBlockedReason(
      `Freighter extension is locked. Sign in to your Freighter wallet and refresh the page to access all features.`
    );
    isWalledActionInProgress = false;
  }

  function setWalletIsNotAvailable() {
    isButtonDisabled = true;
    buttonText = 'Freighter not found';
    setAuthBlockedReason(
      `Freighter extension not found. <a href="https://www.freighter.app/" target="_blank">Install it</a> and refresh the page to access all features.`
    );
    isWalledActionInProgress = false;
  }
</script>

<button
  aria-busy={isWalledActionInProgress}
  class="secondary auth-button"
  on:click={handleSignIn}
  disabled={isButtonDisabled || isWalledActionInProgress}
  title={buttonText}
>
  {buttonText}
</button>

<style>
  button {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  button[disabled] {
    pointer-events: auto;
    cursor: default;
  }
</style>
