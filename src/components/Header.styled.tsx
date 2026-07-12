import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { MOBILE_BP } from './layout/FilterSidebar.styled';

export const HeaderWrapper = styled.header`
  height: 64px;
  flex: none;
  background: #fff;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;

  @media (max-width: ${MOBILE_BP}px) {
    padding: 0 12px;
    gap: 8px;
  }
`;

export const HeaderLogo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 16px;
  color: var(--text);
`;

export const LogoIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #28528c;
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.span`
  @media (max-width: 560px) {
    display: none;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  gap: 26px;
  align-items: center;

  @media (max-width: ${MOBILE_BP}px) {
    gap: 14px;
  }
`;

export const FilterToggleBtn = styled.button`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 44px;
    height: 44px;
    border: none;
    background: none;
    color: var(--text);
    cursor: pointer;
    flex: none;
  }
`;

export const FilterBadge = styled.span`
  position: absolute;
  top: 5px;
  right: 3px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #28528c;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
`;

export const NavBtn = styled(Link)<{ $active: boolean }>`
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  color: ${({ $active }) => ($active ? 'var(--text)' : 'var(--muted)')};
  border-bottom: 2px solid
    ${({ $active }) => ($active ? 'var(--primary)' : 'transparent')};
  padding: 21px 0;
  font-size: 14px;
`;

export const UserArea = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.3;

  @media (max-width: ${MOBILE_BP}px) {
    display: none;
  }
`;

export const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
`;

export const UserEmail = styled.span`
  font-size: 11px;
  color: var(--muted);
`;

export const AvatarCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #28528c;
  color: #fff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const AvatarImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const SignOutBtn = styled.button`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 9px;
  padding: 8px 14px;
  font-weight: 600;
  font-size: 13px;
  color: var(--text);
`;

export const SignInBtn = styled.button`
  background: #181b22;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 9px 18px;
  font-weight: 600;
  font-size: 14px;
`;
