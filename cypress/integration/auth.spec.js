describe('Register User', () => {
    const errorMsg = 'Error: User not created.';
    let userId;

    beforeEach(() => {
        cy.visit('/');
        cy.intercept('/api/user').as('userData');
        cy.get('button[name="signupActive"]').click();
    });

    afterEach(() => {
        cy.request('DELETE', `api/user/${userId}`);
    });

    // Register User Successful
    it('register new user', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.password);
            cy.get('input[data-cy="confirmPassword"]').type(data.password);
            cy.get('button[data-cy="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    const authToken = xhr.response.body.authToken;

                    cy.request('GET', `/api/authenticate/${authToken}`).then(response => {
                        userId = response.body._id;
                    });
                });

            cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
        });
    });

    // Password requirements not met
    it('attempt register with short password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.shortPassword);
            cy.get('input[data-cy="confirmPassword"]').type(data.shortPassword);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    })

    it('attempt register with no caps', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.passwordNoCaps);
            cy.get('input[data-cy="confirmPassword"]').type(data.passwordNoCaps);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    })

    it('attempt register with no lower case letter', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.passwordNoLower);
            cy.get('input[data-cy="confirmPassword"]').type(data.passwordNoLower);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    })

    it('attempt register with no number', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.passwordNoNum);
            cy.get('input[data-cy="confirmPassword"]').type(data.passwordNoNum);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    })

    // Do not include username
    it('attempt register without username', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="password"]').type(data.password);
            cy.get('input[data-cy="confirmPassword"]').type(data.password);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    // Do not include password
    it('attempt register without password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="confirmPassword"]').type(data.password);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    // Do not include confirm password
    it('attempt register without confirm password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.password);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    // Password and confirm password do not match
    it('attempt register with non matching password and confirm password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[data-cy="username"]').type(data.username);
            cy.get('input[data-cy="password"]').type(data.passwordMisspelled);
            cy.get('input[data-cy="confirmPassword"]').type(data.password);
            cy.get('button[data-cy="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });
});

describe('Authenticate User', () => {
    const errorMsg = 'Error: Login not successful.';

    beforeEach(() => {
        cy.visit('/');
    });

    afterEach(() => cy.logout());

    // Login Successful
    it('login with correct credentials', () => {
        cy.get('input[data-cy="username"]').type(Cypress.env('cyUsername'));
        cy.get('input[data-cy="password"]').type(Cypress.env('cyPassword'));
        cy.get('button[data-cy="submit"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/workbench');
    });

    // Login Failed
    it('attempt login with incorrect password', () => {
        cy.get('input[data-cy="username"]').type(Cypress.env('cyUsername'));
        cy.get('input[data-cy="password"]').type(Cypress.env('cypPassword') + 'misspelled');
        cy.get('button[data-cy="submit"]').click();

        cy.contains(errorMsg).should('exist');
    });

    it('attempt login with incorrect username', () => {
        cy.get('input[data-cy="username"]').type(Cypress.env('cyUsername') + 'misspelled');
        cy.get('input[data-cy="password"]').type(Cypress.env('cyPassword'));
        cy.get('button[data-cy="submit"]').click();

        cy.contains(errorMsg).should('exist');
    });

    it('attempt login without a username', () => {
        cy.get('input[data-cy="username"]').type(Cypress.env('cyUsername'));
        cy.get('button[data-cy="submit"]').click();

        cy.contains(errorMsg).should('exist');
    });

    it('attempt login without a password', () => {
        cy.get('input[data-cy="password"]').type(Cypress.env('cyPassword'));
        cy.get('button[data-cy="submit"]').click();

        cy.contains(errorMsg).should('exist');
    });
});