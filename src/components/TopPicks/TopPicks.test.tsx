import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TopPicks from './TopPicks';
import { getPopular } from '../../services/topPicks';
import { translateCards } from '../../services/groq';
import { mockRecipe } from '../../test/mocks/fixtures';

vi.mock('@splidejs/react-splide', () => ({
  Splide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SplideSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../services/topPicks', () => ({ getPopular: vi.fn() }));
vi.mock('../../services/groq', () => ({ translateCards: vi.fn() }));
vi.mock('../DietPills/DietPills', () => ({ default: () => null }));
vi.mock('../CuisinePills/CuisinePills', () => ({ default: () => null }));
vi.mock('../FavoriteButton/FavoriteButton', () => ({ default: () => null }));
vi.mock('../../assets/nopreview.png', () => ({ default: '' }));

const mockGetPopular = vi.mocked(getPopular);
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

const renderTopPicks = () => render(<TopPicks />);

beforeEach(() => {
  mockLanguage = 'en';
  vi.clearAllMocks();
  mockGetPopular.mockResolvedValue([]);
  mockTranslateCards.mockResolvedValue(new Map());
});

describe('TopPicks', () => {
  it('renders without crashing', () => {
    renderTopPicks();
  });

  it('renders the section title', () => {
    renderTopPicks();
    expect(screen.getByText('topPicks.title')).toBeInTheDocument();
  });

  it('renders mockRecipe cards after loading', async () => {
    mockGetPopular.mockResolvedValue([mockRecipe]);
    renderTopPicks();
    expect(await screen.findByText('Pasta carbonara')).toBeInTheDocument();
  });

  it('capitalizes the first letter of the title', async () => {
    mockGetPopular.mockResolvedValue([{ ...mockRecipe, title: 'carbonara' }]);
    renderTopPicks();
    expect(await screen.findByText('Carbonara')).toBeInTheDocument();
  });

  it('renders the ready time', async () => {
    mockGetPopular.mockResolvedValue([mockRecipe]);
    renderTopPicks();
    await screen.findByText('Pasta carbonara');
    expect(screen.getByText(/topPicks\.readyIn/)).toBeInTheDocument();
  });

  it('navigates to mockRecipe page on button click', async () => {
    mockGetPopular.mockResolvedValue([mockRecipe]);
    renderTopPicks();
    await userEvent.click(await screen.findByText('recipe.viewFull'));
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });

  it('does not call translateCards in English', async () => {
    mockGetPopular.mockResolvedValue([mockRecipe]);
    renderTopPicks();
    await screen.findByText('Pasta carbonara');
    expect(mockTranslateCards).not.toHaveBeenCalled();
  });

  it('uses translated title when available', async () => {
    mockLanguage = 'it';
    mockGetPopular.mockResolvedValue([mockRecipe]);
    mockTranslateCards.mockResolvedValue(
      new Map([[1, { id: 1, title: 'pasta alla carbonara', summary: 'Un piatto classico' }]])
    );
    renderTopPicks();
    expect(await screen.findByText('Pasta alla carbonara')).toBeInTheDocument();
  });
});
