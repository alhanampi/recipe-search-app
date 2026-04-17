import axios from 'axios';
import { translateRecipe, translateCards } from './groq';
import { CACHE_TTL } from './api';
import { mockCards } from '../test/mocks/fixtures';

vi.mock('axios');
const mockedAxios = vi.mocked(axios);

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// ─── translateRecipe ──────────────────────────────────────────────────────────

describe('translateRecipe', () => {
  const recipeId = 42;
  const language = 'es';
  const cacheKey = `groq_recipe_${recipeId}_${language}`;
  const payload = {
    title: 'Pasta',
    summary: 'A simple dish',
    ingredientNames: [],
    instructions: [],
  };
  const translated = {
    title: 'Pasta',
    summary: 'Un plato sencillo',
    ingredientNames: [],
    instructions: [],
  };

  it('returns cached data without calling axios when cache is fresh', async () => {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: translated, timestamp: Date.now() })
    );

    const result = await translateRecipe(recipeId, payload, language);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(result.summary).toBe('Un plato sencillo');
  });

  it('calls axios and returns translated data on cache miss', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { choices: [{ message: { content: JSON.stringify(translated) } }] },
    });

    const result = await translateRecipe(recipeId, payload, language);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(result.summary).toBe('Un plato sencillo');
  });

  it('stores the result in localStorage after fetching', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { choices: [{ message: { content: JSON.stringify(translated) } }] },
    });

    await translateRecipe(recipeId, payload, language);

    const stored = JSON.parse(localStorage.getItem(cacheKey)!);
    expect(stored.data.summary).toBe('Un plato sencillo');
  });

  it('calls axios when cache is expired', async () => {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        data: translated,
        timestamp: Date.now() - CACHE_TTL - 1,
      })
    );

    mockedAxios.post.mockResolvedValue({
      data: { choices: [{ message: { content: JSON.stringify(translated) } }] },
    });

    await translateRecipe(recipeId, payload, language);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  });
});

// ─── translateCards ───────────────────────────────────────────────────────────

describe('translateCards', () => {
  const language = 'fr';
  const cards = mockCards;

  it('returns all cards from cache without calling axios when all are cached', async () => {
    for (const card of cards) {
      localStorage.setItem(
        `groq_card_${card.id}_${language}`,
        JSON.stringify({
          data: { ...card, title: `${card.title} FR` },
          timestamp: Date.now(),
        })
      );
    }

    const result = await translateCards(cards, language);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(result.get(1)?.title).toBe('Pasta FR');
    expect(result.get(2)?.title).toBe('Pizza FR');
  });

  it('calls axios for all cards when none are cached', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                cards: [
                  { id: 1, title: 'Pâtes', summary: 'Un plat simple' },
                  { id: 2, title: 'Pizza', summary: 'Un classique' },
                ],
              }),
            },
          },
        ],
      },
    });

    const result = await translateCards(cards, language);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(result.get(1)?.title).toBe('Pâtes');
    expect(result.get(2)?.title).toBe('Pizza');
  });

  it('only fetches uncached cards when some are already cached', async () => {
    localStorage.setItem(
      `groq_card_1_${language}`,
      JSON.stringify({
        data: { id: 1, title: 'Pâtes', summary: 'Un plat simple' },
        timestamp: Date.now(),
      })
    );

    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                cards: [{ id: 2, title: 'Pizza FR', summary: 'Un classique' }],
              }),
            },
          },
        ],
      },
    });

    const result = await translateCards(cards, language);

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(result.get(1)?.title).toBe('Pâtes');
    expect(result.get(2)?.title).toBe('Pizza FR');
  });

  it('caches each fetched card individually', async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                cards: [
                  { id: 1, title: 'Pâtes', summary: 'Un plat simple' },
                  { id: 2, title: 'Pizza FR', summary: 'Un classique' },
                ],
              }),
            },
          },
        ],
      },
    });

    await translateCards(cards, language);

    expect(localStorage.getItem(`groq_card_1_${language}`)).not.toBeNull();
    expect(localStorage.getItem(`groq_card_2_${language}`)).not.toBeNull();
  });

  it('returns an empty Map when given an empty array', async () => {
    const result = await translateCards([], language);

    expect(mockedAxios.post).not.toHaveBeenCalled();
    expect(result.size).toBe(0);
  });
});
