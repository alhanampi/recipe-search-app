import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem;

  .splide__track {
    overflow: visible;
  }

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 600px) {
    width: 100%;
    gap: 1rem;
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    min-height: 100px;
  }
`;

export const CardTitleRow = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: flex;
    order: 1;
    width: 100%;
    padding: 0.6rem 0.75rem 0.4rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--color-text-primary);
    border-bottom: 1px solid var(--color-neutral-border);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CardImageWrapper = styled.div`
  flex: 0 0 30%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    order: 2;
    flex: none;
    width: 100%;
    height: 180px;
  }
`;

export const CuisinePillsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
  overflow: hidden;

  @media (max-width: 600px) {
    order: 3;
    padding: 0.6rem;
    gap: 0.3rem;
    justify-content: space-between;
  }
`;

/* Hides the title inside CardBody on mobile (shown via CardTitleRow instead) */
export const DesktopTitle = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const MobileHide = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const ViewRecipeButton = styled.button`
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: var(--color-text-primary);
  border: none;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-card-bg);
  align-self: center;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 600px) {
    padding: 0.35rem 0.85rem;
    font-size: 0.75rem;
    margin-top: 0;
  }
`;
