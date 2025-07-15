import type { Metadata } from "next";
import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const idNum = Number(params.id);
  let note;
  try {
    note = await fetchNoteById(idNum);
  } catch {
    return {
      title: "Note not found – NoteHub",
      description: "The requested note was not found.",
      openGraph: {
        title: "Note not found – NoteHub",
        description: "The requested note was not found.",
        url: `https://ac.goit.global/fullstack/react/notes/${params.id}`,
        images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
      },
    };
  }

  const title = `${note.title} – NoteHub`;
  const description = note.content.slice(0, 160);
  const url = `https://ac.goit.global/fullstack/react/notes/${params.id}`;

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

export default async function NoteDetailsPage({ params }: PageProps) {
  const idNum = Number(params.id);
  if (isNaN(idNum)) return notFound();

  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["note", idNum],
      queryFn: () => fetchNoteById(idNum),
    });
  } catch {
    return notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={idNum} />
    </HydrationBoundary>
  );
}