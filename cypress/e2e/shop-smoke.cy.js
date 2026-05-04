describe('Veritex Shop smoke checks', () => {
  it('loads home and shop pages', () => {
    cy.viewport(1280, 800);
    cy.visit('/');
    cy.contains('Shop by Category').should('be.visible');

    cy.contains('a', 'Shop').click();
    cy.contains('h1, h2', 'Shop').should('be.visible');
  });

  it('redirects testing dashboard to login when not authenticated', () => {
    cy.clearLocalStorage();
    cy.visit('/testing-dashboard');
    cy.contains('Welcome back').should('be.visible');
  });
});
