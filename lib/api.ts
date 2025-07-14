import axios from "axios";
import { Note } from "../types/note";

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!API_KEY) throw new Error("API token is not defined");

axios.defaults.baseURL = `https://notehub-public.goit.study/api`;
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteValues {
  title: string;
  content?: string;
  tag: "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";
}

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> {
  const perPage = 12;

  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await axios.get<NotesResponse>("/notes", { params });

  return res.data;
}

export async function createNote({
  title,
  content,
  tag,
}: CreateNoteValues): Promise<Note> {
  try {
    const res = await axios.post<Note>("/notes", {
      title,
      content,
      tag,
    });
    return res.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw new Error("Failed to create note. Please check your input.");
  }
}

export async function deleteNote(id: number): Promise<Note> {
  try {
    const res = await axios.delete<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting note with ID ${id}:`, error);
    throw new Error("Failed to delete note. It may not exist.");
  }
}

export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const res = await axios.get<Note>(`/notes/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching note with ID ${id}:`, error);
    throw new Error("Failed to fetch note details.");
  }
}