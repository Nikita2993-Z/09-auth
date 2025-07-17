'use client';
import { useState, useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getSession } from '@/lib/api/clientApi';
import css from './AuthProvider.module.css';

interface Props { children: ReactNode; }
export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(s => s.user);
  const setUser = useAuthStore(s => s.setUser);
  const clearAuth = useAuthStore(s => s.clearAuth);

  useEffect(() => {
    async function init() {
      if (user) {
        setLoading(false);
        return;
      }
      try {
        const sessionUser = await getSession();
        if (sessionUser) {
          setUser(sessionUser);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [user, setUser, clearAuth]);

  if (loading) {
    return <div className={css.loader}>Loading...</div>;
  }
  return <>{children}</>;
}