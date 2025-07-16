import cssStyles from "./NoteList.module.css";
import type { Note } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../lib/api/clientApi";
import Loading from "@/app/loading";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useState } from "react";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingNoteId, setDeletingNoteId] = useState<Note["id"] | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: Note["id"]) => {
      await deleteNote(id.toString());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setDeletingNoteId(null);
    },
    onError: () => {
      setDeletingNoteId(null);
    },
  });

  const handleDelete = (id: Note["id"]) => {
    setDeletingNoteId(id);
    mutation.mutate(id);
  };

  const { isError } = mutation;

  return (
    <>
      <ul className={cssStyles.list}>
        {notes.map((note) => (
          <li className={cssStyles.listItem} key={note.id}>
            <h2 className={cssStyles.title}>{note.title}</h2>
            <p className={cssStyles.content}>{note.content}</p>
            <div className={cssStyles.footer}>
              <span className={cssStyles.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={cssStyles.link}>
                View details
              </Link>
              <button
                className={cssStyles.button}
                onClick={() => handleDelete(note.id)}
                disabled={deletingNoteId === note.id}
              >
                {deletingNoteId !== note.id ? "Delete" : "In progress"}
                {deletingNoteId === note.id && <Loading />}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isError && <ErrorMessage />}
    </>
  );
}