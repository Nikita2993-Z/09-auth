"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import styles from "./NotePreview.module.css";

export default function NotePreview() {
  const router = useRouter();
  const { id } = useParams();
  const parsedId = Number(id);

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", parsedId],
    queryFn: () => fetchNoteById(parsedId),
    enabled: !isNaN(parsedId),
    refetchOnWindowFocus: false,
  });

  const handleClose = () => {
    router.back();
  };

  
  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p className={styles.loading}>Loading note details...</p>
      </Modal>
    );
  }

  
  if (isError) {
    return (
      <Modal onClose={handleClose}>
        <div className={styles.errorContainer}>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>
            Failed to load note details. {error instanceof Error ? error.message : ''}
          </p>
        </div>
      </Modal>
    );
  }

  
  if (!note) {
    return (
      <Modal onClose={handleClose}>
        <p className={styles.notFound}>Note not found.</p>
      </Modal>
    );
  }

  
  return (
    <Modal onClose={handleClose}>
      <div className={styles.preview}>
        <h2 className={styles.title}>{note.title}</h2>
        <p className={styles.content}>{note.content}</p>
        <p className={styles.meta}>
          {note.updatedAt
            ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
            : `Created: ${new Date(note.createdAt).toLocaleString()}`}
        </p>
      </div>
    </Modal>
  );
}
