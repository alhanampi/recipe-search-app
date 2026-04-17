import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CuisinePage from './CuisinePage';
import { getCuisineRecipes } from '../../services/cuisineRecipes';
import { translateCards } from '../../services/groq';
import { mockRecipe } from '../../test/mocks/fixtures';

vi.mock('../../services/cuisineRecipes', () => ({ getCuisineRecipes: vi.fn() }));
vi.mock('../../services/groq', () => ({ translateCards: vi.fn() }));
vi.mock('../../services/api', () => ({
  sessionKey: (...args: string[]) => args.join(':'),
  CACHE_TTL: 60000,
}));
vi.mock('../../components/DietPills/DietPills', () => ({ default: () => null }));
vi.mock('../../components/CuisinePills/CuisinePills', () => ({ default: () => null }));
vi.mock('../../components/FavoriteButton/FavoriteButton', () => ({ default: () => null }));
vi.mock('../../assets/nopreview.png', () => ({ default: '' }));
vi.mock('../../utils/constants', () => ({
  CUISINE_ICONS: {},
  LANGUAGES: [],
  LANGUAGE_NAMES: {},
}));

const mockGetCuisineRecipes = vi.mocked(getCuisineRecipes);
const mockTranslateCards = vi.mocked(translateCards);

let mockLanguage = 'en';
let mockCuisine = 'Italian';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: any) =>
      opts?.count !== undefined ? `${key}:${opts.count}` : key,
    i18n: { resolvedLanguage: mockLanguage },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ cuisine: mockCuisine }),
  useNavigate: () => mockNavigate,
}));

const renderCuisinePage = () => render(<CuisinePage />);

beforeEach(() => {
  mockLanguage = 'en';
  mockCuisine = 'Italian';
  localStorage.clear();
  vi.clearAllMocks();
  mockGetCuisineRecipes.mockResolvedValue({ recipes: [], totalResults: 0 });
  mockTranslateCards.mockResolvedValue(new Map());
});

describe('CuisinePage', () => {
  it('renders without crashing', () => {
    renderCuisinePage();
  });

  it('renders the cuisine name in the title', () => {
    renderCuisinePage();
    expect(screen.getByText('Italian recipes')).toBeInTheDocument();
  });

  it('shows result count after loading', async () => {
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderCuisinePage();
    expect(await screen.findByText('search.results:1')).toBeInTheDocument();
  });

  it('renders recipe cards after loading', async () => {
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderCuisinePage();
    expect(await screen.findByText('Pasta carbonara')).toBeInTheDocument();
  });

  it('navigates to recipe page on button click', async () => {
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderCuisinePage();
    await userEvent.click(await screen.findByText('recipe.viewFull'));
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });

  it('navigates back when back button is clicked', async () => {
    renderCuisinePage();
    await screen.findByText('search.results:0');
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('does not call translateCards in English', async () => {
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderCuisinePage();
    await screen.findByText('Pasta carbonara');
    expect(mockTranslateCards).not.toHaveBeenCalled();
  });

  it('uses translated title when language is not English', async () => {
    mockLanguage = 'it';
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    mockTranslateCards.mockResolvedValue(
      new Map([[1, { id: 1, title: 'pasta alla carbonara', summary: 'Un piatto classico' }]])
    );
    renderCuisinePage();
    expect(await screen.findByText('Pasta alla carbonara')).toBeInTheDocument();
  });

  it('shows show more button when more results exist', async () => {
    mockGetCuisineRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 10 });
    renderCuisinePage();
    expect(await screen.findByText('cuisine.showMore')).toBeInTheDocument();
  });

  it('loads more results when show more is clicked', async () => {
    const secondRecipe = { ...mockRecipe, id: 2, title: 'pizza margherita' };
    mockGetCuisineRecipes
      .mockResolvedValueOnce({ recipes: [mockRecipe], totalResults: 2 })
      .mockResolvedValueOnce({ recipes: [secondRecipe], totalResults: 2 });
    renderCuisinePage();
    await userEvent.click(await screen.findByText('cuisine.showMore'));
    expect(await screen.findByText('Pizza margherita')).toBeInTheDocument();
  });

  it('reads from cache when available', async () => {
    const cacheKey = 'cuisine:Italian:en';
    localStorage.setItem(cacheKey, JSON.stringify({
      recipes: [mockRecipe],
      totalResults: 1,
      timestamp: Date.now(),
    }));
    renderCuisinePage();
    expect(await screen.findByText('Pasta carbonara')).toBeInTheDocument();
    expect(mockGetCuisineRecipes).not.toHaveBeenCalled();
  });
});
