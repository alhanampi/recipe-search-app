import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem 2rem 0;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  max-width: 600px;
  margin: 0 auto;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--color-neutral-border);
  border-radius: 2rem;
  font-size: 1rem;
  background-color: var(--color-card-bg);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    border-color: var(--color-text-muted);
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 2rem;
  background-color: var(--color-neutral-light-text);
  color: var(--color-neutral-light);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.85;
  }
`;
