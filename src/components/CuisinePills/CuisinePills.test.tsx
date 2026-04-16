import { render, screen } from '@testing-library/react';
import CuisinePills from './CuisinePills';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { defaultValue?: string }) => opts?.defaultValue ?? key,
  }),
}));

vi.mock('@mui/material/useMediaQuery', () => ({
  default: () => false,
}));

const baseRecipe = { cuisines: [] };

describe('CuisinePills', () => {
  it('renders nothing when cuisines array is empty', () => {
    const { container } = render(<CuisinePills recipe={baseRecipe} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a chip for each cuisine', () => {
    const recipe = { cuisines: ['Italian', 'French'] };
    render(<CuisinePills recipe={recipe} />);
    expect(screen.getByText('Italian')).toBeInTheDocument();
    expect(screen.getByText('French')).toBeInTheDocument();
  });

  it('uses the translation key for known cuisines', () => {
    const recipe = { cuisines: ['Italian'] };
    render(<CuisinePills recipe={recipe} />);
    // t('cuisines.italian', { defaultValue: 'Italian' }) → returns 'Italian' via defaultValue
    expect(screen.getByText('Italian')).toBeInTheDocument();
  });

  it('handles multi-word cuisines with camelCase key', () => {
    // "Eastern European" → toCamelKey → "easternEuropean"
    // t('cuisines.easternEuropean', { defaultValue: 'Eastern European' })
    const recipe = { cuisines: ['Eastern European'] };
    render(<CuisinePills recipe={recipe} />);
    expect(screen.getByText('Eastern European')).toBeInTheDocument();
  });

  it('renders nothing when cuisines is undefined', () => {
    const { container } = render(<CuisinePills recipe={{}} />);
    expect(container.firstChild).toBeNull();
  });
});
