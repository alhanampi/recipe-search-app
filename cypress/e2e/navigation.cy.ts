// Basic navigation — verifies the home page loads and key UI elements are visible.
// Uses cy.intercept() to prevent real API calls.

describe('Home page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/recipes/random**', { body: { recipes: [] } });
    cy.intercept('GET', '**/recipes/complexSearch**', {
      body: { results: [], totalResults: 0 },
    });
    cy.visit('/');
  });

  it('shows the site title', () => {
    cy.contains('Dishcovery').should('be.visible');
  });

  it('shows the search input', () => {
    cy.get('input[type="text"]').should('be.visible');
  });

  it('navigates to the about page', () => {
    // The about link is in the footer
    cy.get('a[href="/about"]').first().click();
    cy.url().should('include', '/about');
    cy.contains('About Dishcovery').should('be.visible');
  });

  it('navigates to the favorites page', () => {
    cy.get('a[href="/favs"]').first().click();
    cy.url().should('include', '/favs');
    cy.contains('My Favorites').should('be.visible');
  });
});
