export type UUID = string;

export interface NoteItem {
  id: UUID;
  name: string;
  description?: string;
  priority: number;
  createdAt: number;
}

export type NoteEntities = Record<UUID, NoteItem>;
