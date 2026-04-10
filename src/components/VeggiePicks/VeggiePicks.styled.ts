import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: 2rem;

  .splide__track {
    overflow: visible;
  }
`;

export const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 80%;
  margin: 0 auto;
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
`;

export const CardImageWrapper = styled.div`
  flex: 0 0 30%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CuisinePillsOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 0.5rem;
`;
