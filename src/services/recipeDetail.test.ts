import axios from 'axios';
import { CACHE_TTL } from './api';
import { getRecipeById } from './recipeDetail';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe('getRecipeById', () => {
  const id = 123;
  const recipe = { id, title: 'Pasta Carbonara' };

  it('returns cached data without calling axios when cache is fresh', async () => {
    localStorage.setItem(
      `recipe_${id}_en`,
      JSON.stringify({ data: recipe, timestamp: Date.now() })
    );

    const result = await getRecipeById(id);

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.title).toBe('Pasta Carbonara');
  });

  it('calls axios and returns data on cache miss', async () => {
    mockedAxios.get.mockResolvedValue({ data: recipe });

    const result = await getRecipeById(id);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result.title).toBe('Pasta Carbonara');
  });

  it('stores the result in localStorage after fetching', async () => {
    mockedAxios.get.mockResolvedValue({ data: recipe });

    await getRecipeById(id);

    const stored = JSON.parse(localStorage.getItem(`recipe_${id}_en`)!);
    expect(stored.data.title).toBe('Pasta Carbonara');
  });

  it('calls axios when cache is expired', async () => {
    localStorage.setItem(
      `recipe_${id}_en`,
      JSON.stringify({ data: recipe, timestamp: Date.now() - CACHE_TTL - 1 })
    );
    mockedAxios.get.mockResolvedValue({ data: recipe });

    await getRecipeById(id);

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
  });

  it('uses a language-specific cache key', async () => {
    mockedAxios.get.mockResolvedValue({ data: recipe });

    await getRecipeById(id, 'fr');

    expect(localStorage.getItem(`recipe_${id}_fr`)).not.toBeNull();
    expect(localStorage.getItem(`recipe_${id}_en`)).toBeNull();
  });
});
