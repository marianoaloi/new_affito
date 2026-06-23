import styled from '@emotion/styled';

export const MapPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
`;

export const MapStatus = styled.div`
  padding: 4px 16px;
  font-size: 0.85rem;
  color: #666;
`;

export const MapContent = styled.div`
  flex: 1;
  position: relative;
  min-height: 0;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.6);
`;
