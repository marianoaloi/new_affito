import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import { statsApi } from '../features/stats/statsApi';
import authReducer from '../features/auth/authSlice';
import listingsReducer from '../features/listings/listingsSlice';
import decisionsReducer from '../features/decisions/decisionsSlice';
import uiReducer from '../features/ui/uiSlice';
import mapReducer from '../features/map/mapSlice';
import sharedFiltersReducer, { saveSharedFilters } from '../features/shared/filtersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    decisions: decisionsReducer,
    ui: uiReducer,
    map: mapReducer,
    sharedFilters: sharedFiltersReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, statsApi.middleware),
});

let prevSharedFilters = store.getState().sharedFilters;
store.subscribe(() => {
  const next = store.getState().sharedFilters;
  if (next !== prevSharedFilters) {
    prevSharedFilters = next;
    saveSharedFilters(next);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
