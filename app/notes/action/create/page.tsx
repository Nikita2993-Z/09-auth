import css from './page.module.css';
import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create note – NoteHub',
  description: 'Page for creating a new note in NoteHub',
  openGraph: {
    title: 'Create note – NoteHub',
    description: 'Page for creating a new note in NoteHub',
    url: 'https://ac.goit.global/fullstack/react/notes/action/create',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}