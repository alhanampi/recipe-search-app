import { complexSearch, PAGE_SIZE } from './api';
import { searchRecipes } from './search';

vi.mock('./api', () => ({
  complexSearch: vi.fn(),
  PAGE_SIZE: 10,
}));

const mockedComplexSearch = vi.mocked(complexSearch);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('searchRecipes', () => {
  it('calls complexSearch with the correct parameters', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await searchRecipes('pasta');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      { query: 'pasta', number: PAGE_SIZE, offset: 0 },
      'search_pasta_0',
      'en'
    );
  });

  it('accepts offset and language parameters', async () => {
    mockedComplexSearch.mockResolvedValue({ recipes: [], totalResults: 0 });

    await searchRecipes('pasta', 20, 'fr');

    expect(mockedComplexSearch).toHaveBeenCalledWith(
      { query: 'pasta', number: PAGE_SIZE, offset: 20 },
      'search_pasta_20',
      'fr'
    );
  });
});
