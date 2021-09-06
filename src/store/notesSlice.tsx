import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteFormItem, NoteItem} from '../types/notes';
import AutomergeStore from '../automerge';
import {getFromStorage} from '../helpers/asyncStore';
import {UUID} from 'automerge';
import SocketConnection from '../websokets';

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
    onInit: (state, action: PayloadAction<string>) => {
      AutomergeStore.merge(action.payload);
      state.items = AutomergeStore.items;
    },
    onChanges: (state, action: PayloadAction<string>) => {
      AutomergeStore.applyChanges(action.payload);
      state.items = AutomergeStore.items;
    },
    addNote: (state, action: PayloadAction<NoteFormItem>) => {
      const changes = AutomergeStore.addItem(action.payload);
      SocketConnection.sendChanges(changes);
      state.items = AutomergeStore.items;
    },
    updateNote: (state, action: PayloadAction<NoteItem>) => {
      const changes = AutomergeStore.updateItem(action.payload);
      SocketConnection.sendChanges(changes);
      state.items = AutomergeStore.items;
    },
    noteUp: (
      state,
      action: PayloadAction<{itemId: UUID; itemIndex: number}>,
    ) => {
      const prevItem = state.items[action.payload.itemIndex - 1];
      if (prevItem) {
        const changes = AutomergeStore.swapPriority(
          prevItem.id,
          action.payload.itemId,
        );
        SocketConnection.sendChanges(changes);
        state.items = AutomergeStore.items;
      }
    },
    noteDown: (
      state,
      action: PayloadAction<{itemId: UUID; itemIndex: number}>,
    ) => {
      const nextItem = state.items[action.payload.itemIndex + 1];
      if (nextItem) {
        const changes = AutomergeStore.swapPriority(
          action.payload.itemId,
          nextItem.id,
        );
        SocketConnection.sendChanges(changes);
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
        // TODO think how to move socket open from reducer
        if (!SocketConnection.isOpen()) {
          SocketConnection.open(AutomergeStore.getAllChanges());
        }
        state.items = AutomergeStore.items;
      });
  },
});

export const {addNote, updateNote, noteUp, noteDown, onChanges, onInit} =
  notesSlice.actions;

export default notesSlice.reducer;
