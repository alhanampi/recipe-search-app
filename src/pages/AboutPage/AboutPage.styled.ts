import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem;
  max-width: 860px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

export const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Intro = styled.p`
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid var(--color-neutral-border);
  padding-bottom: 2rem;

  @media (max-width: 600px) {
    margin-bottom: 1.5rem;
    padding-bottom: 1.25rem;
  }
`;

export const Section = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    margin-bottom: 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: var(--color-text-primary);
`;

export const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const Item = styled.li`
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  padding-left: 1rem;
  border-left: 3px solid var(--color-neutral-border);

  strong {
    color: var(--color-text-primary);
  }
`;

export const BodyText = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-neutral-border);
  margin: 2rem 0;

  @media (max-width: 600px) {
    margin: 1.25rem 0;
  }
`;
