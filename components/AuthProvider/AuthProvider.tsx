'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi'; 
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (user) {
        setLoading(false);
        return;
      }
      try {
        const me = await getMe(); 
        if (!cancelled) {
          if (me) setUser(me);
          else clearAuth();
        }
      } catch {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [user, setUser, clearAuth]);

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }

  return <>{children}</>;
}