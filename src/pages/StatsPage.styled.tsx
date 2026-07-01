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

export const PanelStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Panel = styled.section`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  padding: 24px 24px 16px;
`;

export const PanelTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 3px;
  color: #181b22;
`;

export const PanelSub = styled.div`
  font-size: 12px;
  color: #9097a2;
  margin-bottom: 20px;
`;

export const ChartRow = styled.div`
  display: flex;
  gap: 24px;
`;

export const ChartWrap = styled.div`
  flex: 1 1 0;
  min-width: 0;
`;

export const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
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
