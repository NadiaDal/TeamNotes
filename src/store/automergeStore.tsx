import Automerge, {Table, FreezeObject} from 'automerge';
import {NoteItem} from '../types/notes';

interface Document {
  items: Table<NoteItem>;
}

class AutomergeStore {
  private store: Document;
  constructor(store: Document) {
    this.store = store;
  }

  get items(): NoteItem[] {
    return this.store.items.rows;
  }

  persist() {
    return Automerge.save(this.store as FreezeObject<Document>);
  }

  restore(store: string | null) {
    if (store) {
      this.store = Automerge.load(store);
    }
  }

  addItem(item: Omit<NoteItem, 'id'>) {
    this.store = Automerge.change<Document, Document>(this.store, doc => {
      doc.items.add(item as NoteItem);
    });
  }

  updateItem(item: NoteItem) {
    this.store = Automerge.change<Document, Document>(this.store, doc => {
      let note = doc.items.byId(item.id);
      note.name = item.name;
      note.description = item.description;
    });
  }
}

export default new AutomergeStore(
  Automerge.change<Document, Document>(Automerge.init(), doc => {
    doc.items = new Automerge.Table<NoteItem>();
  }),
);
