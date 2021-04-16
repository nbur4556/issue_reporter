describe('Url Navigation Authorized', () => {
    beforeEach(() => cy.login());
    afterEach(() => cy.logout());

    // Should equal root url
    it('visit landing url', () => {
        cy.visit('/');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    })

    // Should equal workbench url
    it('visit workbench url', () => {
        cy.visit('/workbench');
        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    });
});

describe('Url Navigation Unauthorized', () => {
    beforeEach(() => cy.logout());

    // All should equal base url
    it('attempt visit workbench url', () => {
        cy.visit('/workbench');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});

describe('Link Navigation', () => {
    beforeEach(() => cy.login());
    afterEach(() => cy.logout());

    it('dashboard logout link', () => {
        cy.visit('/workbench');
        cy.get('button[data-cy="logoutButton"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
});