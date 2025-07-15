import type { Metadata } from "next";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string[] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const rawTag = params.slug[0];
  const tag = rawTag === "All" ? "All" : rawTag;
  const title = `Notes filtered by ${tag} – NoteHub`;
  const description = `Viewing notes filtered by ${tag} in NoteHub.`;
  const url = `https://ac.goit.global/fullstack/react/notes/filter/${rawTag}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
    },
  };
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = params;
  const rawTag = slug[0];
  const tag = rawTag === "All" ? undefined : rawTag;
  const pageNum = 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, "", pageNum],
    queryFn: () => fetchNotes("", pageNum, tag),
  });

  const initialData = queryClient.getQueryData<{ notes: Note[]; totalPages: number }>([
    "notes",
    tag,
    "",
    pageNum,
  ]);

  if (!initialData) {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        initialQuery=""
        initialPage={pageNum}
        initialData={initialData}
      />
    </HydrationBoundary>
  );
}