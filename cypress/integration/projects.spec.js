const projectName = "Project Name";

describe("Create project", () => {
    const successMsg = `Success! Issue "${projectName}" created.`;
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.request('POST', `/api/user/${Cypress.env('cyUsername')}`, {
            username: Cypress.env('cyUsername'),
            password: Cypress.env('cyPassword')
        }).then(({ body }) => {
            localStorage.setItem('authToken', body.authToken);
        });

        cy.visit('/create-project');
        cy.intercept('/api/project').as('projectData');
    });

    afterEach(() => {
        localStorage.removeItem('authToken');
        if (testId) {
            cy.request('DELETE', `/api/project/${testId}`);
        }
    });

    // Successfully create projet with all information
    it('create project with name', () => {
        cy.get('input[name="projectName"]').type(projectName);
        cy.get('button[name="submit"]')
            .click()
            .wait('@projectData')
            .then((xhr) => {
                testId = xhr.response.body._id
            });
    });

    // Attempt create project without a project name
    it('attempt create project without name', () => {
        cy.get('button[name="submit"]')
            .click()
            .wait('@projectData')
            .then((xhr) => {
                testId = xhr.response.body._id
            });
    });
});