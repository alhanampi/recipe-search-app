import styled from 'styled-components';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { FaClock } from 'react-icons/fa';

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

export const StyledCard = styled(MuiCard)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease !important;
  background-color: var(--color-card-bg) !important;
  border-radius: 15px !important;
  padding-top: 1rem;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const CardTitleBox = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  overflow: hidden;
`;

export const CardTitleText = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const CuisineOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledCardContent = styled(CardContent)`
  text-align: center;
  padding-bottom: 0.5rem !important;
`;

export const ClockRow = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
`;

export const ClockIcon = styled(FaClock)`
  vertical-align: middle;
  flex-shrink: 0;
`;

export const SummaryText = styled.p`
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
`;

export const ViewRecipeButton = styled.button`
  display: block;
  margin: auto auto 0.75rem;
  padding: 0.5rem 1.25rem;
  background-color: var(--color-text-primary);
  border: none;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: var(--color-card-bg);
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.8;
  }
`;
