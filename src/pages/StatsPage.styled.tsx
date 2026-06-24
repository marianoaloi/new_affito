import styled from '@emotion/styled';

export const PageContent = styled.main`
  height: 100%;
  overflow-y: auto;
  padding: 26px 30px;
`;

export const PageHeader = styled.header`
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 2px;
  color: #181b22;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  font-size: 13px;
  color: #7a808c;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 20px;
`;

export const Panel = styled.section`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  padding: 24px;
`;

export const PanelTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 3px;
  color: #181b22;
`;

export const PanelSub = styled.div`
  font-size: 12px;
  color: #9097a2;
  margin-bottom: 20px;
`;

export const BarRow = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 6px;
  color: #181b22;
`;

export const BarLabelName = styled.span`
  font-weight: 600;
`;

export const BarLabelValue = styled.span`
  font-family: 'IBM Plex Mono', monospace;
  color: #5e6573;
`;

export const BarTrack = styled.div`
  height: 10px;
  background: #f1f2ee;
  border-radius: 6px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  border-radius: 6px;
  background: ${(p) => p.$color};
  width: ${(p) => p.$pct}%;
  transition: width 0.3s ease;
`;

export const ChartWrap = styled.div`
  width: 100%;
`;

export const TrendLegend = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 14px;
  flex-wrap: wrap;
`;

export const TrendLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 13px;
  color: #181b22;
`;

export const TrendDot = styled.span<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 3px;
  background: ${(p) => p.$color};
  display: inline-block;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: #9097a2;
  font-size: 14px;
`;

export const ErrorState = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: var(--red);
  margin-bottom: 1rem;
`;

export const RetryButton = styled.button`
  border: 1px solid #fecaca;
  background: #fff;
  color: var(--red, #dc2626);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;
