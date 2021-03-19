// Login to credentials in cypress environment variables
Cypress.Commands.add("login", () => {
    // Login with cypress test credentials
    return cy.request('POST', `/api/user/${Cypress.env('cyUsername')}`, {
        username: Cypress.env('cyUsername'),
        password: Cypress.env('cyPassword')
    }).then(({ body }) => {
        localStorage.setItem('authToken', body.authToken);
    });
});

// Remove auth token from local storage
Cypress.Commands.add("logout", () => {
    localStorage.removeItem('authToken');
});
