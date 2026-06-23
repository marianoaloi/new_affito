import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MapListingDTO } from '../../types';

export type AccessibilityFilter = '' | 'accessible' | 'not_accessible' | 'no_info';
export type ElevatorFilter = '' | 'has' | 'no' | 'no_info';
export type StateMaloiFilter = '' | '0' | '1' | '2' | 'empty';

export interface MapFilters {
  province: string;
  type: string;
  accessibility: AccessibilityFilter;
  elevator: ElevatorFilter;
  stateMaloi: StateMaloiFilter;
  terra: boolean;
}

interface MapState {
  allListings: MapListingDTO[];
  filters: MapFilters;
  loading: boolean;
  error: string | null;
}

const initialFilters: MapFilters = {
  province: 'Udine',
  type: 'a',
  accessibility: '',
  elevator: '',
  stateMaloi: '',
  terra: false,
};

const initialState: MapState = {
  allListings: [],
  filters: initialFilters,
  loading: false,
  error: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setAllListings(state, action: PayloadAction<MapListingDTO[]>) {
      state.allListings = action.payload;
      state.loading = false;
      state.error = null;
    },
    setMapFilter<K extends keyof MapFilters>(
      state: MapState,
      action: PayloadAction<{ key: K; value: MapFilters[K] }>
    ) {
      state.filters[action.payload.key] = action.payload.value;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    updateListingStateMaloi(
      state,
      action: PayloadAction<{ id: number; stateMaloi: 0 | 1 | 2 }>
    ) {
      const listing = state.allListings.find((l) => l.id === action.payload.id);
      if (listing) listing.stateMaloi = action.payload.stateMaloi;
    },
  },
});

export const { setAllListings, setMapFilter, setLoading, setError, updateListingStateMaloi } = mapSlice.actions;

export const selectAllListings = (state: { map: MapState }) => state.map.allListings;
export const selectMapFilters = (state: { map: MapState }) => state.map.filters;
export const selectMapLoading = (state: { map: MapState }) => state.map.loading;
export const selectMapError = (state: { map: MapState }) => state.map.error;

export function selectFilteredListings(state: { map: MapState }): MapListingDTO[] {
  const { allListings, filters } = state.map;
  return allListings.filter((l) => {
    if (filters.stateMaloi !== '') {
      if (filters.stateMaloi === 'empty') {
        if (l.stateMaloi != null) return false;
      } else {
        const val = parseInt(filters.stateMaloi, 10);
        if (l.stateMaloi !== val) return false;
      }
    }
    if (filters.accessibility !== '') {
      if (filters.accessibility === 'accessible' && l.accessibility !== 1) return false;
      if (filters.accessibility === 'not_accessible' && l.accessibility !== 0) return false;
      if (filters.accessibility === 'no_info' && l.accessibility != null) return false;
    }
    if (filters.elevator !== '') {
      const elev = l.elevator ?? (l.featureElevator ? l.featureElevator.toLowerCase() !== 'no' : undefined);
      if (filters.elevator === 'has' && !elev) return false;
      if (filters.elevator === 'no' && elev !== false) return false;
      if (filters.elevator === 'no_info' && elev != null) return false;
    }
    if (filters.terra) {
      const abbr = l.floor?.abbreviation ?? '';
      if (!abbr.toLowerCase().includes('t')) return false;
    }
    return true;
  });
}

export default mapSlice.reducer;
