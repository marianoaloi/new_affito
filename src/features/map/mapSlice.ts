import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
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

interface SharedFilterSubset {
  stateMaloi: string;
  accessibility: string;
  elevator: string;
  terra: boolean;
  updFrom: number;
  updTo: number;
}

export function selectFilteredListings(state: {
  map: MapState;
  sharedFilters: SharedFilterSubset;
}): MapListingDTO[] {
  const { allListings } = state.map;
  const f = state.sharedFilters;
  return allListings.filter((l) => {
    if (f.stateMaloi !== '') {
      if (f.stateMaloi === 'empty') {
        if (l.stateMaloi != null) return false;
      } else {
        const val = parseInt(f.stateMaloi, 10);
        if (l.stateMaloi !== val) return false;
      }
    }
    if (f.accessibility !== '') {
      if (f.accessibility === 'accessible' && l.accessibility !== 1) return false;
      if (f.accessibility === 'not_accessible' && l.accessibility !== 0) return false;
      if (f.accessibility === 'no_info' && l.accessibility != null) return false;
    }
    if (f.elevator !== '') {
      const elev = l.elevator ?? (l.featureElevator ? l.featureElevator.toLowerCase() !== 'no' : undefined);
      if (f.elevator === 'has' && !elev) return false;
      if (f.elevator === 'no' && elev !== false) return false;
      if (f.elevator === 'no_info' && elev != null) return false;
    }
    if (f.terra) {
      const abbr = l.floor?.abbreviation ?? '';
      if (!abbr.toLowerCase().includes('t')) return false;
    }
    if (f.updFrom > 0 && l.updatedAt < f.updFrom) return false;
    if (f.updTo > 0 && l.updatedAt > f.updTo) return false;
    return true;
  });
}

const DAY = 86400;

/**
 * Distinct days (unix seconds, day start, ascending) with at least one listing
 * updated on that day, across the listings currently in redux, plus tomorrow's
 * day-start pinned as the upper end. The slider is index-based over this array,
 * so sparse/old outliers don't stretch the track. Tomorrow (rather than the
 * newest updatedAt found) is always the max so "today" is never cut short —
 * an update posted later today still falls inside the max-selected range.
 */
export const selectUpdatedAtDays = createSelector(
  [selectAllListings],
  (listings): number[] => {
    const days = new Set<number>();
    for (const l of listings) {
      if (l.updatedAt) days.add(Math.floor(l.updatedAt / DAY) * DAY);
    }
    const todayStart = Math.floor(Date.now() / 1000 / DAY) * DAY;
    days.add(todayStart + DAY);
    return [...days].sort((a, b) => a - b);
  }
);

export default mapSlice.reducer;
