export const mockRecipe = {
  id: 1,
  title: 'pasta carbonara',
  summary: 'A classic Italian dish with eggs, cheese, and guanciale.',
  image: 'pasta.jpg',
  readyInMinutes: 30,
  cuisines: [],
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: false,
  ketogenic: false,
  paleo: false,
  primal: false,
  pescetarian: false,
  lowFodmap: false,
  whole30: false,
};

export const mockCards = [
  { id: 1, title: 'Pasta', summary: 'A simple dish' },
  { id: 2, title: 'Pizza', summary: 'A classic' },
];

export const mockRecipeTranslation = {
  title: 'pasta carbonara',
  summary: 'Un plato sencillo',
  ingredientNames: [],
  instructions: [],
};

export const mockFullRecipe = {
  ...mockRecipe,
  summary: 'A classic dish.',
  servings: 4,
  extendedIngredients: [
    {
      id: 10,
      name: 'egg',
      original: '2 large eggs',
      image: 'egg.jpg',
      measures: {
        us: { amount: 2, unitShort: 'large' },
        metric: { amount: 2, unitShort: 'large' },
      },
    },
  ],
  analyzedInstructions: [
    { steps: [{ step: 'Boil water.' }, { step: 'Cook pasta.' }] },
  ],
  sourceUrl: 'https://example.com/carbonara',
  sourceName: 'example.com',
};
