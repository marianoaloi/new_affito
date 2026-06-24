import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const LandingWrapper = styled.div`
  min-height: 100vh;
  background: #f4f4f1;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  max-width: 1240px;
  margin: 0 auto;
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

export const LogoIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: #28528c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;
  font-size: 17px;
`;

export const LogoText = styled.span`
  font-weight: 800;
  font-size: 19px;
  letter-spacing: -0.01em;
`;

export const HeroWrap = styled.div`
  background: #131922;
  border-radius: 24px;
  max-width: 1240px;
  margin: 8px auto 0;
  padding: 72px 56px;
  color: #fff;
  position: relative;
  overflow: hidden;
`;

export const HeroEyebrow = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #7fa7d6;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
`;

export const HeroTitle = styled.h1`
  font-size: 52px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 20px;
  position: relative;
  z-index: 2;
`;

export const HeroSub = styled.p`
  font-size: 18px;
  line-height: 1.55;
  color: #aeb4c0;
  margin: 0 0 32px;
  max-width: 560px;
  position: relative;
  z-index: 2;
`;

export const HeroDecoration = styled.div`
  position: absolute;
  right: -80px;
  top: -60px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, #1e3556, transparent 70%);
  z-index: 1;
  pointer-events: none;
`;

export const SectionWrap = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 48px 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 22px;
  letter-spacing: -0.01em;
`;

export const SectionSub = styled.span`
  color: #9097a2;
  font-weight: 500;
  font-size: 16px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
`;

export const StatCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  padding: 26px;
`;

export const StatValue = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: -0.02em;
  color: #181b22;
`;

export const StatLabel = styled.div`
  font-weight: 600;
  font-size: 15px;
  margin-top: 8px;
`;

export const StatSub = styled.div`
  color: #8a909c;
  font-size: 13px;
  margin-top: 3px;
`;

export const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 22px;
`;

export const FeaturedCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const CardImg = styled.div`
  height: 170px;
  background: repeating-linear-gradient(
    135deg,
    #ecece6,
    #ecece6 11px,
    #f5f5f1 11px,
    #f5f5f1 22px
  );
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px;
`;

export const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.01em;
`;

export const CardSub = styled.div`
  color: #5e6573;
  font-size: 13px;
`;

export const CardPrice = styled.div`
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 23px;
`;

export const CardMeta = styled.div`
  display: flex;
  gap: 14px;
  color: #5e6573;
  font-size: 13px;
  font-family: 'IBM Plex Mono', monospace;
`;

export const DealBadge = styled.span<{ $sale?: boolean }>`
  background: ${(p) => (p.$sale ? '#f4ece2' : '#eaf0f8')};
  color: ${(p) => (p.$sale ? '#a9683a' : '#28528c')};
  border-radius: 7px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 700;
`;

export const AccediBtn = styled.button`
  background: #181b22;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 11px 22px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
`;

export const CtaBtn = styled.button`
  background: #28528c;
  color: #fff;
  border: none;
  border-radius: 11px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  z-index: 2;
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

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

export const SkeletonCard = styled.div`
  background: #fff;
  border: 1px solid #e7e7e2;
  border-radius: 16px;
  padding: 26px;
  height: 118px;
  background-image: linear-gradient(90deg, #fff 0px, #f0f0ec 200px, #fff 400px);
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s linear infinite;
`;
