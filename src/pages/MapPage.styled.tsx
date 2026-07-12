import styled from '@emotion/styled';

export const MapPageWrapper = styled.div`
  height: 100%;
  position: relative;
`;

export const MapContainer = styled.div`
  position: absolute;
  inset: 0;
  /* Trap Leaflet's internal z-indexes (controls use ~1000) so the mobile
     filter drawer (950) and backdrop (900) always paint above the map */
  z-index: 0;
`;

export const LegendOverlay = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 500;
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 12px;
  padding: 14px 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
`;

export const LegendTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  margin-bottom: 6px;
`;

export const LegendDot = styled.span<{ $color: string }>`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px ${(p) => p.$color};
`;

export const LegendDivider = styled.div`
  margin: 11px 0 9px;
  border-top: 1px solid #efefea;
`;

export const LegendCount = styled.div`
  font-family: 'IBM Plex Mono';
  font-size: 12px;
  color: #8a909c;
`;

export const CounterOverlay = styled.div`
  position: absolute;
  bottom: 18px;
  left: 18px;
  z-index: 500;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid #e7e7e2;
  border-radius: 10px;
  padding: 8px 14px;
  font-family: 'IBM Plex Mono';
  font-size: 13px;
  color: #5e6573;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 400;
  background: rgba(244, 244, 241, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorOverlay = styled.div`
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
  background: #fff;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--red);
  font-size: 13px;
`;
