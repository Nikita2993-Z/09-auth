import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NotePreviewClient from './NotePreview.client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = params;
  const parsedId = Number(id);
  if (isNaN(parsedId)) return notFound();

  const noteId = parsedId.toString();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient />
    </HydrationBoundary>
  );
}