import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem;

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }
`;

export const EmptyMessage = styled.p`
  font-size: 1rem;
  color: var(--color-text-muted);
  width: 80%;
  margin: 2rem auto;
  text-align: center;

  @media (max-width: 600px) {
    width: 100%;
  }
`;
