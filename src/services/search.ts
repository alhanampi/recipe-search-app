import axios from 'axios';

const CACHE_TTL = 1000 * 60 * 60 * 24;
const PAGE_SIZE = 10;

interface SearchCache {
  recipes: any[];
  totalResults: number;
  timestamp: number;
}

export const searchRecipes = async (query: string, offset = 0): Promise<{ recipes: any[]; totalResults: number }> => {
  const cacheKey = `search_${query.toLowerCase()}_${offset}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const parsed: SearchCache = JSON.parse(cached);
    if (Date.now() - parsed.timestamp < CACHE_TTL) {
      return { recipes: parsed.recipes, totalResults: parsed.totalResults };
    }
  }

  const { data } = await axios.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    {
      params: {
        query,
        number: PAGE_SIZE,
        offset,
        addRecipeInformation: true,
        apiKey: import.meta.env.VITE_API_KEY,
      },
    }
  );

  const entry: SearchCache = {
    recipes: data.results,
    totalResults: data.totalResults,
    timestamp: Date.now(),
  };

  localStorage.setItem(cacheKey, JSON.stringify(entry));

  return { recipes: data.results, totalResults: data.totalResults };
};
