import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectAuthStatus } from '../features/auth/authSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const status = useAppSelector(selectAuthStatus);

  if (status === 'unauthenticated') {
    return <Navigate to="/" state={{ showLogin: true }} replace />;
  }

  if (status === 'idle' || status === 'loading') {
    return (
      <div className="page-center">
        <div className="spinner" />
      </div>
    );
  }

  return <>{children}</>;
}
