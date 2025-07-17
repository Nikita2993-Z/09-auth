import type { Metadata } from 'next';
import NotesClient from './Notes.client';
import { fetchNotesServer } from '@/lib/api/serverApi';

interface Props {
  params: { slug: string[] };
}

export const metadata: Metadata = {
  title: 'Notes – NoteHub',
};

export default async function FilteredNotesPage({ params }: Props) {
  const tagParam = params.slug[0];
  const effectiveTag = tagParam.toLowerCase() === 'all' ? undefined : tagParam;

  const initialData = await fetchNotesServer('', 1, effectiveTag);

  
  return (
    <NotesClient
      tag={effectiveTag}
      initialQuery=""
      initialPage={1}
      initialData={initialData}
    />
  );
}