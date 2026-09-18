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
  /** updatedAt range (unix seconds); 0 = handle at the slider's end, filter inactive */
  updFrom: number;
  updTo: number;
  /** When true, listings marked "buono++" (followed) are always shown regardless of the other filters. */
  buonoPlus: boolean;
  /** Last map viewport, persisted so panning/zooming survives re-renders and reloads. */
  mapLat: number;
  mapLng: number;
  /** 0 = never panned yet; the province default center is used instead. */
  mapZoom: number;
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
  updFrom: 0,
  updTo: 0,
  buonoPlus: false,
  mapLat: 0,
  mapLng: 0,
  mapZoom: 0,
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
    setMapView(state, action: PayloadAction<{ lat: number; lng: number; zoom: number }>) {
      state.mapLat = action.payload.lat;
      state.mapLng = action.payload.lng;
      state.mapZoom = action.payload.zoom;
    },
    resetSharedFilters() {
      return initialFilters;
    },
  },
});

export const { setSharedFilter, setMapView, resetSharedFilters } = sharedFiltersSlice.actions;

export const selectSharedFilters = (state: RootState) => state.sharedFilters;

export default sharedFiltersSlice.reducer;
