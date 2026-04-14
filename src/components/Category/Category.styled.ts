import styled, { css, keyframes } from 'styled-components';

const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.92);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Wrapper = styled.section`
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 600px) {
    gap: 1rem;
  }

  @media (max-width: 600px) {
    gap: 0.75rem;
  }
`;

export const CuisineButton = styled.button<{ $animated?: boolean }>`
  ${({ $animated }) =>
    $animated &&
    css`
      animation: ${fadeSlideIn} 0.3s ease forwards;
    `}
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: var(--color-text);

  &:hover .icon-circle {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const IconCircle = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: var(--color-card-bg);
  border: 2px solid var(--color-neutral-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  color: var(--color-text);

  @media (max-width: 600px) {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 1.8rem;
  }

  @media (max-width: 600px) {
    width: 3.75rem;
    height: 3.75rem;
    font-size: 1.5rem;
  }
`;

export const CuisineName = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  max-width: 6rem;
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    max-width: 4.5rem;
  }
`;

export const ShowAllButton = styled.button`
  margin-top: 1.5rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: var(--color-yellow-light);
  border: 1px solid var(--color-neutral-border);
  border-radius: 2rem;
  padding: 0.6rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--color-orange-light);
  }
`;
