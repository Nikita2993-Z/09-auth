
import { cookies } from 'next/headers';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';


async function fetchWithCookies(path: string, opts?: RequestInit) {
  const cookieHeader = cookies().toString();
  const res = await fetch(baseURL + path, {
    ...opts,
    headers: {
      ...(opts?.headers || {}),
      cookie: cookieHeader,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Fetch error ${res.status} on ${path}`);
  return res.json();
}

export async function getSessionServer(): Promise<User | null> {
  try {
    return await fetchWithCookies('/auth/session');
  } catch {
    return null;
  }
}

export async function fetchProfileServer(): Promise<User> {
  return fetchWithCookies('/users/me');
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
  return fetchWithCookies(`/notes?${params.toString()}`);
}

export async function fetchNoteByIdServer(id: number): Promise<Note> {
  return fetchWithCookies(`/notes/${id}`);
}