import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const PageWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: var(--red);
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;

  th,
  td {
    padding: 0.6rem 0.75rem;
    border-bottom: 1px solid var(--border);
    text-align: left;
    white-space: nowrap;
  }
`;

export const EmptyCell = styled.td`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const shimmer = keyframes`
  to { background-position: -200% 0; }
`;

export const SkeletonCell = styled.div`
  height: 1rem;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: ${shimmer} 1.2s infinite;
`;
