const projectName = "Project Name";
const projectNameEdited = "Edited Name";
let projectId;

describe("Create project", () => {
    const successMsg = 'Success';
    const errorMsg = 'Error';

    beforeEach(() => {
        cy.login().then(() => {
            cy.visit('/workbench');
            cy.get('button[data-cy="create-project"]').click();
            cy.intercept('/api/project').as('projectData');
        });
    });

    afterEach(() => {
        if (projectId) cy.deleteProject(localStorage.getItem('authToken'), projectId);
        cy.logout();
    });

    // Successfully create project with all information
    it('create project with name', () => {
        cy.get('input[data-cy="projectName"]').type(projectName);
        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@projectData')
            .then((xhr) => {
                projectId = xhr.response.body._id;
            });

        cy.get('p[data-cy="result-msg"]').contains(successMsg).should('exist');
        cy.get('p[data-cy="result-msg"]').contains(errorMsg).should('not.exist');
    });

    // Attempt create project without a project name
    it('attempt create project without name', () => {
        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@projectData')
            .then((xhr) => {
                projectId = xhr.response.body._id
            });

        cy.get('p[data-cy="result-msg"]').contains(successMsg).should('not.exist');
        cy.get('p[data-cy="result-msg"]').contains(errorMsg).should('exist');
    });
});

describe('Update Project', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then((data) => {
            projectId = data.body._id
            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
        });
    });

    afterEach(() => {
        cy.deleteProject(localStorage.getItem('authToken'), projectId);
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
    const deleteMessage = "Are you sure you want to delete this project?";

    beforeEach(() => {
        cy.login().then((data) => {
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then((data) => {
            projectId = data.body._id
            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="delete-project"]').click();
        });
    });

    afterEach(() => {
        if (projectId) cy.deleteProject(localStorage.getItem('authToken'), projectId);
        cy.logout();
    });

    // Project should no longer exist
    it("confirm delete project", () => {
        cy.get('button[data-cy="confirmDelete"]').click();
        cy.get('ul[data-cy="project-manager-list"]').contains(projectName).should('not.exist');
        cy.get('ul[data-cy="project-manager-list"]').contains(deleteMessage).should('not.exist');
    });

    it("reject delete project", () => {
        cy.get('button[data-cy="cancelDelete"]').click();
        cy.get('ul[data-cy="project-manager-list"]').contains(projectName).should('exist');
        cy.get('ul[data-cy="project-manager-list"]').contains(deleteMessage).should('not.exist');
    });
});