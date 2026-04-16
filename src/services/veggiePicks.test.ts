import { complexSearch } from './api';
import { getVeggie } from './veggiePicks';

vi.mock('./api', () => ({
  complexSearch: vi.fn(),
}));

const mockedComplexSearch = vi.mocked(complexSearch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getVeggie', () => {
  it('calls complexSearch with the correct parameters', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getVeggie();

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      { diet: 'vegetarian', number: 4 },
      'veggie',
      'en'
    );
  });

  it('passes language through to complexSearch', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getVeggie('it');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      expect.any(Object),
      'veggie',
      'it'
    );
  });

  it('returns the recipes array from the result', async () => {
    const recipes = [{ id: 1, title: 'Salad' }];
    mockedComplexSearch.mockResolvedValue({ recipes, totalResults: 1 });

    const result = await getVeggie();

    expect(result).toEqual(recipes);
  });
});
