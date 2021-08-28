import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NoteItem} from '../types/notes';

interface TodoModalState {
  selectedEntity: NoteItem | null;
  isModalVisible: boolean;
}

export const initialState: TodoModalState = {
  selectedEntity: null,
  isModalVisible: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<NoteItem | undefined>) => {
      state.isModalVisible = true;
      state.selectedEntity = action.payload ?? null;
    },
    closeModal: state => {
      state.isModalVisible = false;
      state.selectedEntity = null;
    },
  },
});

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;
