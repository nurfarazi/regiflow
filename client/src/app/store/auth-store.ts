import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthTokens, AuthUser } from '@/app/features/auth/types';

export type AuthState = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isHydrated: boolean;
};

export type AuthActions = {
  login: (payload: { user: AuthUser; tokens: AuthTokens }) => void;
  logout: () => void;
  markHydrated: () => void;
  updateTokens: (tokens: AuthTokens) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isHydrated: true,
      login: ({ user, tokens }) => set({ user, tokens }),
      logout: () => set({ user: null, tokens: null }),
      markHydrated: () => set({ isHydrated: true }),
      updateTokens: (tokens) => set({ tokens }),
    }),
    {
      name: 'regiflow-auth-store',
      partialize: (state) => ({ user: state.user, tokens: state.tokens }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export const selectAuth = <T,>(selector: (state: AuthState & AuthActions) => T) =>
  useAuthStore(selector);
