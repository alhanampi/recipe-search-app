import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchPage from './SearchPage';
import { searchRecipes } from '../../services/search';
import { translateCards } from '../../services/groq';
import { mockRecipe } from '../../test/mocks/fixtures';

vi.mock('../../services/search', () => ({ searchRecipes: vi.fn() }));
vi.mock('../../services/groq', () => ({ translateCards: vi.fn() }));
vi.mock('../../services/api', () => ({
  sessionKey: (...args: string[]) => args.join(':'),
  CACHE_TTL: 60000,
}));
vi.mock('../../components/DietPills/DietPills', () => ({ default: () => null }));
vi.mock('../../components/CuisinePills/CuisinePills', () => ({ default: () => null }));
vi.mock('../../components/FavoriteButton/FavoriteButton', () => ({ default: () => null }));
vi.mock('../../assets/nopreview.png', () => ({ default: '' }));

const mockSearchRecipes = vi.mocked(searchRecipes);
const mockTranslateCards = vi.mocked(translateCards);

let mockLanguage = 'en';
let mockQuery = 'pasta';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: any) =>
      opts?.count !== undefined ? `${key}:${opts.count}` : key,
    i18n: { resolvedLanguage: mockLanguage },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ query: mockQuery }),
  useNavigate: () => mockNavigate,
}));

const renderSearchPage = () => render(<SearchPage />);

beforeEach(() => {
  mockLanguage = 'en';
  mockQuery = 'pasta';
  localStorage.clear();
  vi.clearAllMocks();
  mockSearchRecipes.mockResolvedValue({ recipes: [], totalResults: 0 });
  mockTranslateCards.mockResolvedValue(new Map());
});

describe('SearchPage', () => {
  it('renders without crashing', () => {
    renderSearchPage();
  });

  it('renders the decoded query in the title', () => {
    renderSearchPage();
    expect(screen.getByText('"pasta"')).toBeInTheDocument();
  });

  it('shows no results message when totalResults is 0', async () => {
    renderSearchPage();
    expect(await screen.findByText('search.noResults')).toBeInTheDocument();
  });

  it('shows result count when results are found', async () => {
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderSearchPage();
    expect(await screen.findByText('search.results:1')).toBeInTheDocument();
  });

  it('renders recipe cards after loading', async () => {
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderSearchPage();
    expect(await screen.findAllByText('Pasta carbonara')).not.toHaveLength(0);
  });

  it('navigates to recipe page on button click', async () => {
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderSearchPage();
    await userEvent.click((await screen.findAllByText('recipe.viewFull'))[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });

  it('navigates back when back button is clicked', async () => {
    renderSearchPage();
    await screen.findByText('search.noResults');
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('does not call translateCards in English', async () => {
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    renderSearchPage();
    await screen.findAllByText('Pasta carbonara');
    expect(mockTranslateCards).not.toHaveBeenCalled();
  });

  it('uses translated title when language is not English', async () => {
    mockLanguage = 'it';
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 1 });
    mockTranslateCards.mockResolvedValue(
      new Map([[1, { id: 1, title: 'pasta alla carbonara', summary: 'Un piatto classico' }]])
    );
    renderSearchPage();
    expect(await screen.findAllByText('Pasta alla carbonara')).not.toHaveLength(0);
  });

  it('shows show more button when more results exist', async () => {
    mockSearchRecipes.mockResolvedValue({ recipes: [mockRecipe], totalResults: 10 });
    renderSearchPage();
    expect(await screen.findByText('cuisine.showMore')).toBeInTheDocument();
  });

  it('loads more results when show more is clicked', async () => {
    const secondRecipe = { ...mockRecipe, id: 2, title: 'pizza margherita' };
    mockSearchRecipes
      .mockResolvedValueOnce({ recipes: [mockRecipe], totalResults: 2 })
      .mockResolvedValueOnce({ recipes: [secondRecipe], totalResults: 2 });
    renderSearchPage();
    await userEvent.click(await screen.findByText('cuisine.showMore'));
    expect(await screen.findAllByText('Pizza margherita')).not.toHaveLength(0);
  });

  it('reads from cache when available', async () => {
    const cacheKey = 'search:pasta:en';
    localStorage.setItem(cacheKey, JSON.stringify({
      recipes: [mockRecipe],
      totalResults: 1,
      timestamp: Date.now(),
    }));
    renderSearchPage();
    expect(await screen.findAllByText('Pasta carbonara')).not.toHaveLength(0);
    expect(mockSearchRecipes).not.toHaveBeenCalled();
  });
});
