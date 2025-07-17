import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { fetchProfileServer } from '@/lib/api/serverApi';
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

export default async function ProfilePage() {
  let user;
  try {
    user = await fetchProfileServer();
  } catch {
  
    redirect('/sign-in');
  }
  if (!user) {
    redirect('/sign-in');
  }

  const avatarSrc = user.avatar ?? '/default-avatar.png';

  return (
    <main className={css.mainContent}>
      <div className={css.profile}>
        <Image
          src={avatarSrc}
          alt={`${user.username} avatar`}
          width={100}
          height={100}
          className={css.avatar}
        />
        <h1 className={css.username}>{user.username}</h1>
        <p className={css.email}>{user.email}</p>
        <Link href="/profile/edit" className={css.editLink}>
          Edit Profile
        </Link>
      </div>
    </main>
  );
}
