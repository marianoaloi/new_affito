import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const PageWrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const HeroSection = styled.section`
  text-align: center;
  padding: 2rem 0;
`;

export const StatsSection = styled.section`
  margin-top: 2rem;
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

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 4px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  margin: 1rem auto;
`;
