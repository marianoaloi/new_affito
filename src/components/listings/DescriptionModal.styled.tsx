import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalBox = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  width: min(90vw, 500px);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    margin: 0;
  }
`;

export const ModalCloseBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  line-height: 1;
`;

export const ModalLabel = styled.label`
  display: block;
  margin-bottom: 0.35rem;
  font-weight: 600;
`;

export const ModalTextarea = styled.textarea`
  width: 100%;
  resize: vertical;
  border-radius: 10px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
`;
