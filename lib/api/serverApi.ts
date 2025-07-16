import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const BACKEND_URL = 'https://notehub-api.goit.study';

const serverApi = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});


export async function getSessionServer(): Promise<AxiosResponse<User> | null> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
    return await serverApi.get<User>('/auth/session', {
      headers: { Cookie: cookieHeader },
    });
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return null;
    }
    console.error('Session check failed:', err);
    return null;
  }
}

export async function fetchProfileServer(): Promise<User> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await serverApi.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}

export async function fetchNotesServer(
  search: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const perPage = 12;
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await serverApi.get<{ notes: Note[]; totalPages: number }>('/notes', {
    headers: { Cookie: cookieHeader },
    params,
  });
  return res.data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await serverApi.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return res.data;
}