import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';
import {
  HeaderWrapper,
  HeaderLogo,
  LogoIcon,
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
} from './Header.styled';

function initials(name: string | null, email: string | null): string {
  const source = name || email || '?';
  return source.trim().charAt(0).toUpperCase();
}

export default function Header() {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [imgError, setImgError] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/tabella', label: 'Tabella' },
    { to: '/mappa', label: 'Mappa' },
    { to: '/statistiche', label: 'Statistiche' },
  ];

  return (
    <HeaderWrapper>
      <HeaderLogo to="/">
        <LogoIcon>A</LogoIcon>
        Affitto Udine
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
