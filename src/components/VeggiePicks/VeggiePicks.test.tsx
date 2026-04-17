import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VeggiePicks from './VeggiePicks';
import { getVeggie } from '../../services/veggiePicks';
import { translateCards } from '../../services/groq';
import { mockRecipe } from '../../test/mocks/fixtures';

vi.mock('../../services/veggiePicks', () => ({ getVeggie: vi.fn() }));
vi.mock('../../services/groq', () => ({ translateCards: vi.fn() }));
vi.mock('../DietPills/DietPills', () => ({ default: () => null }));
vi.mock('../CuisinePills/CuisinePills', () => ({ default: () => null }));
vi.mock('../FavoriteButton/FavoriteButton', () => ({ default: () => null }));
vi.mock('../../assets/nopreview.png', () => ({ default: '' }));

const mockGetVeggie = vi.mocked(getVeggie);
const mockTranslateCards = vi.mocked(translateCards);

let mockLanguage = 'en';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { resolvedLanguage: mockLanguage },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('@mui/material/useMediaQuery', () => ({ default: () => false }));

const renderVeggiePicks = () => render(<VeggiePicks />);

beforeEach(() => {
  mockLanguage = 'en';
  vi.clearAllMocks();
  mockGetVeggie.mockResolvedValue([]);
  mockTranslateCards.mockResolvedValue(new Map());
});

describe('VeggiePicks', () => {
  it('renders without crashing', () => {
    renderVeggiePicks();
  });

  it('renders the section title', () => {
    renderVeggiePicks();
    expect(screen.getByText('veggiePicks.title')).toBeInTheDocument();
  });

  it('renders recipe cards after loading', async () => {
    mockGetVeggie.mockResolvedValue([mockRecipe]);
    renderVeggiePicks();
    expect(await screen.findAllByText('Pasta carbonara')).not.toHaveLength(0);
  });

  it('capitalizes the first letter of the title', async () => {
    mockGetVeggie.mockResolvedValue([{ ...mockRecipe, title: 'carbonara' }]);
    renderVeggiePicks();
    expect(await screen.findAllByText('Carbonara')).not.toHaveLength(0);
  });

  it('navigates to recipe page on button click', async () => {
    mockGetVeggie.mockResolvedValue([mockRecipe]);
    renderVeggiePicks();
    await userEvent.click((await screen.findAllByText('recipe.viewFull'))[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });

  it('does not call translateCards in English', async () => {
    mockGetVeggie.mockResolvedValue([mockRecipe]);
    renderVeggiePicks();
    await screen.findAllByText('Pasta carbonara');
    expect(mockTranslateCards).not.toHaveBeenCalled();
  });

  it('uses translated title when available', async () => {
    mockLanguage = 'it';
    mockGetVeggie.mockResolvedValue([mockRecipe]);
    mockTranslateCards.mockResolvedValue(
      new Map([[1, { id: 1, title: 'pasta alla carbonara', summary: 'Un piatto classico' }]])
    );
    renderVeggiePicks();
    expect(await screen.findAllByText('Pasta alla carbonara')).not.toHaveLength(0);
  });
});
