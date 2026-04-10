import styled from 'styled-components';

export const PillsWrapper = styled.div<{ $overlay?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem 0.75rem;
  background: ${({ $overlay }) =>
    $overlay ? 'linear-gradient(transparent, rgba(0, 0, 0, 0.35))' : 'none'};
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-left: 12px;
`;
