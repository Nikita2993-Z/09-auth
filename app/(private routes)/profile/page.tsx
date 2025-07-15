'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/lib/store/authStore';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Profile – NoteHub',
  description: 'Your user profile page',
  openGraph: {
    title: 'Profile – NoteHub',
    description: 'Manage your NoteHub profile',
    url: 'https://your-domain.vercel.app/profile',
    images: [{ url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' }],
  },
};

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
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
    </main>
  );
}