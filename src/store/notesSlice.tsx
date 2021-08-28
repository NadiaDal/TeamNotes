import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteItem} from '../types/notes';
import Automerge, {Table} from 'automerge';

interface Document {
  items: Table<NoteItem>;
}

interface InitState {
  items: NoteItem[];
}

let store = Automerge.change<Document, Document>(Automerge.init(), doc => {
  doc.items = new Automerge.Table<NoteItem>();
});

const initState: InitState = {
  items: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState: initState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<NoteItem, 'id'>>) => {
      store = Automerge.change<Document, Document>(store, doc => {
        doc.items.add(action.payload as NoteItem);
      });
      state.items = store.items.rows;
    },
    updateNote: (state, {payload}: PayloadAction<NoteItem>) => {
      store = Automerge.change<Document, Document>(store, doc => {
        let note = doc.items.byId(payload.id);
        note.name = payload.name;
        note.description = payload.description;
      });
      state.items = store.items.rows;
    },
  },
});

export const {addNote, updateNote} = notesSlice.actions;

export default notesSlice.reducer;
