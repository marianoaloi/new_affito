import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const hatch = `repeating-linear-gradient(
  45deg,
  #E9E9E3,
  #E9E9E3 8px,
  #F2F2EC 8px,
  #F2F2EC 16px
)`;

export const PageContent = styled.main`
  height: 100%;
  overflow-y: auto;
  padding: 26px 30px;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #181b22;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #7a808c;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
`;

export const SortControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  select {
    background: #fff;
    border: 1px solid #e7e7e2;
    border-radius: 9px;
    padding: 7px 10px;
    font-size: 13px;
    color: #181b22;
    cursor: pointer;
  }
`;

export const StyleSwitcher = styled.div`
  background: #eeeeea;
  border-radius: 11px;
  padding: 4px;
  display: flex;
  gap: 4px;
`;

export const StyleBtn = styled.button<{ $active: boolean }>`
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 8px;
  transition: background 0.12s, color 0.12s, box-shadow 0.12s;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#181B22' : '#7A808C')};
  box-shadow: ${({ $active }) => ($active ? '0 1px 3px rgba(0,0,0,.1)' : 'none')};
`;

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: var(--red);
`;

/* CLASSIC */
export const ClassicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 22px;
`;

export const ClassicCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardImg = styled.div<{ $url?: string }>`
  height: 168px;
  background-image: ${({ $url }) => ($url ? `url(${$url})` : hatch)};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px;
`;

export const CardImgText = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #9aa0ab;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  padding: 3px 7px;
`;

export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 17px;
  color: #181b22;
  line-height: 1.25;
`;

export const CardSub = styled.div`
  color: #5e6573;
  font-size: 13px;
`;

export const CardPrice = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 23px;
  font-weight: 600;
  color: #181b22;
`;

export const CardSpecs = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #5e6573;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 2px;
`;

export const Chip = styled.span`
  background: #f1f2ee;
  color: #5e6573;
  border-radius: 6px;
  padding: 4px 9px;
  font-size: 11px;
  font-weight: 600;
`;

export const DealBadge = styled.span<{ $sale: boolean }>`
  font-size: 11px;
  font-weight: 700;
  border-radius: 6px;
  padding: 4px 9px;
  background: ${({ $sale }) => ($sale ? '#F4ECE2' : '#EAF0F8')};
  color: ${({ $sale }) => ($sale ? '#A9683A' : '#28528C')};
`;

export const Mono = styled.span`
  font-family: 'IBM Plex Mono', monospace;
`;

/* HORIZONTAL */
export const HorizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
  gap: 18px;
`;

export const HorizCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
`;

export const HorizImg = styled.div<{ $url?: string }>`
  width: 170px;
  flex: none;
  background-image: ${({ $url }) => ($url ? `url(${$url})` : hatch)};
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 12px;
`;

export const HorizBody = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const HorizPrice = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 21px;
  font-weight: 600;
  color: #181b22;
`;

/* COMPACT */
export const CompactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CompactRow = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
`;

export const AccentBar = styled.div<{ $sale: boolean }>`
  width: 4px;
  align-self: stretch;
  border-radius: 3px;
  background: ${({ $sale }) => ($sale ? 'var(--sale, #A9683A)' : 'var(--primary, #28528C)')};
`;

export const CompactBadge = styled.div`
  width: 78px;
  flex: none;
`;

export const CompactMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const CompactTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #181b22;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CompactSub = styled.div`
  font-size: 12px;
  color: #5e6573;
`;

export const CompactSpecs = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  color: #5e6573;
  flex: none;
`;

export const CompactPrice = styled.div`
  text-align: right;
  min-width: 130px;
  flex: none;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 18px;
  font-weight: 600;
  color: #181b22;
`;

/* shared card pieces */
export const CardActions = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

export const SelectCheck = styled.input`
  cursor: pointer;
`;

/* EMPTY */
export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #5e6573;

  h2 {
    margin: 0 0 8px;
    font-size: 18px;
    font-weight: 700;
    color: #181b22;
  }

  p {
    margin: 0;
    font-size: 14px;
  }
`;

/* PAGINATION */
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 26px;
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 12px;
  padding: 12px 18px;
`;

const shimmer = keyframes`
  to { background-position: -200% 0; }
`;

export const SkeletonCard = styled.div`
  height: 320px;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.2s infinite;
`;
