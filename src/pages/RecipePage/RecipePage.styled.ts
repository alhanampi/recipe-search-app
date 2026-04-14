import styled from 'styled-components';
import { MdBrokenImage } from 'react-icons/md';
import { FaClock } from 'react-icons/fa';

export const ClockIcon = styled(FaClock)`
  vertical-align: middle;
  margin-right: 0.35rem;
  flex-shrink: 0;
`;

export const Wrapper = styled.section`
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
  background-color: var(--color-card-bg);

  @media (max-width: 600px) {
    padding: 1.25rem 1rem;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--color-neutral-border);
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text-primary);
  flex-shrink: 0;
  transition: background-color 0.15s ease;
  margin-right: 1rem;

  &:hover {
    background-color: var(--color-card-bg);
  }

  @media (max-width: 600px) {
    width: 2.75rem;
    height: 2.75rem;
    font-size: 1.1rem;
    margin-right: 0.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  text-transform: capitalize;
`;

export const HeroImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    max-height: 240px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--color-text-muted);

  @media (max-width: 600px) {
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

export const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 1.5rem 0 0.75rem;

  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin: 1.25rem 0 0.6rem;
  }
`;

export const UnitToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const UnitLabel = styled.span`
  color:'var(--color-text-primary)';
  transition: color 0.15s ease;
`;

export const RecipeLink = styled.a`
  color: var(--color-orange-light-text);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s ease;

  &:hover {
    color: var(---color-red-light-text);
    text-decoration: underline;
  }
`;

export const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

export const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
`;

export const IngredientImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  flex-shrink: 0;
`;

export const BrokenImageIcon = styled(MdBrokenImage)`
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  color: var(--color-text-muted);
  opacity: 0.5;
`;

export const InstructionList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

export const InstructionStep = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-primary);
`;

export const StepNumber = styled.span`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #f59e0b;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2rem;
`;

export const InstructionText = styled.div`
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-primary);
`;
