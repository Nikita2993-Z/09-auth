'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';

export default function AuthNavigation() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const clearAuth = useAuthStore(state => state.clearAuth);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearAuth();
    router.push('/sign-in');
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button className={css.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    );
  } else {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
            Login
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }
}