
describe('Google Search with Cypress', () => {
    it('Types "Cypress" into the search input and presses Enter', () => {
      
      cy.visit('https://www.google.com');
      cy.get('textarea[name="q"]').type('Cypress{enter}');

    });
  });