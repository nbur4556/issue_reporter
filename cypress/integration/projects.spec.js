const projectName = "Project Name";
const projectNameEdited = "Edited Name";

describe("Create project", () => {
    const successMsg = `Success! Issue "${projectName}" created.`;
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.login();
        cy.visit('/create-project');
        cy.intercept('/api/project').as('projectData');
    });

    afterEach(() => {
        if (testId) {
            cy.request({
                method: 'DELETE',
                url: `/api/project/${testId}`,
                auth: {
                    bearer: localStorage.getItem('authToken')
                }
            });
        }

        cy.logout();
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

describe('Update Project', () => {
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.login().then(({ body }) => {
            // Create project on login
            cy.request({
                method: 'POST',
                url: '/api/project',
                headers: {
                    Authorization: 'Bearer ' + body.authToken
                },
                body: {
                    projectName: projectName
                }
            }).then(({ body }) => {
                testId = body._id;
            });
        });

        cy.visit('/workbench');
        cy.get('button').contains('Toggle Project Manager').click();
    });

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `/api/project/${testId}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('authToken')
            }
        });
        cy.logout();
    });

    it('edit project with all data', () => {
        cy.get('button[data-cy="edit-project"]').click();
        cy.get('input[data-cy="edit-field"]').type(projectNameEdited);
        cy.get('button[data-cy="submit-edit"]').click();
        cy.get('ul[data-cy="project-manager-list"]').contains(projectNameEdited).should('exist');
        cy.get('ul[data-cy="project-manager-list"]').contains(projectName).should('not.exist');
    });

    it('attempt edit project without name', () => {
        cy.get('button[data-cy="edit-project"]').click();
        cy.get('button[data-cy="submit-edit"]').click();
        cy.get('ul[data-cy="project-manager-list"]').contains(projectNameEdited).should('not.exist');
        cy.get('ul[data-cy="project-manager-list"]').contains(projectName).should('exist');
    });
});

describe('Delete Project', () => {
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.login().then(({ body }) => {
            // Create project on login
            cy.request({
                method: 'POST',
                url: '/api/project',
                headers: {
                    Authorization: 'Bearer ' + body.authToken
                },
                body: {
                    projectName: projectName
                }
            }).then(({ body }) => {
                testId = body._id;
            });
        });

        cy.visit('/workbench');

        cy.get('button').contains('Toggle Project Manager').click();
    });

    afterEach(() => {
        if (testId) {
            cy.request({
                method: 'DELETE',
                url: `/api/project/${testId}`,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken')
                }
            });
        }
        cy.logout();
    });

    // Project should no longer exist
    it("successfully delete a project", () => {
        cy.get('button[data-cy="delete-project"]').click();
        cy.get('ul[data-cy="project-manager-list"]').contains(projectName).should('not.exist');
    });
});