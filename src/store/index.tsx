import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import modalReducer from './modalSlice';
import NotesReducer from './notesSlice';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    notes: NotesReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
