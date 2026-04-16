import { render, screen } from '@testing-library/react';
import DietPills from './DietPills';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const baseRecipe = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  ketogenic: false,
  paleo: false,
  primal: false,
  pescetarian: false,
  lowFodmap: false,
  whole30: false,
};

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
