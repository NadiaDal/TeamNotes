import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteFormItem, NoteItem} from '../types/notes';
import AutomergeStore from './automergeStore';
import {getFromStorage} from './asyncStore';
import {UUID} from 'automerge';

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
    addNote: (state, action: PayloadAction<NoteFormItem>) => {
      AutomergeStore.addItem(action.payload);
      state.items = AutomergeStore.items;
    },
    updateNote: (state, action: PayloadAction<NoteItem>) => {
      AutomergeStore.updateItem(action.payload);
      state.items = AutomergeStore.items;
    },
    noteUp: (
      state,
      action: PayloadAction<{itemId: UUID; itemIndex: number}>,
    ) => {
      const prevItem = state.items[action.payload.itemIndex - 1];
      if (prevItem) {
        AutomergeStore.swapPriority(prevItem.id, action.payload.itemId);
        state.items = AutomergeStore.items;
      }
    },
    noteDown: (
      state,
      action: PayloadAction<{itemId: UUID; itemIndex: number}>,
    ) => {
      const nextItem = state.items[action.payload.itemIndex + 1];
      if (nextItem) {
        AutomergeStore.swapPriority(action.payload.itemId, nextItem.id);
        state.items = AutomergeStore.items;
      }
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

export const {addNote, updateNote, noteUp, noteDown} = notesSlice.actions;

export default notesSlice.reducer;
