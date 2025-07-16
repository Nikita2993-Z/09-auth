import type { Metadata } from 'next';
import { fetchNotesServer } from '@/lib/api/serverApi';
import css from './Notes.client.module.css';

interface Props {
  params: { slug: string[] };
}

export const metadata: Metadata = {
  title: 'Filtered Notes',
};

export default async function FilteredNotesPage(props: Props) {
  const { slug } = await props.params;
  const tagParam = slug[0];
  const effectiveTag = tagParam.toLowerCase() === 'all' ? undefined : tagParam;
  const { notes } = await fetchNotesServer('', 1, effectiveTag);

  return (
    <main className={css.mainContent}>
      <h1 className={css.title}>
        {effectiveTag ? `Notes tagged “${effectiveTag}”` : 'All Notes'}
      </h1>
      <ul className={css.notesList}>
        {notes.map((note) => (
          <li key={note.id} className={css.noteItem}>
            {note.title}
          </li>
        ))}
      </ul>
    </main>
  );
}