import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://notehub-api.goit.study';

async function fetchWithCookies<T>(path: string, opts?: RequestInit): Promise<T> {
  const cookieHeader = cookies().toString();
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...opts,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
      ...(opts?.headers || {}),
    },
  });
  if (!res.ok) throw new Error(`Fetch error ${res.status} on ${path}`);
  return res.json();
}

export async function getSessionServer(): Promise<User | null> {
  try {
    return await fetchWithCookies<User>('/auth/session', { method: 'GET' });
  } catch {
    return null;
  }
}

export async function fetchProfileServer(): Promise<User> {
  return await fetchWithCookies<User>('/users/me', { method: 'GET' });
}

export async function fetchNotesServer(
  search: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  const perPage = 12;
  const params = new URLSearchParams({ page: String(page), perPage: String(perPage) });
  if (search) params.set('search', search);
  if (tag) params.set('tag', tag);
  return await fetchWithCookies<{ notes: Note[]; totalPages: number }>(`/notes?${params}`);
}

export async function fetchNoteByIdServer(id: string): Promise<Note> {
  return await fetchWithCookies<Note>(`/notes/${id}`, { method: 'GET' });
}