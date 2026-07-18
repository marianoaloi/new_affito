import styled from '@emotion/styled';

const PREVIEW_W = 320;
const PREVIEW_H = 240;

export const PreviewContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: ${PREVIEW_W}px;
  height: ${PREVIEW_H}px;
  z-index: 9999;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
  border: 2px solid #fff;
  pointer-events: none;
  background: #1a1a1a;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
