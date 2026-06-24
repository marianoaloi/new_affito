import styled from '@emotion/styled';

export const SidebarWrapper = styled.aside`
  width: 300px;
  flex: none;
  background: #fff;
  border-right: 1px solid var(--border);
  overflow-y: auto;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 22px;
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
