import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AccessibilityFilter, ElevatorFilter } from '../map/mapSlice';

export interface ListingsFilters {
  province: string;
  type: string;
  stateMaloi: string;
  accessibility: AccessibilityFilter;
  elevator: ElevatorFilter;
  terra: boolean;
  page: number;
  limit: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

interface ListingsState {
  filters: ListingsFilters;
  selectedIds: number[];
}

const initialFilters: ListingsFilters = {
  province: '',
  type: '',
  stateMaloi: '',
  accessibility: '',
  elevator: '',
  terra: false,
  page: 1,
  limit: 20,
  sortField: '',
  sortOrder: 'asc',
};

const initialState: ListingsState = {
  filters: initialFilters,
  selectedIds: [],
};

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{ key: keyof ListingsFilters; value: string | number | boolean }>
    ) {
      const { key, value } = action.payload;
      (state.filters[key] as string | number | boolean) = value;
      if (key !== 'page') state.filters.page = 1;
    },
    resetFilters(state) {
      state.filters = { ...initialFilters };
      state.selectedIds = [];
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
    toggleSelectId(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((x) => x !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    selectAllIds(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
});

export const {
  setFilter,
  resetFilters,
  setPage,
  toggleSelectId,
  selectAllIds,
  clearSelection,
} = listingsSlice.actions;
export default listingsSlice.reducer;

export const selectFilters = (state: RootState): ListingsFilters => state.listings.filters;
export const selectSelectedIds = (state: RootState): number[] => state.listings.selectedIds;
export const selectPage = (state: RootState): number => state.listings.filters.page;
