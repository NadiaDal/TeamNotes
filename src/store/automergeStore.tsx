import Automerge, {Table, FreezeObject} from 'automerge';
import {NoteFormItem, NoteItem, UUID} from '../types/notes';

interface AutomergeNoteItem extends Omit<NoteItem, 'priority' | 'id'> {
  id?: UUID;
  priority: Automerge.Counter;
}

interface Document {
  items: Table<AutomergeNoteItem>;
}

class AutomergeStore {
  private store: Document;
  constructor(store: Document) {
    this.store = store;
  }

  get items(): NoteItem[] {
    return this.store.items.rows
      .map(item => ({
        ...item,
        priority: item.priority.value,
      }))
      .sort((a, b) => a.priority - b.priority);
  }

  persist() {
    return Automerge.save(this.store as FreezeObject<Document>);
  }

  restore(store: string | null) {
    if (store) {
      this.store = Automerge.load(store);
    }
  }

  addItem(item: NoteFormItem) {
    this.store = Automerge.change<Document, Document>(this.store, doc => {
      const note = {
        ...item,
        createdAt: Date.now(),
        priority: new Automerge.Counter(this.store.items.count),
      };
      doc.items.add(note);
    });
  }

  updateItem(item: NoteItem) {
    this.store = Automerge.change<Document, Document>(this.store, doc => {
      let note = doc.items.byId(item.id);
      note.name = item.name;
      note.description = item.description;
    });
  }

  swapPriority(firstId: UUID, secondId: UUID) {
    this.store = Automerge.change<Document, Document>(this.store, doc => {
      let firstNote = doc.items.byId(firstId);
      let secondNote = doc.items.byId(secondId);
      firstNote.priority.increment();
      secondNote.priority.decrement();
    });
  }
}

export default new AutomergeStore(
  Automerge.change<Document, Document>(Automerge.init(), doc => {
    doc.items = new Automerge.Table<AutomergeNoteItem>();
  }),
);
