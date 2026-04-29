import { render, screen } from '@testing-library/react';
import NutritionChart from './NutritionChart';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>) =>
      opts?.count !== undefined ? `${key} ${opts.count}` : key,
  }),
}));

const recipeWithNutrition = {
  servings: 4,
  nutrition: {
    nutrients: [
      { name: 'Calories', amount: 400, unit: 'kcal', percentOfDailyNeeds: 20 },
      { name: 'Protein', amount: 20, unit: 'g', percentOfDailyNeeds: 40 },
      { name: 'Fat', amount: 16, unit: 'g', percentOfDailyNeeds: 24.6 },
    ],
  },
};

describe('NutritionChart', () => {
  it('renders nothing when nutrition data is absent', () => {
    const { container } = render(
      <NutritionChart recipe={{ servings: 4 }} selectedServings={4} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the section title', () => {
    render(<NutritionChart recipe={recipeWithNutrition} selectedServings={4} />);
    expect(screen.getByText('recipe.nutritionTitle')).toBeInTheDocument();
  });

  it('renders known nutrients from the recipe', () => {
    render(<NutritionChart recipe={recipeWithNutrition} selectedServings={4} />);
    expect(screen.getByText(/Calories/)).toBeInTheDocument();
    expect(screen.getByText(/Protein/)).toBeInTheDocument();
    expect(screen.getByText(/Fat/)).toBeInTheDocument();
  });

  it('does not render nutrients not in the NUTRIENTS config', () => {
    const recipe = {
      servings: 4,
      nutrition: {
        nutrients: [{ name: 'Manganese', amount: 1, unit: 'mg', percentOfDailyNeeds: 5 }],
      },
    };
    const { container } = render(<NutritionChart recipe={recipe} selectedServings={4} />);
    expect(container.firstChild).toBeNull();
  });

  it('shows percentage of daily needs at default servings', () => {
    render(<NutritionChart recipe={recipeWithNutrition} selectedServings={4} />);
    expect(screen.getByText('20%')).toBeInTheDocument();
  });

  it('scales amounts and percentages when selectedServings differs from recipe.servings', () => {
    render(<NutritionChart recipe={recipeWithNutrition} selectedServings={8} />);
    // 400 kcal * (8/4) = 800
    expect(screen.getByText(/800 kcal/)).toBeInTheDocument();
    // 20% * 2 = 40%
    expect(screen.getAllByText('40%').length).toBeGreaterThan(0);
  });

  it('caps percentage at 100% even when scaled above daily needs', () => {
    render(<NutritionChart recipe={recipeWithNutrition} selectedServings={8} />);
    // Fat: 24.6% * 2 = 49.2% — should show 49%
    expect(screen.queryByText(/[2-9]\d\d%/)).toBeNull();
  });
});
