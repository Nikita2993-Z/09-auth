import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import api from '@/lib/api/api';
import type { Note } from '@/types/note';

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;
  const res = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return NextResponse.json(res.data);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;
  await api.delete(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return NextResponse.json({ message: 'Note deleted successfully' });
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const cookieStore = cookies();
  const { id } = params;
  const body = await request.json();
  const res = await api.patch<Note>(`/notes/${id}`, body, {
    headers: { Cookie: cookieStore.toString() },
  });
  return NextResponse.json(res.data);
}