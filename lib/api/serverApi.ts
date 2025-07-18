import api from './api';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const BACKEND_URL = 'https://notehub-api.goit.study';

async function buildCookieHeader(): Promise<string> {
  const store = await cookies();
  const all = store.getAll();
  if (!all.length) return '';
  return all.map(c => `${c.name}=${c.value}`).join('; ');
}

/**
 * SSR сессия: сразу пробуем получить профиль.
 * Возвращает User или null.
 */
export async function getSessionServer(): Promise<User | null> {
  const cookieHeader = await buildCookieHeader();
  try {
    const { data } = await api.get<User>('/users/me', {
      baseURL: BACKEND_URL,
      headers: { Cookie: cookieHeader },
    });
    return data;
  } catch {
    return null;
  }
}

/**
 * SSR профиль: явный экспорт для profile/page.tsx
 */
export async function fetchProfileServer(): Promise<User> {
  const cookieHeader = await buildCookieHeader();
  const { data } = await api.get<User>('/users/me', {
    baseURL: BACKEND_URL,
    headers: { Cookie: cookieHeader },
  });
  return data;
}

export interface NotesListResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotesServer(
  search: string,
  page: number,
  tag?: string
): Promise<NotesListResponse> {
  const cookieHeader = await buildCookieHeader();
  const perPage = 12;
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await api.get<NotesListResponse>('/notes', {
    baseURL: BACKEND_URL,
    headers: { Cookie: cookieHeader },
    params,
  });
  return data;
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  const cookieHeader = await buildCookieHeader();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    baseURL: BACKEND_URL,
    headers: { Cookie: cookieHeader },
  });
  return data;
}