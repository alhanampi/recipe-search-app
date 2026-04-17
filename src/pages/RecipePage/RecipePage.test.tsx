import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipePage from './RecipePage';
import { getRecipeById } from '../../services/recipeDetail';
import { translateRecipe } from '../../services/groq';
import { mockFullRecipe } from '../../test/mocks/fixtures';

vi.mock('../../services/recipeDetail', () => ({ getRecipeById: vi.fn() }));
vi.mock('../../services/groq', () => ({ translateRecipe: vi.fn() }));
vi.mock('../../components/DietPills/DietPills', () => ({ default: () => null }));
vi.mock('../../components/CuisinePills/CuisinePills', () => ({ default: () => null }));
vi.mock('../../components/FavoriteButton/FavoriteButton', () => ({ default: () => null }));
vi.mock('../../components/AppSwitch/AppSwitch', () => ({
  default: ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <input type="checkbox" checked={checked} onChange={onChange} aria-label="unit-toggle" />
  ),
}));
vi.mock('../../assets/nopreview.png', () => ({ default: '' }));

const mockGetRecipeById = vi.mocked(getRecipeById);
const mockTranslateRecipe = vi.mocked(translateRecipe);

let mockLanguage = 'en';
let mockId = '1';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { resolvedLanguage: mockLanguage },
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: mockId }),
  useNavigate: () => mockNavigate,
}));

const renderRecipePage = () => render(<RecipePage />);

beforeEach(() => {
  mockLanguage = 'en';
  mockId = '1';
  localStorage.clear();
  vi.clearAllMocks();
  mockGetRecipeById.mockResolvedValue(null);
  mockTranslateRecipe.mockResolvedValue(null);
});

describe('RecipePage', () => {
  it('renders without crashing', () => {
    renderRecipePage();
  });

  it('shows a loading spinner initially', () => {
    mockGetRecipeById.mockReturnValue(new Promise(() => {}));
    renderRecipePage();
    expect(document.querySelector('[role="progressbar"]')).toBeInTheDocument();
  });

  it('renders the recipe title after loading', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    expect(await screen.findByText('pasta carbonara')).toBeInTheDocument();
  });

  it('renders the summary after loading', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    expect(await screen.findByText('A classic dish.')).toBeInTheDocument();
  });

  it('renders the ingredients section', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    await screen.findByText('pasta carbonara');
    expect(screen.getByText('recipe.ingredients')).toBeInTheDocument();
  });

  it('renders the instructions', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    expect(await screen.findByText('Boil water.')).toBeInTheDocument();
    expect(screen.getByText('Cook pasta.')).toBeInTheDocument();
  });

  it('renders the source link', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    await screen.findByText('pasta carbonara');
    const link = screen.getByText('www.example.com');
    expect(link).toHaveAttribute('href', 'https://example.com/carbonara');
  });

  it('navigates back when back button is clicked', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    await screen.findByText('pasta carbonara');
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('toggles unit system when switch is clicked', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    await screen.findByText('recipe.ingredients');
    const toggle = screen.getByLabelText('unit-toggle');
    expect(toggle).not.toBeChecked();
    fireEvent.click(toggle);
    expect(localStorage.getItem('unit_preference')).toBe('metric');
  });

  it('does not call translateRecipe in English', async () => {
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    renderRecipePage();
    await screen.findByText('pasta carbonara');
    expect(mockTranslateRecipe).not.toHaveBeenCalled();
  });

  it('calls translateRecipe for non-English languages', async () => {
    mockLanguage = 'it';
    mockGetRecipeById.mockResolvedValue(mockFullRecipe);
    mockTranslateRecipe.mockResolvedValue({
      title: 'pasta alla carbonara',
      summary: 'Un piatto classico.',
      ingredientNames: ['uovo'],
      instructions: ["Fai bollire l'acqua."],
    });
    renderRecipePage();
    expect(await screen.findByText('pasta alla carbonara')).toBeInTheDocument();
  });
});
