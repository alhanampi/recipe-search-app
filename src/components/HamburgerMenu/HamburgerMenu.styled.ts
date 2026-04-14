import styled from 'styled-components';

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  padding: 0.25rem;
  line-height: 1;

  @media (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Overlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 600px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 1300;
    background: var(--color-header-bg);
    flex-direction: column;
    align-items: stretch;
    padding: 1rem 1.5rem 2rem;
    gap: 1.5rem;
    overflow-y: auto;
  }
`;

export const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-primary);
  font-size: 1.5rem;
  padding: 0.25rem;
  line-height: 1;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  
`;

export const SectionLabel = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary, var(--color-text-muted));
  font-weight: 600;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ModeLabel = styled.span`
  color: var(--color-text-primary);
  font-size: 0.9rem;
`;

export const AboutLink = styled.a`
  font-family: 'Carattere', cursive;
  font-size: 1.6rem;
  color: var(--color-text-secondary, var(--color-text-muted));
  text-decoration: none;

  &:hover {
    color: var(--color-text-primary);
  }
`;
