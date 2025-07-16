import { cookies } from 'next/headers';
import api from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

export async function getSessionServer(): Promise<import('axios').AxiosResponse<User> | null> {
  try {
    return await api.get<User>('/auth/session', {
      headers: { Cookie: cookies().toString() },
      withCredentials: true,
    });
  } catch {
    return null;
  }
}

export async function fetchProfileServer(): Promise<User> {
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookies().toString() },
    withCredentials: true,
  });
  return data;
}

export async function fetchNotesServer(
  search: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const perPage = 12;
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const { data } = await api.get<{ notes: Note[]; totalPages: number }>('/notes', {
    headers: { Cookie: cookies().toString() },
    params,
    withCredentials: true,
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookies().toString() },
    withCredentials: true,
  });
  return data;
}