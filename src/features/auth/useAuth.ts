import { useEffect, useCallback } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setUser,
  setStatus,
  selectUser,
  selectIsAuthenticated,
  selectAuthStatus,
} from './authSlice';

export function useAuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setStatus('loading'));
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        dispatch(
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName,
            photoURL: fbUser.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);
}

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const status = useAppSelector(selectAuthStatus);

  const signIn = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOut = useCallback(async () => {
    await fbSignOut(auth);
    dispatch(setUser(null));
  }, [dispatch]);

  return { user, isAuthenticated, status, signIn, signOut };
}
