import axios from 'axios';
import { sessionKey, complexSearch, randomRecipes, CACHE_TTL } from './api';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// ─── sessionKey ──────────────────────────────────────────────────────────────

describe('sessionKey', () => {
  it('builds the expected key', () => {
    expect(sessionKey('cuisine', 'italian', 'es')).toBe('cuisine_italian_session_es');
  });

  it('lowercases the value', () => {
    expect(sessionKey('cuisine', 'Italian', 'en')).toBe('cuisine_italian_session_en');
  });
});

// ─── complexSearch ───────────────────────────────────────────────────────────

describe('complexSearch', () => {
  it('returns cached data without calling axios when cache is fresh', async () => {
    localStorage.setItem('search_pasta', JSON.stringify({
      recipes: [{ id: 1, title: 'Pasta' }],
      totalResults: 1,
      timestamp: Date.now(),
    }));

    const result = await complexSearch({}, 'search_pasta');

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result.recipes[0].title).toBe('Pasta');
  });

  it('calls axios and stores result when cache is empty', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { results: [{ id: 2, title: 'Pizza' }], totalResults: 1 },
    });

    const result = await complexSearch({}, 'search_pizza');

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result.recipes[0].title).toBe('Pizza');
    expect(localStorage.getItem('search_pizza')).not.toBeNull();
  });

  it('calls axios when cache is expired', async () => {
    localStorage.setItem('search_pasta', JSON.stringify({
      recipes: [{ id: 1, title: 'Pasta' }],
      totalResults: 1,
      timestamp: Date.now() - CACHE_TTL - 1,
    }));

    mockedAxios.get.mockResolvedValue({
      data: { results: [{ id: 3, title: 'Fresh Pasta' }], totalResults: 1 },
    });

    const result = await complexSearch({}, 'search_pasta');

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result.recipes[0].title).toBe('Fresh Pasta');
  });

  it('uses a language-specific cache key for non-English', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { results: [{ id: 4, title: 'Pizza' }], totalResults: 1 },
    });

    await complexSearch({}, 'search_pizza', 'es');

    expect(localStorage.getItem('search_pizza_es')).not.toBeNull();
    expect(localStorage.getItem('search_pizza')).toBeNull();
  });
});

// ─── randomRecipes ───────────────────────────────────────────────────────────

describe('randomRecipes', () => {
  it('returns cached data without calling axios when cache is fresh', async () => {
    localStorage.setItem('random', JSON.stringify({
      recipes: [{ id: 10, title: 'Soup' }],
      timestamp: Date.now(),
    }));

    const result = await randomRecipes({}, 'random');

    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result[0].title).toBe('Soup');
  });

  it('calls axios and stores result when cache is empty', async () => {
    mockedAxios.get.mockResolvedValue({
      data: { recipes: [{ id: 11, title: 'Salad' }] },
    });

    const result = await randomRecipes({}, 'random');

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result[0].title).toBe('Salad');
    expect(localStorage.getItem('random')).not.toBeNull();
  });

  it('calls axios when cache is expired', async () => {
    localStorage.setItem('random', JSON.stringify({
      recipes: [{ id: 10, title: 'Soup' }],
      timestamp: Date.now() - CACHE_TTL - 1,
    }));

    mockedAxios.get.mockResolvedValue({
      data: { recipes: [{ id: 12, title: 'Fresh Soup' }] },
    });

    const result = await randomRecipes({}, 'random');

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result[0].title).toBe('Fresh Soup');
  });
});
