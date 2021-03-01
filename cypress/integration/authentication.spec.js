describe('Register User', () => {
    const successMsg = 'Success! User created.';
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
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.password);
            cy.get('input[name="confirmPassword"]').type(data.password);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(successMsg).should('exist');
        });
    });

    // Password requirements not met
    it('register new user with short password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.shortPassword);
            cy.get('input[name="confirmPassword"]').type(data.shortPassword);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    })

    it('register new user with no caps', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.passwordNoCaps);
            cy.get('input[name="confirmPassword"]').type(data.passwordNoCaps);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    })

    it('register new user with no lower case letter', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.passwordNoLower);
            cy.get('input[name="confirmPassword"]').type(data.passwordNoLower);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    })

    it('register new user with no number', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.passwordNoNum);
            cy.get('input[name="confirmPassword"]').type(data.passwordNoNum);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    })

    // Do not include username
    it('attempt register without username', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="password"]').type(data.password);
            cy.get('input[name="confirmPassword"]').type(data.password);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    });

    // Do not include password
    it('attempt register without password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="confirmPassword"]').type(data.password);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    });

    // Do not include confirm password
    it('attempt register without confirm password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.password);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    });

    // Password and confirm password do not match
    it('register new user with non matching password and confirm password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.passwordMisspelled);
            cy.get('input[name="confirmPassword"]').type(data.password);
            cy.get('button[name="submit"]')
                .click()
                .wait('@userData')
                .then((xhr) => {
                    userId = xhr.response.body._id;
                });

            cy.contains(errorMsg).should('exist');
        });
    });
});

describe('Authenticate User', () => {
    // Login Successful

    // Login Failed
});