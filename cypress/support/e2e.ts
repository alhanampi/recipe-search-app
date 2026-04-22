// Global setup for all E2E tests.
// cy.intercept() calls defined here would apply to every test,
// but we keep them per-test for clarity.

beforeEach(() => {
  // Start each test with clean localStorage
  cy.clearLocalStorage();
});
