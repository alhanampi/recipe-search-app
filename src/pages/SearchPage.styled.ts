import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 80%;
  margin: 0 auto 1.5rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--color-neutral-border);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-primary);
  flex-shrink: 0;
  margin-right: 3rem;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--color-card-bg);
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
`;

export const ResultCount = styled.p`
  font-size: 0.9rem;
  color: var(--color-text-muted);
  width: 80%;
  margin: 0 auto 1rem;
`;

export const ShowMoreButton = styled.button`
  display: block;
  margin: 1.5rem auto 0;
  width: 80%;
  padding: 0.75rem;
  background: none;
  border: 1px solid var(--color-neutral-border);
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--color-card-bg);
  }
`;
