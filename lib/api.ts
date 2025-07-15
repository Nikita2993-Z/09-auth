import axios from "axios";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import type { Draft } from "@/lib/store/noteStore";

// Проксирование через внутренние API-роуты Next.js
axios.defaults.baseURL = "";               // относительные пути к /api/...
axios.defaults.withCredentials = true;     // передавать куки для авторизации

// Тип ответа для списка заметок
export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

/** POST /api/auth/login */
export async function login(email: string, password: string): Promise<User> {
  const res = await axios.post<User>("/api/auth/login", { email, password });
  return res.data;
}

/** POST /api/auth/register */
export async function register(email: string, password: string): Promise<User> {
  const res = await axios.post<User>("/api/auth/register", { email, password });
  return res.data;
}

/** POST /api/auth/logout */
export async function logout(): Promise<void> {
  await axios.post("/api/auth/logout");
}

/** GET /api/auth/session */
export async function getSession(): Promise<User | null> {
  try {
    const res = await axios.get<User>("/api/auth/session");
    return res.data;
  } catch {
    return null;
  }
}

/** GET /api/users/me */
export async function fetchProfile(): Promise<User> {
  const res = await axios.get<User>("/api/users/me");
  return res.data;
}

/** PATCH /api/users/me */
export async function updateProfile(data: Partial<User>): Promise<User> {
  const res = await axios.patch<User>("/api/users/me", data);
  return res.data;
}

// Работа с заметками

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

  const res = await axios.get<NotesResponse>("/api/notes", { params });
  return res.data;
}

/** GET /api/notes/:id */
export async function fetchNoteById(id: number): Promise<Note> {
  const res = await axios.get<Note>(`/api/notes/${id}`);
  return res.data;
}

/** POST /api/notes */
export async function createNote(note: Draft): Promise<Note> {
  const res = await axios.post<Note>("/api/notes", note);
  return res.data;
}

/** DELETE /api/notes/:id */
export async function deleteNote(id: number): Promise<Note> {
  const res = await axios.delete<Note>(`/api/notes/${id}`);
  return res.data;
}