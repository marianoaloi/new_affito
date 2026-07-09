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

const STORAGE_KEY = 'affito.sharedFilters';

function loadPersistedFilters(): SharedFilters {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialFilters;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return initialFilters;
    const out = { ...initialFilters };
    for (const key of Object.keys(initialFilters) as (keyof SharedFilters)[]) {
      const value = (parsed as Record<string, unknown>)[key];
      if (value !== undefined && typeof value === typeof initialFilters[key]) {
        (out as Record<string, unknown>)[key] = value;
      }
    }
    return out;
  } catch {
    return initialFilters;
  }
}

export function saveSharedFilters(filters: SharedFilters): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  } catch {
    // storage unavailable (private mode / quota) — filters simply won't persist
  }
}

const sharedFiltersSlice = createSlice({
  name: 'sharedFilters',
  initialState: loadPersistedFilters(),
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
