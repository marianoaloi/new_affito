import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api';
import { statsApi } from '../features/stats/statsApi';
import authReducer from '../features/auth/authSlice';
import listingsReducer from '../features/listings/listingsSlice';
import decisionsReducer from '../features/decisions/decisionsSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    decisions: decisionsReducer,
    ui: uiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, statsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
