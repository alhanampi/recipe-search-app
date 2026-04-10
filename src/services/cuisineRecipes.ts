import { complexSearch, PAGE_SIZE } from './api';

export const getCuisineRecipes = (cuisine: string, offset = 0, language = 'en') =>
  complexSearch(
    { cuisine, number: PAGE_SIZE, offset },
    `cuisine_${cuisine.toLowerCase()}_${offset}`,
    language
  );
