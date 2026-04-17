import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

export const FavBtn = styled.button<{ $active: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(0, 0, 0, 0.45);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#ef4444' : '#fff')};
  font-size: 1rem;
  transition: transform 0.15s ease, color 0.15s ease;
  z-index: 2;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.15);
  }
`;

export const InlineFavBtn = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#ef4444' : 'var(--color-text-muted)')};
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  flex-shrink: 0;
  transition: color 0.15s ease, transform 0.15s ease;

  &:hover {
    transform: scale(1.15);
    color: #ef4444;
  }
`;

export const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    border-radius: 16px;
    background-color: var(--color-card-bg);
    color: var(--color-text-primary);
    padding: 1.75rem 1.5rem 1.5rem;
    max-width: 360px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
    border: 1px solid var(--color-neutral-border);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

export const IconCircle = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalDivider = styled.div`
  border-top: 1px solid var(--color-neutral-border);
  margin: 0 -1.5rem 1.25rem;
`;

export const ActionsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ConfirmButton = styled(Button)`
  && {
    background-color: #ef4444;
    color: #fff;
    border-radius: 2rem;
    padding: 0.6rem;
    font-weight: 700;
    text-transform: none;
    font-size: 0.9rem;
    box-shadow: none;

    &:hover {
      background-color: #dc2626;
      box-shadow: none;
    }
  }
` as typeof Button;

export const CancelButton = styled(Button)`
  && {
    color: var(--color-text-muted);
    border-radius: 2rem;
    padding: 0.6rem;
    font-weight: 600;
    text-transform: none;
    font-size: 0.9rem;

    &:hover {
      background-color: var(--color-neutral-border);
    }
  }
` as typeof Button;
