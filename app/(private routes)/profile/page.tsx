import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Profile – NoteHub',
  description: 'Your user profile page',
  openGraph: {
    title: 'Profile – NoteHub',
    description: 'Manage your NoteHub profile',
    url: 'https://your-domain.vercel.app/profile',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg' },
    ],
  },
};

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <ProfileClient />
    </main>
  );
}