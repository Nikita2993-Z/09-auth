import NotePreviewClient from './NotePreview.client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return null;
  }

  return <NotePreviewClient />;
}