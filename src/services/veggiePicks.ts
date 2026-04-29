import { randomRecipes } from './api';

export const getVeggie = (language = 'en') =>
  randomRecipes({ number: 4, tags: 'vegetarian' }, 'veggie', language);
