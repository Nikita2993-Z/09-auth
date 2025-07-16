import api from './api';
import type { User } from '@/types/user';
import type { Note } from '@/types/note';
import type { Draft } from '@/lib/store/noteStore';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function getSession(): Promise<User | null> {
  try {
    const { data } = await api.get<User>('/auth/session');
    return data;
  } catch {
    return null;
  }
}


export async function login(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>('/auth/login', { email, password });
  return data;
}


export async function register(email: string, password: string): Promise<User> {
  const { data } = await api.post<User>('/auth/register', { email, password });
  return data;
}


export async function logout(): Promise<void> {
  await api.post<void>('/auth/logout');
}


export async function fetchProfile(): Promise<User> {
  const { data } = await api.get<User>('/users/me');
  return data;
}


export async function updateProfile(user: Partial<User>): Promise<User> {
  const { data } = await api.patch<User>('/users/me', user);
  return data;
}


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


export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}


export async function createNote(note: Draft): Promise<Note> {
  const { data } = await api.post<Note>('/notes', note);
  return data;
}


export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
export async function updateNote(
  id: string,
  partial: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>
): Promise<Note> {
  const { data } = await api.patch<Note>(`/notes/${id}`, partial);
  return data;
}