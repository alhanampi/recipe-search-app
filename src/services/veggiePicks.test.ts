import { randomRecipes } from './api';
import { getVeggie } from './veggiePicks';

vi.mock('./api', () => ({
  randomRecipes: vi.fn(),
}));

const mockedRandomRecipes = vi.mocked(randomRecipes);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getVeggie', () => {
  it('calls randomRecipes with vegetarian tag and number 4', async () => {
    mockedRandomRecipes.mockResolvedValue([]);

    await getVeggie();

    expect(mockedRandomRecipes).toHaveBeenCalledWith(
      { number: 4, tags: 'vegetarian' },
      'veggie',
      'en'
    );
  });

  it('passes language through to randomRecipes', async () => {
    mockedRandomRecipes.mockResolvedValue([]);

    await getVeggie('it');

    expect(mockedRandomRecipes).toHaveBeenCalledWith(
      expect.any(Object),
      'veggie',
      'it'
    );
  });

  it('returns the recipes array', async () => {
    const recipes = [{ id: 1, title: 'Salad' }];
    mockedRandomRecipes.mockResolvedValue(recipes);

    const result = await getVeggie();

    expect(result).toEqual(recipes);
  });
});
