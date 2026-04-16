import { getCuisineRecipes } from './cuisineRecipes';
import { complexSearch, PAGE_SIZE } from './api';

vi.mock('./api', () => ({
  complexSearch: vi.fn(),
  PAGE_SIZE: 10,
}));

const mockedComplexSearch = vi.mocked(complexSearch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getCuisineRecipes', () => {
  it('calls complexSearch with the correct cuisine and page size', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getCuisineRecipes('italian');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      { cuisine: 'italian', number: PAGE_SIZE, offset: 0 },
      'cuisine_italian_0',
      'en'
    );
  });

  it('defaults offset to 0', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getCuisineRecipes('mexican');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      expect.objectContaining({ offset: 0 }),
      expect.any(String),
      expect.any(String)
    );
  });

  it('passes offset when provided', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getCuisineRecipes('mexican', 10);

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      expect.objectContaining({ offset: 10 }),
      'cuisine_mexican_10',
      'en'
    );
  });

  it('passes language through to complexSearch', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getCuisineRecipes('french', 0, 'fr');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(String),
      'fr'
    );
  });

  it('lowercases the cuisine in the cache key', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await getCuisineRecipes('Italian');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      expect.any(Object),
      'cuisine_italian_0',
      expect.any(String)
    );
  });
});
