'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export default function ProfileClient() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  return (
    <div className={css.profileCard}>
      <div className={css.header}>
        <h1 className={css.formTitle}>Profile Page</h1>
        <Link href="/profile/edit" className={css.editProfileButton}>
          Edit Profile
        </Link>
      </div>
      <div className={css.avatarWrapper}>
        <Image
          src={user.avatar ?? '/avatar-placeholder.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
      </div>
      <div className={css.profileInfo}>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}