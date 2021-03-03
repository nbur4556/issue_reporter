describe('Url Navigation Authorized', () => {
    let userId;

    beforeEach(() => {
        cy.fixture('userData.json').then((data) => {
            cy.request('POST', '/api/user', {
                username: data.username,
                password: data.password,
                confirmPassword: data.password
            }).then(result => {
                userId = result.body._id;
                cy.request('POST', `/api/user/${data.username}`, {
                    username: data.username,
                    password: data.password
                }).then(({ body }) => {
                    localStorage.setItem('authToken', body.authToken);
                });

            });
        });
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
        cy.request('DELETE', `/api/user/${userId}`)
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
});

describe('Link Navigation', () => {
    let userId;

    beforeEach(() => {
        cy.fixture('userData.json').then((data) => {
            cy.request('POST', '/api/user', {
                username: data.username,
                password: data.password,
                confirmPassword: data.password
            }).then(result => {
                userId = result.body._id;
                cy.request('POST', `/api/user/${data.username}`, {
                    username: data.username,
                    password: data.password
                }).then(({ body }) => {
                    localStorage.setItem('authToken', body.authToken);
                });

            });
        });
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
        cy.request('DELETE', `/api/user/${userId}`)
    });

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
    });
});