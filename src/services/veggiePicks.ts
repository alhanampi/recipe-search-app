import { complexSearch } from './api';

export const getVeggie = async (language = 'en') => {
  const { recipes } = await complexSearch(
    { diet: 'vegetarian', number: 4 },
    'veggie',
    language
  );
  return recipes;
};
