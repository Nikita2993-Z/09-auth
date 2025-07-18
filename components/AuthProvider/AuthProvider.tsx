'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getSession, getMe } from '@/lib/api/clientApi';
import type { User } from '@/types/user';
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

export default function AuthProvider({
  children,
  initialUser = null,
}: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let cancelled = false;

    async function initAuth() {
      if (initialUser) {
        setUser(initialUser);
        setLoading(false);
        return;
      }

      try {
        const session = await getSession();
        if (!session) {
          if (!cancelled) clearAuth();
        } else {
          const profile = await getMe();
          if (!cancelled) setUser(profile);
        }
      } catch {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    initAuth();
    return () => {
      cancelled = true;
    };
  }, [initialUser, setUser, clearAuth]);

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }

  return <>{children}</>;
}