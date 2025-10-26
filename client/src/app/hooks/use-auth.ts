import { useMemo } from 'react';
import { selectAuth } from '@/app/store/auth-store';

export const useAuth = () => {
  const { user, tokens, login, logout, isHydrated } = selectAuth((state) => state);

  return useMemo(
    () => ({
      user,
      tokens,
      login,
      logout,
      isHydrated,
      isAuthenticated: Boolean(user && tokens),
      role: user?.role,
    }),
    [user, tokens, login, logout, isHydrated],
  );
};
