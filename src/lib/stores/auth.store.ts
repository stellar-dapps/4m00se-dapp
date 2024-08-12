import { writable } from 'svelte/store';

interface AuthStoreState {
  isAuthenticated: boolean;
  user: string | null;
}

export const authStore = writable<AuthStoreState>({
  isAuthenticated: false,
  user: null
});
