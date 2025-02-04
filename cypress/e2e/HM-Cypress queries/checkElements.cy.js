import { openLms } from "../../support/PageObject_LMS/OpenLMS";

const visitLMS = new  openLms();

describe('Перевірка сторінки авторізації LMS', () => {
    beforeEach(() => {
        visitLMS.visit('https://lms.ithillel.ua');
    });

    it('Перевірка всіх кнопок у хедері', () => {
        cy.get('main').within(() => {
            cy.get('button, a').each(($el) => {
                cy.wrap($el).should('be.visible');
            });
        });
    });

    it('Перевірка всіх посилань та кнопок у футері', () => {
        cy.get('footer').within(() => {
            cy.get('button, a').each(($el) => {
                cy.wrap($el).should('be.visible');
            });
        });
    });

    
    it('Клік по кнопці "Увійти"', () => {
        cy.contains('button', 'Увійти').click();
        cy.url().should('include', '/auth');
    });

    it('Перевірка обов’язкових полів "Пошта" та "Пароль"', () => {
        cy.contains('button', 'Увійти').click();
        cy.contains('Обов\'язкове поле').should('be.visible');
    });
    
});