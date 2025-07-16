'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getSession, fetchProfile } from '@/lib/api/clientApi';
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    async function initAuth() {
      try {
        const sessionUser = await getSession();
        if (sessionUser) {
          const profile = await fetchProfile();
          setUser(profile);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, [setUser, clearAuth]);

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }

  return <>{children}</>;
}