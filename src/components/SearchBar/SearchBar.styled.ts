import styled, { css } from 'styled-components';

export const Wrapper = styled.section<{ $hideOnMobile?: boolean; $compact?: boolean }>`
  padding: ${({ $compact }) => ($compact ? '0' : '2rem 2rem 0')};

  ${({ $hideOnMobile }) =>
    $hideOnMobile &&
    css`
      @media (max-width: 600px) {
        display: none;
      }
    `}
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 3rem 0.75rem 1.25rem;
  border: 1px solid var(--color-neutral-border);
  border-radius: 2rem;
  font-size: 1rem;
  background-color: var(--color-card-bg);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.15s ease;
  width: 100%;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-text-muted);
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 1rem;
  padding: 0.25rem;
  transition: color 0.15s ease;

  &:hover {
    color: var(--color-text-primary);
  }
`;
