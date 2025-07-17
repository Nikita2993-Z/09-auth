'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/clientApi'
import { useAuthStore } from '@/lib/store/authStore'
import css from './AuthNavigation.module.css'

export default function AuthNavigation() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  const user = useAuthStore(s => s.user)
  const clearAuth = useAuthStore(s => s.clearAuth)
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    clearAuth()
    router.push('/sign-in')
  }

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" className={css.navigationLink} prefetch={false}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    )
  } else {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" className={css.navigationLink} prefetch={false}>
            Login
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
            Sign up
          </Link>
        </li>
      </>
    )
  }
}