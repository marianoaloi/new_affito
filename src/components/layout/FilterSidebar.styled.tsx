import styled from '@emotion/styled';

/** Single source of truth for the mobile breakpoint (px). */
export const MOBILE_BP = 768;

export const SidebarWrapper = styled.aside<{ $open: boolean }>`
  width: 300px;
  flex: none;
  background: #fff;
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${MOBILE_BP}px) {
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    width: min(300px, 85vw);
    z-index: 950;
    box-shadow: ${({ $open }) => ($open ? '0 12px 40px rgba(0,0,0,.25)' : 'none')};
    transform: translateX(${({ $open }) => ($open ? '0' : '-100%')});
    transition: transform 0.25s ease;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
`;

export const Backdrop = styled.div`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: block;
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 900;
  }
`;

export const SidebarCloseBtn = styled.button`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: #f1f2ee;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 17px;
    line-height: 1;
    color: #5e6573;
    cursor: pointer;
  }
`;

export const MobileResultsBtn = styled.button`
  display: none;

  @media (max-width: ${MOBILE_BP}px) {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: var(--primary, #28528c);
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SidebarTitle = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: var(--text);
`;

export const ResetButton = styled.button`
  background: none;
  border: none;
  color: #28528c;
  font-weight: 600;
  font-size: 13px;
  padding: 0;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
`;

export const SegmentedGroup = styled.div`
  display: flex;
  gap: 7px;
`;

export const SegmentBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 9px 0;
  border-radius: 9px;
  font-weight: 600;
  font-size: 13px;
  border: 1px solid ${({ $active }) => ($active ? '#28528c' : 'var(--border)')};
  background: ${({ $active }) => ($active ? '#28528c' : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : '#5E6573')};
`;

export const SidebarSelect = styled.select`
  width: 100%;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
`;

export const ResultsFooter = styled.div`
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--bg-alt);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: var(--muted);
`;

export const ResultsCount = styled.span`
  color: var(--text);
  font-weight: 500;
  font-size: 16px;
`;
