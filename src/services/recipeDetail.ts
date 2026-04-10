import axios from 'axios';
import { CACHE_TTL } from './api';

const BASE_URL = 'https://api.spoonacular.com/recipes';

export const getRecipeById = async (id: number, language = 'en'): Promise<any> => {
  const cacheKey = `recipe_${id}_${language}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) return data;
  }

  const { data } = await axios.get(`${BASE_URL}/${id}/information`, {
    params: { apiKey: import.meta.env.VITE_API_KEY, language },
  });

  localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));

  return data;
};
