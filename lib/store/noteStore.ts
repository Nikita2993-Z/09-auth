import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Draft {
  title: string;
  content: string;
  tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
}

export interface NoteStore {
  draft: Draft;
  setDraft: (updated: Partial<Draft>) => void;
  clearDraft: () => void;
}

const initialDraft: Draft = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>()(
  persist<NoteStore>(
    (set) => ({
      draft: initialDraft,
      setDraft: (updated) =>
        set((state) => ({ draft: { ...state.draft, ...updated } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-draft-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);