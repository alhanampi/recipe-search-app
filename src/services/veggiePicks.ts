import axios from 'axios';

const CACHE_KEY = 'veggie';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export const getVeggie = async () => {
  const cached = localStorage.getItem(CACHE_KEY);

  if (cached) {
    const { recipes, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return recipes;
    }
  }

  const { data } = await axios.get(
    'https://api.spoonacular.com/recipes/complexSearch',
    {
      params: {
        diet: 'vegetarian',
        number: 4,
        addRecipeInformation: true,
        apiKey: import.meta.env.VITE_API_KEY,
      },
    }
  );

  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({ recipes: data.results, timestamp: Date.now() })
  );

  return data.results;
};
