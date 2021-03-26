const projectName = 'projectName';
const issueName = 'issueName';
const issueDescription = 'issueDescription';
const category = 'Feature';
const dueDate = '2021-02-27';

// Create Issue Test
describe('Create Issue', () => {
    let projectId;

    beforeEach(() => {
        cy.intercept('api/issue').as('issueData');
        cy.login().then(({ body }) => {
            return cy.request({
                method: 'POST',
                url: 'api/project',
                body: {
                    projectName: projectName
                },
                headers: { authorization: `Bearer ${body.authToken}` }
            })
        }).then(data => {
            projectId = data.body._id;
            cy.visit('/workbench');

            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="add-tab"]').click();
            cy.get('button[data-cy="create-issue"]').click();
        });
    });

    afterEach(() => {
        cy.request({
            method: 'GET',
            url: `api/issue/byProject/${projectId}`,
            headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
        }).then(data => {
            if (data.body?.issues[0]) {
                cy.request({
                    method: 'DELETE',
                    url: `api/issue/${data.body.issues[0]._id}`,
                    body: { selectProject: projectId },
                    headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
                })
            }
        });

        cy.request({
            method: 'DELETE',
            url: `api/project/${projectId}`,
            headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        cy.logout();
    });

    it('create issue with all information', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(issueDescription);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    it('create issue without body', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    it('create issue without category', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(issueDescription);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    it('create issue without due date', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(issueDescription);
        cy.get('select[name="category"]').select(category);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    it('submit form without name does not create issue', () => {
        cy.get('input[name="body"]').type(issueDescription);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('not.exist');
    });

    it('submit empty form does not create issue', () => {
        cy.get('button[data-cy="submit"]').click();
        cy.get('.issueListSection').contains(issueName).should('not.exist');
    });
});

// Delete Issue Tests
describe('Delete Issue', () => {
    let projectId;

    beforeEach(() => {
        cy.intercept('api/issue').as('issueData');

        cy.login().then(({ body }) => {
            return cy.request({
                method: 'POST',
                url: 'api/project',
                body: {
                    projectName: projectName
                },
                headers: { authorization: `Bearer ${body.authToken}` }
            });
        }).then(data => {
            projectId = data.body._id;

            return cy.request({
                method: 'POST',
                url: 'api/issue',
                body: {
                    name: issueName,
                    selectProject: projectId
                },
                headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
            })
        }).then(() => {
            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="add-tab"]').click();
            cy.get('li').contains(issueName).click();
            cy.get('button[name="deleteIssue"]').click();
        });
    });

    afterEach(() => {
        cy.request({
            method: 'GET',
            url: `api/issue/byProject/${projectId}`,
            headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
        }).then(data => {
            if (data.body?.issues[0]) {
                cy.request({
                    method: 'DELETE',
                    url: `api/issue/${data.body.issues[0]._id}`,
                    body: { selectProject: projectId },
                    headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
                })
            }
        });

        cy.request({
            method: 'DELETE',
            url: `api/project/${projectId}`,
            headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        cy.logout();
    });

    // Check cancel delete button does not delete issue
    it('click no on delete confirmation does not delete issue', () => {
        cy.get('button[name="cancelDelete"]').click();

        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    // Check that issue is removed when clicked yes
    it('click yes on delete confirmation deletes issue', () => {
        cy.get('button[name="confirmDelete"]').click();

        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueName).should('not.exist');
    });
});