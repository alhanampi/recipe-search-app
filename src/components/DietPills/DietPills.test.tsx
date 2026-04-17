import { render, screen } from '@testing-library/react';
import DietPills from './DietPills';
import { mockRecipe as baseRecipe } from '../../test/mocks/fixtures';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('DietPills', () => {
  it('renders no pills when no diets are active', () => {
    render(<DietPills recipe={baseRecipe} />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders pills for active diets', () => {
    const recipe = { ...baseRecipe, vegetarian: true, vegan: true };
    render(<DietPills recipe={recipe} />);
    expect(screen.getByText('diets.vegetarian')).toBeInTheDocument();
    expect(screen.getByText('diets.vegan')).toBeInTheDocument();
  });
});
