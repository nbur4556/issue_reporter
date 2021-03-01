describe('Url Navigation', () => {
    // Should equal root url
    it('visit workbench url', () => {
        cy.visit('/workbench')
        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    });

    // Should equal create issue page url
    it('visit create issue url', () => {
        cy.visit('/create-issue');
        cy.url().should('eq', Cypress.config().baseUrl + '/create-issue');
    });
});

describe('Link Navigation', () => {
    // Should equal create issue page url
    it('dashboard to create issue link', () => {
        cy.visit('/workbench');
        cy.contains('Create Issue').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/create-issue');
    });

    // Should equal root url
    it('create issue to dashboard link', () => {
        cy.visit('/create-issue');
        cy.contains('Back To Workbench').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    })
});