const projectName = 'projectName';
const issueData = {
    name: 'issueName',
    body: 'issueDescription',
    category: 'Feature',
    dueDate: '2021-02-27'
}

let projectId

// Create Issue Test
describe('Create Issue', () => {
    beforeEach(() => {
        cy.intercept('api/issue').as('issueData');
        cy.login().then((data) => {
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then(data => {
            projectId = data.body._id;
            cy.visit('/workbench');

            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="add-tab"]').click();
            cy.get('button[data-cy="create-issue"]').click();
        });
    });

    afterEach(() => {
        cy.deleteIssue(localStorage.getItem('authToken'), projectId);
        cy.deleteProject(localStorage.getItem('authToken'), projectId);
        cy.logout();
    });

    it('create issue with all information', () => {
        cy.get('input[name="name"]').type(issueData.name);
        cy.get('input[name="body"]').type(issueData.body);
        cy.get('select[name="category"]').select(issueData.category);
        cy.get('input[name="dueDate"]').type(issueData.dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('exist');
    });

    it('create issue without body', () => {
        cy.get('input[name="name"]').type(issueData.name);
        cy.get('select[name="category"]').select(issueData.category);
        cy.get('input[name="dueDate"]').type(issueData.dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('exist');
    });

    it('create issue without category', () => {
        cy.get('input[name="name"]').type(issueData.name);
        cy.get('input[name="body"]').type(issueData.body);
        cy.get('input[name="dueDate"]').type(issueData.dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('exist');
    });

    it('create issue without due date', () => {
        cy.get('input[name="name"]').type(issueData.name);
        cy.get('input[name="body"]').type(issueData.body);
        cy.get('select[name="category"]').select(issueData.category);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('exist');
    });

    it('submit form without name does not create issue', () => {
        cy.get('input[name="body"]').type(issueData.body);
        cy.get('select[name="category"]').select(issueData.category);
        cy.get('input[name="dueDate"]').type(issueData.dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('not.exist');
    });

    it('submit empty form does not create issue', () => {
        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueData.name).should('not.exist');
    });
});

// Delete Issue Tests
describe('Delete Issue', () => {
    beforeEach(() => {
        cy.intercept('api/issue').as('issueData');

        cy.login().then((data) => {
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then(data => {
            projectId = data.body._id;
            return cy.createIssue(localStorage.getItem('authToken'), { ...issueData, projectId: data.body._id });
        }).then(() => {
            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="add-tab"]').click();
            cy.get('li').contains(issueData.name).click();
            cy.get('button[name="deleteIssue"]').click();
        });
    });

    afterEach(() => {
        cy.deleteIssue(localStorage.getItem('authToken'), projectId);
        cy.deleteProject(localStorage.getItem('authToken'), projectId);
        cy.logout();
    });

    // Check cancel delete button does not delete issue
    it('click no on delete confirmation does not delete issue', () => {
        cy.get('button[name="cancelDelete"]').click();

        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueData.name).should('exist');
    });

    // Check that issue is removed when clicked yes
    it('click yes on delete confirmation deletes issue', () => {
        cy.get('button[name="confirmDelete"]').click();

        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueData.name).should('not.exist');
    });
});