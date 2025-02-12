import GaragePage from "../../support/garage_expensesPages/garagePage";
import expensesPage from "../../support/garage_expensesPages/expensesPage";

const garage = new GaragePage()
const expenses = new  expensesPage()

describe('Garage and Expenses tests', () => {

  

  beforeEach(() => {
    
    cy.visit(Cypress.config('baseUrl'));
    cy.get('.header_right > .btn').click();
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('.modal-footer > .btn-primary').click();
    cy.url().should('include', '/panel/garage');
    
    
  });

  it('' , () => {
    cy.url().should('not.include', '/login');
  })

  it('Should add a car and then add fuel expenses', () => {
    
    //Створення автомобіля
    garage.visit();
    garage.addCar('Porsche', 'Panamera', '5000');

    // Додавання витрат на паливо
    expenses.visit();
    expenses.addExpense('10000', '1400', '50000');
    
  });
});
