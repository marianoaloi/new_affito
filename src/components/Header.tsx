import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

function initials(name: string | null, email: string | null): string {
  const source = name || email || '?';
  return source.trim().charAt(0).toUpperCase();
}

export default function Header() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <header className="header">
      <Link to="/" className="header-title">
        Affitti Udine
      </Link>
      {isAuthenticated && (
        <nav className="header-nav">
          <Link to="/tabella" className="nav-link">Tabella</Link>
          <Link to="/mappa" className="nav-link">Mappa</Link>
        </nav>
      )}
      <div className="header-auth">
        {isAuthenticated && user ? (
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="avatar-button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Account"
            >
              {user.photoURL && !imgError ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? 'avatar'}
                  className="avatar-img"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="avatar-initials">
                  {initials(user.displayName, user.email)}
                </span>
              )}
            </button>
            {open && (
              <div className="dropdown-menu">
                <div className="dropdown-name">{user.displayName ?? '—'}</div>
                <div className="dropdown-email">{user.email ?? '—'}</div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setOpen(false);
                    void signOut();
                  }}
                >
                  Esci
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => void signIn()}>
            Accedi
          </button>
        )}
      </div>
    </header>
  );
}
