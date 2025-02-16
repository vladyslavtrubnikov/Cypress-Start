// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, password) => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
    cy.get('button').contains('Sign In').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password, { sensitive: true });
    cy.get('button').contains('Login').click();
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      options.log = false;
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }
    return originalFn(element, text, options);
  });

// Cypress.Commands.add('createExpense', (carId, amount, date) => {
//     cy.request({
//         method: 'POST',
//         url: `${Cypress.config('baseUrl')}/api/expenses`,
//         headers: { Authorization: `Bearer ${Cypress.env('token')}` },
//         body: {
//             carId: carId,
//             amount: amount,
//             date: date
//         }
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body.data.carId).to.eq(carId);
//         expect(response.body.data.amount).to.eq(amount);
//         expect(response.body.data.date).to.eq(date);
//         cy.wrap(response.body.data.id).as('expenseId'); // Збереження ID витрати
//     });
// });
Cypress.Commands.add('createExpense', (carId, amount, date) => {
  const token = Cypress.env('authToken');
  expect(token).to.exist; // Перевіряємо, що токен є
  cy.log(`Using Auth Token: ${token}`); // Виводимо токен у лог
  cy.request({
      method: 'POST',
      url: Cypress.config('baseUrl') + '/api/expenses',
      headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
      },
      body: {
          carId: carId,
          amount: amount,
          date: date
      }
  });
});

Cypress.Commands.add('login', () => {
  cy.request({
      method: 'POST',
      url: Cypress.config('baseUrl') + '/api/auth/signin',
      body: {
          email: Cypress.env('email'),
          password: Cypress.env('password')
      }
  }).then((response) => {
      Cypress.env('authToken', response.body.accessToken); 
      cy.log(`Auth Token: ${Cypress.env('authToken')}`); 
      console.log("Auth Token:", Cypress.env('authToken'));
  });
});
