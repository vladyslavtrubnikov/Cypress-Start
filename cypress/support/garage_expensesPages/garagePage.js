// export default class GaragePage {
//     visit() {
//       cy.visit('/panel/garage');
//     }
  
//     addCar(brand, model, mileage) {
//       // cy.get('.btn btn-primary').click();
      

      
      
//       cy.get('input[name="brand"]').type(brand);
//       cy.get('input[name="model"]').type(model);
//       cy.get('input[name="mileage"]').type(mileage);
//       cy.get('button[type="submit"]').click();
//     }
//   }
  
  
export default class GaragePage {
  visit() {
      cy.visit('/panel/garage');

      // Очікуємо, поки сторінка оновиться після логіну
      cy.url().should('include', '/panel/garage');
  }

  addCar(brand, model, mileage) {
      
      cy.get('.panel-page_heading > .btn').click();
      cy.get('.modal-body').should('be.visible');
      cy.get('#addCarBrand').select(brand);
      cy.get('#addCarModel').type(model);
      cy.get('input[name="mileage"]').type(mileage);
      cy.get('.modal-footer > .btn-primary').click();
  }
}
