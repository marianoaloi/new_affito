import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { AccessibilityFilter, ElevatorFilter, StateMaloiFilter } from '../map/mapSlice';

export interface SharedFilters {
  province: string;
  deal: string;
  ptype: string;
  pmin: string;
  pmax: string;
  elevator: ElevatorFilter;
  accessibility: AccessibilityFilter;
  terra: boolean;
  stateMaloi: StateMaloiFilter;
}

const initialFilters: SharedFilters = {
  province: '',
  deal: '',
  ptype: '',
  pmin: '',
  pmax: '',
  elevator: '',
  accessibility: '',
  terra: false,
  stateMaloi: '',
};

const sharedFiltersSlice = createSlice({
  name: 'sharedFilters',
  initialState: initialFilters,
  reducers: {
    setSharedFilter<K extends keyof SharedFilters>(
      state: SharedFilters,
      action: PayloadAction<{ key: K; value: SharedFilters[K] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    resetSharedFilters() {
      return initialFilters;
    },
  },
});

export const { setSharedFilter, resetSharedFilters } = sharedFiltersSlice.actions;

export const selectSharedFilters = (state: RootState) => state.sharedFilters;

export default sharedFiltersSlice.reducer;
