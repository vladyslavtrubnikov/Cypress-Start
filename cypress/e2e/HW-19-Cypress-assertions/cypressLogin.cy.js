describe('Регістрація та авторизація', () => {
    const newEmail = `test_user_${Date.now()}@mail.com`;
    const password = 'Test1234!';
  
    beforeEach(() => {
      cy.visit('https://guest:welcome2qauto@qauto.forstudy.space'); // Відкриваємо сайт перед кожним тестом
    });
  
    it('Регистрація нового юзера', () => {
      cy.get('.hero-descriptor_btn').should('exist').and('be.visible').click();
      cy.get('.modal-body').should('be.visible');
      cy.get('#signupName').type('Test');
      cy.get('#signupLastName').type('User');
      cy.get('#signupEmail').type(newEmail);
      cy.get('#signupPassword').type(password, { sensitive: true });
      cy.get('#signupRepeatPassword').type(password, { sensitive: true });
      cy.get('.modal-footer > .btn').contains('Register').click();
      cy.url().should('include', '/panel');
      cy.get('h1').should('contain', 'Garage');
    });
  
    
  
    it('Авторизація під новим юзером', () => {
      cy.login(newEmail, password);
  
      cy.url().should('include', '/panel');
      cy.get('h1').should('contain', 'Garage');
    });
  });