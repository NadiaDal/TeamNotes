import Automerge, {FreezeObject} from 'automerge';
import {NoteFormItem, NoteItem, UUID} from '../types/notes';
import {Document} from '../types/automerge';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

class AutomergeStore {
  private document: FreezeObject<Document>;
  constructor(document: FreezeObject<Document>) {
    this.document = document;
  }

  get items(): NoteItem[] {
    return this.document.items ?? [];
  }

  get size(): number {
    return (this.document.items ?? []).length;
  }

  persist(): string {
    return Automerge.save(this.document);
  }

  restore(store: string | null): void {
    if (store) {
      this.document = Automerge.load(store);
    }
  }

  merge(serverHistory: string): void {
    const remoteDoc = Automerge.applyChanges(
      Automerge.init(),
      JSON.parse(serverHistory),
    );
    const changesFromServer = Automerge.getChanges(this.document, remoteDoc);
    this.document = Automerge.applyChanges(this.document, changesFromServer);
  }

  addItem(item: NoteFormItem): Automerge.Change[] {
    const newDoc = Automerge.change<FreezeObject<Document>, Document>(
      this.document,
      doc => {
        const note = {
          ...item,
          id: uuidv4(),
          createdAt: Date.now(),
          priority: this.size,
        };
        doc.items.push(note);
      },
    );
    const changes = Automerge.getChanges(this.document, newDoc);
    this.document = newDoc;
    return changes;
  }

  updateItem(item: NoteItem): Automerge.Change[] {
    const newDoc = Automerge.change<FreezeObject<Document>, Document>(
      this.document,
      doc => {
        let note = doc.items.find(i => i.id === item.id);
        if (note) {
          note.name = item.name;
          note.description = item.description;
        }
      },
    );
    const changes = Automerge.getChanges(this.document, newDoc);
    this.document = newDoc;
    return changes;
  }

  swapPriority(firstId: UUID, secondId: UUID) {
    const newDoc = Automerge.change<FreezeObject<Document>, Document>(
      this.document,
      doc => {
        const firstIdx = doc.items.findIndex(item => item.id === firstId);
        const secondIdx = doc.items.findIndex(item => item.id === secondId);
        const firstNote = doc.items[firstIdx];
        const note = doc.items[secondIdx];
        delete doc.items[firstIdx];
        // insertAt from automerge
        // @ts-ignore
        doc.items.insertAt(firstIdx, {...note});
        delete doc.items[secondIdx];
        // @ts-ignore
        doc.items.insertAt(secondIdx, {...firstNote});
      },
    );
    const changes = Automerge.getChanges(this.document, newDoc);
    this.document = newDoc;
    return changes;
  }
  applyChanges(changes: string) {
    // TODO fix order by priority
    this.document = Automerge.applyChanges(this.document, JSON.parse(changes));
  }
  getAllChanges() {
    return Automerge.getAllChanges(this.document);
  }
}

export default new AutomergeStore(Automerge.from({items: []}));
