import { randomRecipes } from './api';

export const getPopular = (language = 'en') =>
  randomRecipes({ number: 9 }, 'popular', language);
