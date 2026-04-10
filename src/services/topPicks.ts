import axios from 'axios';

// change the popular recipes every 24 hours
const CACHE_KEY = 'popular';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export const getPopular = async () => {
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const { recipes, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return recipes;
    }
  }

  const { data } = await axios.get('https://api.spoonacular.com/recipes/random', {
    params: {
      number: 9,
      apiKey: import.meta.env.VITE_API_KEY,
    },
  });

  localStorage.setItem(CACHE_KEY, JSON.stringify({ recipes: data.recipes, timestamp: Date.now() }));

  return data.recipes;
};
