import api from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { Draft } from '@/lib/store/noteStore';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

/** GET /api/auth/session */
export async function getSession(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
}

/** POST /api/auth/login */
export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
}

/** POST /api/auth/register */
export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>('/auth/register', { email, password });
  return data;
}

/** POST /api/auth/logout */
export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

/** GET /api/users/me */
export async function fetchProfile(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}

/** PATCH /api/users/me */
export async function updateProfile(user: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
}

/** GET /api/notes?search=&page=&perPage=12&tag= */
export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> {
  const perPage = 12;
  const params: Record<string, string | number> = { page, perPage };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const { data } = await api.get<NotesResponse>('/notes', { params });
  return data;
}

/** GET /api/notes/:id */
export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

/** POST /api/notes */
export async function createNote(note: Draft): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}

/** DELETE /api/notes/:id */
export async function deleteNote(id: number): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}