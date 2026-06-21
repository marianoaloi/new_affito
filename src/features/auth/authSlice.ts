import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: AuthUser | null;
  status: AuthStatus;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.status = action.payload ? 'authenticated' : 'unauthenticated';
    },
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState): AuthUser | null => state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.status === 'authenticated';
export const selectAuthStatus = (state: RootState): AuthStatus => state.auth.status;
