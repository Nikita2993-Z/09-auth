import { notFound } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import NotePreviewClient from './NotePreview.client';

interface PageProps {
  // важно: params теперь асинхронный
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: PageProps) {
  // дожидаемся params
  const { id } = await params;

  // валидация
  const parsedId = Number(id);
  if (isNaN(parsedId)) return notFound();

  // подготавливаем кэш для React Query (используем строку как ключ)
  const noteId = String(parsedId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаём id клиенту (если NotePreviewClient его ожидает) */}
      <NotePreviewClient />
    </HydrationBoundary>
  );
}