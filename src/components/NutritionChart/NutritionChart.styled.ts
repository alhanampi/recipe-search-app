import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1.5rem;
`;

export const PerServing = styled.p`
  font-size: 0.78rem;
  color: var(--color-text-muted);
  margin: 0.1rem 0 1rem;
`;

export const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const BarRow = styled.div`
  display: grid;
  grid-template-columns: 12rem 1fr 3.5rem;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 600px) {
    grid-template-columns: 9rem 1fr 3rem;
    gap: 0.5rem;
  }
`;

export const NutrientLabel = styled.span`
  font-size: 0.82rem;
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BarTrack = styled.div`
  height: 10px;
  border-radius: 5px;
  background-color: var(--color-neutral-border);
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number; $color: string }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  max-width: 100%;
  background-color: ${({ $color }) => $color};
  border-radius: 5px;
  transition: width 0.4s ease;
`;

export const NutrientValue = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-align: right;
  white-space: nowrap;
`;
