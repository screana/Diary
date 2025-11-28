// src/features/entries/types/entry.ts
export type World = {
  name: string;
  url?: string;
};

export type Entry = {
  id: string;
  date: string;   // "2025-11-28" みたいな yyyy-mm-dd
  title: string;
  body: string;
  worlds: World[] | null;
  guests: string | null;
  tags: string | null;
};

export type EntrySummary = Pick<Entry, 'id' | 'date' | 'title' | 'tags'>;
