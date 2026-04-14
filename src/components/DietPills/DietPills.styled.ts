import styled from 'styled-components';

export const PillsWrapper = styled.div<{ $compact?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ $compact }) => ($compact ? '0.2rem' : '0.4rem')};
  padding: ${({ $compact }) => ($compact ? '0 0.4rem 0.4rem' : '0 0.75rem 0.75rem')};
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-left: 4px;
`;
