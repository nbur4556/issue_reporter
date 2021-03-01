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
    it('attempt register with short password', () => {
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

    it('attempt register with no caps', () => {
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

    it('attempt register with no lower case letter', () => {
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

    it('attempt register with no number', () => {
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
    it('attempt register with non matching password and confirm password', () => {
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
    const successMsg = 'Success! Login successful.';
    const errorMsg = 'Error: Login not successful.';
    let userId;

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('userData.json').then((data) => {
            cy.request('POST', '/api/user', {
                username: data.username,
                password: data.password,
                confirmPassword: data.password
            }).then(result => {
                userId = result.body._id;
            });
        });
        cy.get('button[name="loginActive"]').click();
    });

    afterEach(() => {
        cy.request('DELETE', `api/user/${userId}`);
    });

    // Login Successful
    it('login with correct credentials', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.password);
            cy.get('button[name="submit"]').click();

            cy.contains(successMsg).should('exist');
        });
    });

    // Login Failed
    it('attempt login with incorrect password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('input[name="password"]').type(data.passwordMisspelled);
            cy.get('button[name="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    it('attempt login with incorrect username', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.usernameMisspelled);
            cy.get('input[name="password"]').type(data.password);
            cy.get('button[name="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    it('attempt login without a username', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="username"]').type(data.username);
            cy.get('button[name="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });

    it('attempt login without a password', () => {
        cy.fixture('userData.json').then((data) => {
            cy.get('input[name="password"]').type(data.password);
            cy.get('button[name="submit"]').click();

            cy.contains(errorMsg).should('exist');
        });
    });
});