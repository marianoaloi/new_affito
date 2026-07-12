import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleSidebar, selectSidebarOpen } from '../features/ui/uiSlice';
import { selectSharedFilters } from '../features/shared/filtersSlice';
import {
  HeaderWrapper,
  HeaderLogo,
  LogoIcon,
  LogoText,
  HeaderNav,
  NavBtn,
  UserArea,
  UserInfo,
  UserName,
  UserEmail,
  AvatarCircle,
  AvatarImg,
  SignOutBtn,
  SignInBtn,
  FilterToggleBtn,
  FilterBadge,
} from './Header.styled';

function FunnelIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function initials(name: string | null, email: string | null): string {
  const source = name || email || '?';
  return source.trim().charAt(0).toUpperCase();
}

const DEFAULTS: Record<string, string | boolean> = {
  province: '', deal: '', ptype: '', pmin: '', pmax: '',
  elevator: '', accessibility: '', terra: false, stateMaloi: '',
};

export default function Header() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  const filters = useAppSelector(selectSharedFilters);

  const showFilterToggle =
    isAuthenticated && (location.pathname === '/tabella' || location.pathname === '/mappa');
  const activeFilters = Object.entries(DEFAULTS).filter(
    ([key, def]) => (filters as unknown as Record<string, string | boolean>)[key] !== def
  ).length;

  const navItems = [
    { to: '/tabella', label: 'Tabella' },
    { to: '/mappa', label: 'Mappa' },
    { to: '/statistiche', label: 'Statistiche' },
  ];

  return (
    <HeaderWrapper>
      {showFilterToggle && (
        <FilterToggleBtn
          type="button"
          onClick={() => dispatch(toggleSidebar())}
          aria-label={activeFilters > 0 ? `Filtri (${activeFilters} attivi)` : 'Filtri'}
          aria-expanded={sidebarOpen}
          aria-controls="filter-drawer"
        >
          <FunnelIcon />
          {activeFilters > 0 && <FilterBadge>{activeFilters}</FilterBadge>}
        </FilterToggleBtn>
      )}
      <HeaderLogo to="/">
        <LogoIcon>A</LogoIcon>
        <LogoText>Affitto Udine</LogoText>
      </HeaderLogo>

      {isAuthenticated && (
        <HeaderNav>
          {navItems.map((item) => (
            <NavBtn key={item.to} to={item.to} $active={location.pathname === item.to}>
              {item.label}
            </NavBtn>
          ))}
        </HeaderNav>
      )}

      {isAuthenticated && user ? (
        <UserArea>
          <UserInfo>
            <UserName>{user.displayName ?? '—'}</UserName>
            <UserEmail>{user.email ?? '—'}</UserEmail>
          </UserInfo>
          <AvatarCircle>
            {user.photoURL && !imgError ? (
              <AvatarImg
                src={user.photoURL}
                alt={user.displayName ?? 'avatar'}
                onError={() => setImgError(true)}
              />
            ) : (
              initials(user.displayName, user.email)
            )}
          </AvatarCircle>
          <SignOutBtn type="button" onClick={() => void signOut()}>
            Esci
          </SignOutBtn>
        </UserArea>
      ) : (
        <SignInBtn type="button" onClick={() => void signIn()}>
          Accedi
        </SignInBtn>
      )}
    </HeaderWrapper>
  );
}
