import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteItem} from '../types/notes';
import AutomergeStore from './automergeStore';
import {getFromStorage} from './asyncStore';

interface InitState {
  isLoading: boolean;
  items: NoteItem[];
}

const initState: InitState = {
  isLoading: false,
  items: [],
};

export const loadStore = createAsyncThunk('notes/loadStore', getFromStorage);

const notesSlice = createSlice({
  name: 'notes',
  initialState: initState,
  reducers: {
    addNote: (state, action: PayloadAction<Omit<NoteItem, 'id'>>) => {
      AutomergeStore.addItem(action.payload);
      state.items = AutomergeStore.items;
    },
    updateNote: (state, action: PayloadAction<NoteItem>) => {
      AutomergeStore.updateItem(action.payload);
      state.items = AutomergeStore.items;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadStore.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(loadStore.fulfilled, (state, action) => {
        state.isLoading = false;
        AutomergeStore.restore(action.payload);
        state.items = AutomergeStore.items;
      });
  },
});

export const {addNote, updateNote} = notesSlice.actions;

export default notesSlice.reducer;
