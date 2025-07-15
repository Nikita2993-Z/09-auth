'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';
import css from './AuthProvider.module.css';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const user: User | null = await getSession();
        if (user) {
          setUser(user);
        } else {
          clearAuth();
          router.replace('/sign-in');
        }
      } catch {
        clearAuth();
        router.replace('/sign-in');
      } finally {
        setLoading(false);
      }
    }
    checkSession();
  }, [router, setUser, clearAuth]);

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }

  return <>{children}</>;
}