import { getPopular } from './topPicks';
import { randomRecipes } from './api';

vi.mock('./api', () => ({
  randomRecipes: vi.fn(),
}));

const mockedRandomRecipes = vi.mocked(randomRecipes);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getPopular', () => {
  it('calls randomRecipes with the correct parameters', async () => {
    mockedRandomRecipes.mockResolvedValue([]);

    await getPopular();

    expect(mockedRandomRecipes).toHaveBeenCalledWith({ number: 9 }, 'popular', 'en');
  });

  it('passes language through to randomRecipes', async () => {
    mockedRandomRecipes.mockResolvedValue([]);

    await getPopular('fr');

    expect(mockedRandomRecipes).toHaveBeenCalledWith({ number: 9 }, 'popular', 'fr');
  });
});
