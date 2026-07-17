import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed; inset: 0; background: rgba(0,0,0,.48);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000; padding: 16px;
`;

export const Sheet = styled.div`
  background: #fff; border-radius: 20px;
  width: min(96vw, 720px); max-height: 92vh;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,.2);
`;

export const SheetHeader = styled.div`
  display: flex; align-items: flex-start; gap: 10px;
  padding: 20px 24px 14px; flex-shrink: 0;
  border-bottom: 1px solid #F1F2EE;
`;

export const SheetTitle = styled.h2`
  margin: 0; font-size: 17px; font-weight: 700;
  letter-spacing: -.015em; color: #181B22; flex: 1;
`;

export const SheetCaption = styled.p`
  margin: 3px 0 0; font-size: 13px; color: #5E6573; font-weight: 400; line-height: 1.4;
`;

export const CloseBtn = styled.button`
  border: none; background: #F1F2EE; border-radius: 50%;
  width: 32px; height: 32px; font-size: 18px; line-height: 1;
  color: #5E6573; cursor: pointer; flex-shrink: 0;
`;

export const Body = styled.div`
  overflow-y: auto; flex: 1; padding: 0 24px 28px;
`;

export const Gallery = styled.div`
  position: relative; margin: 18px 0 10px; border-radius: 14px; overflow: hidden; background: #ECECE6;
`;

export const GalleryImg = styled.img`
  width: 100%; height: 300px; object-fit: cover; display: block;
`;

export const GalleryPlaceholder = styled.div`
  height: 180px; display: flex; align-items: center; justify-content: center;
  color: #9097A2; font-size: 14px; font-style: italic;
`;

export const GalleryNav = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute; top: 50%; transform: translateY(-50%);
  ${({ $side }) => $side}: 10px;
  background: rgba(255,255,255,.88); border: none; border-radius: 50%;
  width: 36px; height: 36px; font-size: 20px; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.15);
  display: flex; align-items: center; justify-content: center;
`;

export const GalleryCaption = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,.5));
  color: #fff; font-size: 12px; padding: 22px 14px 10px;
  display: flex; justify-content: space-between; align-items: flex-end;
`;

export const GalleryDots = styled.div`
  display: flex; gap: 5px; justify-content: center; margin-bottom: 14px;
`;

export const Dot = styled.span<{ $active: boolean }>`
  width: 7px; height: 7px; border-radius: 50%; cursor: pointer;
  background: ${({ $active }) => ($active ? '#28528C' : '#D9D9D2')};
`;

export const PriceRow = styled.div`
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px;
`;

export const DealBadge = styled.span<{ $sale: boolean }>`
  font-size: 11px; font-weight: 700; border-radius: 6px; padding: 4px 9px;
  background: ${({ $sale }) => ($sale ? '#F4ECE2' : '#EAF0F8')};
  color: ${({ $sale }) => ($sale ? '#A9683A' : '#28528C')};
`;

export const StateBadge = styled.span<{ $state?: number | null }>`
  font-size: 11px; font-weight: 700; border-radius: 6px; padding: 4px 9px;
  background: ${({ $state }) => $state === 1 ? '#DCFCE7' : $state === 0 ? '#FEE2E2' : $state === 2 ? '#FEF9C3' : '#F1F2EE'};
  color: ${({ $state }) => $state === 1 ? '#16a34a' : $state === 0 ? '#dc2626' : $state === 2 ? '#ca8a04' : '#9097A2'};
`;

export const ImmoLink = styled.a`
  margin-left: auto; font-size: 12px; font-weight: 600; color: #28528C;
  text-decoration: none; &:hover { text-decoration: underline; }
`;

export const Price = styled.div`
  font-family: 'IBM Plex Mono', monospace; font-size: 26px; font-weight: 600;
  color: #181B22; letter-spacing: -.01em;
`;

export const PricePerM2 = styled.span`
  font-size: 13px; color: #9097A2; font-weight: 400; margin-left: 10px;
`;

export const SectionTitle = styled.div`
  font-size: 11px; font-weight: 700; color: #9097A2; text-transform: uppercase;
  letter-spacing: .06em; margin: 20px 0 10px;
`;

export const Divider = styled.div`
  height: 1px; background: #F1F2EE; margin: 18px 0 0;
`;

export const Grid2 = styled.div`
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
`;

export const Cell = styled.div`
  padding: 8px 0; border-bottom: 1px solid #F1F2EE;
  &:nth-of-type(odd) { padding-right: 18px; }
`;

export const CLabel = styled.div`
  font-size: 11px; font-weight: 700; color: #9097A2; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 2px;
`;

export const CValue = styled.div`
  font-size: 14px; color: #181B22; font-weight: 500;
`;

export const ChipGrid = styled.div`
  display: flex; flex-wrap: wrap; gap: 7px;
`;

export const FeatureChip = styled.span`
  background: #F1F2EE; color: #181B22; border-radius: 7px;
  padding: 5px 10px; font-size: 12px; font-weight: 600;
`;

export const DescText = styled.p`
  margin: 0; font-size: 14px; color: #3B4151; line-height: 1.65; white-space: pre-line;
`;

export const ActionRow = styled.div`
  display: flex; gap: 8px; flex-wrap: wrap;
`;

export const ActionBtn = styled.button<{ $color: string; $active: boolean }>`
  flex: 1; min-width: 110px; padding: 11px 14px; border-radius: 10px; border: 2px solid;
  font-size: 13px; font-weight: 700; cursor: pointer; transition: all .12s;
  border-color: ${({ $color }) => $color};
  background: ${({ $active, $color }) => ($active ? $color : '#fff')};
  color: ${({ $active, $color }) => ($active ? '#fff' : $color)};
  &:disabled { opacity: .5; cursor: not-allowed; }
`;

export const NoteArea = styled.textarea`
  width: 100%; resize: vertical; border-radius: 10px; font-size: 14px;
  border: 1px solid #E7E7E2; padding: 10px 12px; line-height: 1.55;
  color: #181B22; font-family: inherit; min-height: 80px;
  &:focus { outline: none; border-color: #28528C; }
`;

export const SaveRow = styled.div`
  display: flex; justify-content: flex-end; margin-top: 8px;
`;

export const LoadingBox = styled.div`
  padding: 60px 0; text-align: center; color: #9097A2; font-size: 14px;
`;

export const ErrorBox = styled.div`
  padding: 16px; background: #FEF2F2; border: 1px solid #FECACA;
  border-radius: 10px; color: #dc2626; font-size: 14px; margin: 16px 0;
`;
