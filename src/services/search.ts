import { complexSearch, PAGE_SIZE } from './api';

export const searchRecipes = (query: string, offset = 0, language = 'en') =>
  complexSearch(
    { query, number: PAGE_SIZE, offset },
    `search_${query.toLowerCase()}_${offset}`,
    language
  );
