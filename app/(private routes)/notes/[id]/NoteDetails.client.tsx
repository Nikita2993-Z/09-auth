'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';
import styles from './NoteDetails.module.css';

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const noteId = id.trim();
  const enabled = noteId.length > 0;

  const {
    data: note,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (!enabled) {
    return (
      <p className={styles.errorMessage}>
        Invalid note ID: <code>{id}</code>
      </p>
    );
  }

  if (isError) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Error</h2>
        <p className={styles.errorMessage}>
          Failed to load note details.{' '}
          {error instanceof Error ? error.message : ''}
        </p>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <p className={styles.loadMessage}>Loading, please wait...</p>;
  }

  if (!note) {
    return <p className={styles.errorMessage}>Note not found.</p>;
  }

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString('uk-UA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.header}>
          <h2>{note.title}</h2>
          <button className={styles.editBtn}>Edit note</button>
        </div>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.date}>
          {note.updatedAt
            ? `Updated at: ${formatDate(note.updatedAt)}`
            : `Created at: ${formatDate(note.createdAt)}`}
        </p>
      </div>
    </div>
  );
}