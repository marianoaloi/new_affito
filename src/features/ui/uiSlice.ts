import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface UiState {
  toasts: Toast[];
  modal: string | null;
  listingsCount: number;
  sidebarOpen: boolean;
}

const initialState: UiState = {
  toasts: [],
  modal: null,
  listingsCount: 0,
  sidebarOpen: false,
};

let toastCounter = 0;

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<{ message: string; type: 'success' | 'error' }>) {
      const id = `${Date.now()}-${toastCounter++}`;
      state.toasts.push({ id, ...action.payload });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    openModal(state, action: PayloadAction<string>) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = null;
    },
    setListingsCount(state, action: PayloadAction<number>) {
      state.listingsCount = action.payload;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
  },
});

export const { addToast, removeToast, openModal, closeModal, setListingsCount, toggleSidebar, closeSidebar } =
  uiSlice.actions;
export default uiSlice.reducer;

export const selectToasts = (state: RootState): Toast[] => state.ui.toasts;
export const selectModal = (state: RootState): string | null => state.ui.modal;
export const selectListingsCount = (state: RootState): number => state.ui.listingsCount;
export const selectSidebarOpen = (state: RootState): boolean => state.ui.sidebarOpen;
