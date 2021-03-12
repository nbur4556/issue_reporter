describe('Url Navigation Authorized', () => {
    beforeEach(() => {
        // Login with cypress test credentials
        cy.request('POST', `/api/user/${Cypress.env('cyUsername')}`, {
            username: Cypress.env('cyUsername'),
            password: Cypress.env('cyPassword')
        }).then(({ body }) => {
            localStorage.setItem('authToken', body.authToken);
        });
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
    });

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

    // Should equal create issue page url
    it('visit create issue url', () => {
        cy.visit('/create-issue');
        cy.url().should('eq', Cypress.config().baseUrl + '/create-issue');
    });

    // Should equal create project page url
    it('visit create project url', () => {
        cy.visit('/create-project');
        cy.url().should('eq', Cypress.config().baseUrl + '/create-project');
    });
});

describe('Url Navigation Unauthorized', () => {
    beforeEach(() => {
        localStorage.removeItem('authToken');
    });

    // All should equal base url
    it('attempt visit workbench url', () => {
        cy.visit('/workbench');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('attempt visit create issue url', () => {
        cy.visit('/create-issue');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('attempt visit create project url', () => {
        cy.visit('create-project');
        cy.url().should('eq', Cypress.config().baseUrl + '/');
    })
});

describe('Link Navigation', () => {
    beforeEach(() => {
        // Login with cypress test credentials
        cy.request('POST', `/api/user/${Cypress.env('cyUsername')}`, {
            username: Cypress.env('cyUsername'),
            password: Cypress.env('cyPassword')
        }).then(({ body }) => {
            localStorage.setItem('authToken', body.authToken);
        });
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
    });

    // Should equal create issue page url
    it('dashboard to create issue link', () => {
        cy.visit('/workbench');
        cy.contains('Create Issue').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/create-issue');
    });

    // Should equal create project url
    it('dashboard to create project link', () => {
        cy.visit('workbench');
        cy.contains('Create Project').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/create-project');
    });

    // Should equal root url
    it('create issue to dashboard link', () => {
        cy.visit('/create-issue');
        cy.contains('Back To Workbench').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    });

    it('create project to dashboard link', () => {
        cy.visit('/create-project');
        cy.contains('Back To Workbench').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    });
});