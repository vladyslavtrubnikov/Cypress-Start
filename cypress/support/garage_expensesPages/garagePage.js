export default class GaragePage {
  visit() {
      cy.visit('/panel/garage');

      
      // cy.intercept('GET', '**/api/cars').as('getCars');
      // cy.wait('@getCars');

      cy.url().should('include', '/panel/garage');
  }

  addCar(brand, model, mileage) {
      cy.intercept('POST', '**/api/cars').as('addCar'); 

      cy.get('.panel-page_heading > .btn').should('be.visible').click();
      cy.get('.modal-body').should('be.visible');
      cy.get('#addCarBrand').select(brand);
      cy.get('#addCarModel').type(model);
      cy.get('input[name="mileage"]').type(mileage);
      cy.get('.modal-footer > .btn-primary').click();

      cy.wait('@addCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        const carId = interception.response.body.data.id;
        expect(carId).to.exist;
        
        Cypress.env('createdCarId', carId);
        cy.wrap(carId).as('createdCarId'); // Зберігаємо ID
        cy.log('Saved car ID:', carId); // Додано для перевірки
    });
  }
}
