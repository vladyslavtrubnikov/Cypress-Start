import GaragePage from "../../support/garage_expensesPages/garagePage";
import expensesPage from "../../support/garage_expensesPages/expensesPage";

const garage = new GaragePage();
const expenses = new expensesPage();

describe('Garage and Expenses tests', () => {

  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
    cy.get('.header_right > .btn').click();
    cy.get('input[name="email"]').type(Cypress.env('email'));
    cy.get('input[name="password"]').type(Cypress.env('password'));
    cy.get('.modal-footer > .btn-primary').click();
    cy.url().should('include', '/panel/garage');
  });

  it('Should successfully log in', () => {
    cy.url().should('not.include', '/login');
  });

  it('Should add a car and then add fuel expenses', function () { 
    
    garage.visit();
    garage.addCar('Porsche', 'Panamera', '5000');

    // Отримання ID створеного авто
    cy.get('@createdCarId').then((carId) => {
      cy.request({
        method: 'GET',
        url: Cypress.config('baseUrl') + '/api/cars',
        
      }).then((response) => {
        expect(response.status).to.eq(200);
        const createdCar = response.body.data.find(car => car.id === carId);
        expect(createdCar).to.exist;
        expect(createdCar.brand).to.eq('Porsche');
        expect(createdCar.model).to.eq('911');
      });
    });

    // Додавання витрат на паливо через UI
    expenses.visit();
    expenses.addExpense('10000', '1400', '50000');
    cy.log('Created Car ID:', Cypress.env('createdCarId'));
  });

  it('Should create an expense via API', function () {
    cy.login().then(() => { // Дочекатися логіну
        cy.wait(1000);
        const carId = Cypress.env('createdCarId');
        const token = Cypress.env('authToken');

        cy.log(`Car ID: ${carId}`);
        cy.log(`Auth Token: ${token}`);

        expect(carId).to.exist;
        expect(token).to.exist; // Переконуємося, що токен отримано

        cy.createExpense(carId, 100, '2024-02-16').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.amount).to.eq(100);
        });
    });
});


});
