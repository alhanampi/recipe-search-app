// Search flow — types a query, lands on search results, opens a recipe.

describe('Search flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/recipes/random**', { body: { recipes: [] } });
    cy.intercept('GET', '**/recipes/complexSearch**', { fixture: 'search-results.json' }).as('search');
    cy.intercept('GET', '**/recipes/10/information**', { fixture: 'recipe-detail.json' }).as('recipeDetail');
    cy.visit('/');
  });

  it('navigates to search results after submitting a query', () => {
    cy.get('input[type="text"]').type('spaghetti');
    cy.get('button[aria-label="Search"]').click();

    cy.url().should('include', '/search/spaghetti');
    cy.wait('@search');
    cy.contains('Spaghetti bolognese').should('be.visible');
  });

  it('shows the result count', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.contains('1 results found').should('be.visible');
  });

  it('opens the full recipe page from a search result', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.contains('View full recipe').click();

    cy.url().should('include', '/recipe/10');
    cy.wait('@recipeDetail');
    cy.contains('Spaghetti bolognese').should('be.visible');
  });

  it('shows the ingredients and instructions on the recipe page', () => {
    cy.visit('/recipe/1');
    cy.wait('@recipeDetail');
    cy.contains('Ingredients').should('be.visible');
    cy.contains('Instructions').should('be.visible');
    cy.contains('Boil salted water').should('be.visible');
  });

  it('shows no results message when nothing is found', () => {
    cy.intercept('GET', '**/recipes/complexSearch**', {
      body: { results: [], totalResults: 0 },
    }).as('emptySearch');
    cy.visit('/search/xyznotarecipe');
    cy.wait('@emptySearch');
    cy.contains('No recipes found').should('be.visible');
  });
});
