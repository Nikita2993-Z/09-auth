"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import styles from "./NoteDetails.module.css";

type NoteDetailsClientProps = {
  id: number;
};

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const isValidId = !isNaN(id) && id > 0;

  const {
    data: note,
    isLoading,
    error,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: isValidId,
    refetchOnMount: false,
  });

  if (!isValidId) {
    return (
      <p className={styles.errorMessage}>
        Invalid note ID: <code>{String(id)}</code>
      </p>
    );
  }

  if (isError) throw error;

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {isLoading && <p className={styles.loadMessage}>Loading, please wait...</p>}

      {!error && !note && !isLoading && (
        <p className={styles.errorMessage}>Note not found.</p>
      )}

      {note && isSuccess && (
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
      )}
    </div>
  );
}