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

  it('opens forgot password and confirms reset email delivery', () => {
    cy.visit('/login');
    cy.contains('Forgot password?').click();

    cy.contains('Reset your password').should('be.visible');
    cy.get('input[placeholder="you@example.com"]').type('testing@veritex.com');
    cy.contains('button', 'Send Reset Link').click();

    cy.contains('Reset link sent. Check your inbox and return to sign in.').should('be.visible');
  });
});
