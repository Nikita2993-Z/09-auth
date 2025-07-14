'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';
import css from './Notes.client.module.css';

interface NotesClientProps {
  tag?: string;
  initialQuery: string;
  initialPage: number;
  initialData: { notes: Note[]; totalPages: number };
}

export default function NotesClient({
  tag,
  initialQuery,
  initialPage,
  initialData,
}: NotesClientProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [debouncedQuery] = useDebounce(query, 500);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['notes', tag, debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage, tag),
    initialData,
    placeholderData: initialData,
    refetchOnWindowFocus: false,
  });

  return (
    <div>
      <div className={css.controls}>
        <SearchBox inputValue={query} onChange={setQuery} />
        <Pagination
          totalPages={data?.totalPages ?? 1}
          currentPage={currentPage}
          setPage={setCurrentPage}
        />
        <Link href="/notes/action/create" className={css.createButton}>
          Create note +
        </Link>
      </div>

      {data?.notes && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isFetching && <p>Loading...</p>}
      {isError && <p>Error loading notes.</p>}
    </div>
  );
}