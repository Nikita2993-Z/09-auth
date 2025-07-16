import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NoteDetailsClient from './NoteDetails.client';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = params;
  const idNum = Number(id);
  if (isNaN(idNum)) {
    return notFound();
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={idNum} />
    </HydrationBoundary>
  );
}