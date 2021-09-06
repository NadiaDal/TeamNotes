export type UUID = string;

export interface NoteItem {
  id: UUID;
  name: string;
  description?: string;
  createdAt: number;
}

export type NoteFormItem = {
  name: string;
  description?: string;
};
