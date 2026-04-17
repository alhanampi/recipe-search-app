import styled from 'styled-components';

export const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

export const SiteTitle = styled.h1`
  font-weight: 500;
  font-family: 'Carattere', cursive;
  font-size: 3rem;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 1.9rem;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const FavsLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-neutral-border);
  border-radius: 2rem;
  transition: background-color 0.15s ease;
  white-space: nowrap;

  &:hover {
    background-color: var(--color-card-bg);
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
