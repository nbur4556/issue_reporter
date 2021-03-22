const issueName = 'Issue Name';
const description = 'Issue Description';
const category = 'Feature';
const dueDate = '2021-02-27';

// Create Issue Tests
describe('Create issue', () => {
    const successMessage = `Success! Issue "${issueName}" created.`;
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.login();

        cy.visit('/create-issue');
        cy.intercept('/api/issue').as('issueData');
    });

    afterEach(() => {
        if (testId) {
            cy.request('DELETE', `/api/issue/${testId}`);
        }
        cy.logout();
    });

    // Check that form with all information creates success message
    it('create issue with all information', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('exist');
    });

    // Check that form with required information creates success message
    it('create issue without body', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('exist');
    });

    it('create issue without category', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(description);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('exist');
    });

    it('create issue without due date', () => {
        cy.get('input[name="name"]').type(issueName);
        cy.get('input[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);

        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('exist');
    });

    // Check that form without name does not create success message
    it('submit form without name does not create issue', () => {
        cy.get('input[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('not.exist');
    });

    // Check that empty form does not create success message
    it('submit empty form does not create issue', () => {
        cy.get('button[data-cy="submit"]')
            .click()
            .wait('@issueData')
            .then((xhr) => {
                testId = xhr.response.body._id;
            });

        cy.contains(successMessage).should('not.exist');
    });
});

// Update Issue Tests
// describe('Update Issue', () => {

// });

// Delete Issue Tests
describe('Delete Issue', () => {
    const deleteConfirmationMsg = "Are you sure you want to delete this issue? This can not be undone."
    let testId;

    beforeEach(() => {
        // Login with cypress test credentials
        cy.login();

        cy.visit('/workbench');
        cy.request('POST', '/api/issue', { name: issueName }).then(({ body }) => {
            testId = body._id;
        });

        cy.get('.issueListSection').contains(issueName).click();
        cy.get('button[name="deleteIssue"]').click();
    });

    afterEach(() => {
        if (testId) {
            cy.request('DELETE', `/api/issue/${testId}`);
        }
        cy.logout();
    });

    // Check cancel delete button does not delete issue
    it('click no on delete confirmation does not delete issue', () => {
        cy.get('button[name="cancelDelete"]').click();

        cy.contains(deleteConfirmationMsg).should('not.exist');
        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueName).should('exist');
    });

    // Check that issue is removed when clicked yes
    it('click yes on delete confirmation deletes issue', () => {
        cy.get('button[name="confirmDelete"]').click();

        cy.contains(deleteConfirmationMsg).should('not.exist');
        cy.get('button[name="confirmDelete"]').should('not.exist');
        cy.get('button[name="cancelDelete"]').should('not.exist');

        cy.get('.issueListSection').contains(issueName).should('not.exist');
    });
});