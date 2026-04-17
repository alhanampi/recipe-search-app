import styled from 'styled-components';

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
