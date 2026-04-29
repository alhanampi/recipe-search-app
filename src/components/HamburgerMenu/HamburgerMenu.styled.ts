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
    padding: 1rem 1.5rem 2rem;
    overflow-y: auto;
  }
`;

export const OverlayHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-neutral-border);
  margin-bottom: 0.25rem;
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

export const SearchSection = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-neutral-border);
`;

export const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-neutral-border);
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: 'Red Hat Display', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.15s ease;

  &:hover {
    color: var(--color-text-muted);
  }
`;

export const FavsNavLink = styled(NavLink)`
  &:hover {
    color: #ef4444;
  }
`;

export const ControlRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-neutral-border);
`;

export const ControlLabel = styled.span`
  font-family: 'Red Hat Display', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-primary);
`;
