import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteByIdServer } from '@/lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

interface PageProps {
  // В Next.js 15 динамические params асинхронные
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Note details – NoteHub',
};

export default async function NoteDetailsPage({ params }: PageProps) {
  // дождёмся params
  const { id } = await params;

  // нет id — 404
  if (!id) {
    return notFound();
  }

  const qc = new QueryClient();

  try {
    // серверный запрос прямо на бекенд (с куками)
    const note = await fetchNoteByIdServer(id);
    // кладём данные в кэш, чтобы клиент не делал первый запрос
    qc.setQueryData(['note', id], note);
  } catch (err: unknown) {
    // аккуратно достаём status, если его прикрепили при throw
    let status: number | undefined;
    if (err && typeof err === 'object' && 'status' in err) {
      status = (err as { status?: number }).status;
    }

    if (status === 401) {
      // сессия умерла
      redirect('/sign-in');
    }
    if (status === 404) {
      // заметка не найдена
      return notFound();
    }

    console.error('Note load error (page):', err);
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}