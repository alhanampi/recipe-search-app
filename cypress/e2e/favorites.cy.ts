// Favorites flow — adds a recipe, checks it persists, removes it via the modal.

describe('Favorites flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/recipes/random**', { body: { recipes: [] } });
    cy.intercept('GET', '**/recipes/complexSearch**', { fixture: 'search-results.json' }).as('search');
    cy.intercept('GET', '**/recipes/10/information**', { fixture: 'recipe-detail.json' }).as('recipeDetail');
  });

  it('favorites page shows empty state initially', () => {
    cy.visit('/favs');
    cy.contains('No saved recipes yet').should('be.visible');
  });

  it('adds a recipe to favorites from search results', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');

    // The FavoriteButton is the heart icon overlaid on the card image
    cy.get('[aria-label="add to favorites"]').first().click();

    // Icon should now be filled (aria-label changes)
    cy.get('[aria-label="remove from favorites"]').should('exist');
  });

  it('favorite persists in /favs after being added', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.get('[aria-label="add to favorites"]').first().click();

    cy.visit('/favs');
    cy.contains('Spaghetti bolognese').should('be.visible');
  });

  it('shows the remove modal when clicking a filled heart', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.get('[aria-label="add to favorites"]').first().click();
    cy.get('[aria-label="remove from favorites"]').first().click();

    // Modal should appear with confirm/cancel buttons
    cy.contains('Remove from favorites?').should('be.visible');
    cy.contains('Remove').should('be.visible');
    cy.contains('Cancel').should('be.visible');
  });

  it('removes the recipe after confirming in the modal', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.get('[aria-label="add to favorites"]').first().click();
    cy.get('[aria-label="remove from favorites"]').first().click();
    cy.contains('Remove').click();

    // Heart should be empty again
    cy.get('[aria-label="add to favorites"]').should('exist');
    cy.get('[aria-label="remove from favorites"]').should('not.exist');
  });

  it('keeps the recipe when cancelling the remove modal', () => {
    cy.visit('/search/spaghetti');
    cy.wait('@search');
    cy.get('[aria-label="add to favorites"]').first().click();
    cy.get('[aria-label="remove from favorites"]').first().click();
    cy.contains('Cancel').click();

    // Heart should still be filled
    cy.get('[aria-label="remove from favorites"]').should('exist');
  });

  it('adds a recipe from the full recipe page', () => {
    cy.visit('/recipe/1');
    cy.wait('@recipeDetail');

    cy.get('[aria-label="add to favorites"]').click();
    cy.get('[aria-label="remove from favorites"]').should('exist');
  });
});
