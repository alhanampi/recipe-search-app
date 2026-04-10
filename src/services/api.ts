import axios from 'axios';
import type { PagedCache, PagedResult } from '../utils/types';

export const CACHE_TTL = 1000 * 60 * 60 * 24;
export const PAGE_SIZE = 10;

const BASE_URL = 'https://api.spoonacular.com/recipes';

const localizedKey = (key: string, language: string) =>
  language === 'en' ? key : `${key}_${language}`;

export const complexSearch = async (
  params: Record<string, any>,
  cacheKey: string,
  language = 'en'
): Promise<PagedResult> => {
  const lKey = localizedKey(cacheKey, language);
  const cached = localStorage.getItem(lKey);
  if (cached) {
    const parsed: PagedCache = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return { recipes: parsed.recipes, totalResults: parsed.totalResults };
    }
  }

  const { data } = await axios.get(`${BASE_URL}/complexSearch`, {
    params: {
      ...params,
      addRecipeInformation: true,
      language,
      apiKey: import.meta.env.VITE_API_KEY,
    },
  });

  const entry: PagedCache = {
    recipes: data.results,
    totalResults: data.totalResults,
    timestamp: Date.now(),
  };

  localStorage.setItem(lKey, JSON.stringify(entry));

  return { recipes: data.results, totalResults: data.totalResults };
};

export const randomRecipes = async (
  params: Record<string, any>,
  cacheKey: string,
  language = 'en'
): Promise<any[]> => {
  const lKey = localizedKey(cacheKey, language);
  const cached = localStorage.getItem(lKey);
  if (cached) {
    const { recipes, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return recipes;
  }

  const { data } = await axios.get(`${BASE_URL}/random`, {
    params: { ...params, language, apiKey: import.meta.env.VITE_API_KEY },
  });

  localStorage.setItem(
    lKey,
    JSON.stringify({ recipes: data.recipes, timestamp: Date.now() })
  );

  return data.recipes;
};
