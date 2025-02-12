export default class ExpensesPage {
    visit() {
      cy.visit('/panel/expenses');
    }
  
    addExpense(mileage, liters, cost) {
      cy.get('[routerlink="expenses"]').click();
      cy.get('.btn-primary').click();
      cy.get('input[name="mileage"]').clear()
      cy.get('input[name="mileage"]').type(mileage);
      cy.get('#addExpenseLiters').type(liters);
      cy.get('#addExpenseTotalCost').type(cost);
      cy.get('.modal-footer > .btn-primary').click();
    }
  }
  
  
  