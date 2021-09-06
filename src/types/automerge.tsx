import {UUID} from './notes';

export interface AutomergeNoteItem {
  id: UUID;
  name: string;
  description?: string;
  priority: number;
  createdAt: number;
}

export interface Document {
  items: AutomergeNoteItem[];
}
