const issueName = 'Issue Name';
const description = 'Issue Description';
const category = 'Feature';
const dueDate = '2021-02-27';

// Create Issue Tests
describe('Create issue', () => {
    const successMessage = `Success! Issue "${issueName}" created.`;

    beforeEach(() => {
        cy.visit('/create-issue');
    });

    // Check that form with all information creates success message
    // it('create issue with all information', () => {
    //     cy.get('input[name="name"]').type(issueName);
    //     cy.get('textarea[name="body"]').type(description);
    //     cy.get('select[name="category"]').select(category);
    //     cy.get('input[name="dueDate"]').type(dueDate);

    //     cy.get('button[name="submit"]').click().then((data) => {
    //         console.log(data);
    //     });

    //     cy.contains(successMessage).should('exist');
    // });

    // // Check that form without required information creates success message
    // it('create issue without body', () => {
    //     cy.get('input[name="name"]').type(name);
    //     cy.get('select[name="category"]').select(category);
    //     cy.get('input[name="dueDate"]').type(dueDate);

    //     cy.get('button[name="submit"]').click();
    //     cy.contains(successMessage).should('exist');
    // });

    // it('create issue without category', () => {
    //     cy.get('input[name="name"]').type(name);
    //     cy.get('textarea[name="body"]').type(description);
    //     cy.get('input[name="dueDate"]').type(dueDate);

    //     cy.get('button[name="submit"]').click();
    //     cy.contains(successMessage).should('exist');
    // });

    // it('create issue without due date', () => {
    //     cy.get('input[name="name"]').type(name);
    //     cy.get('textarea[name="body"]').type(description);
    //     cy.get('select[name="category"]').select(category);

    //     cy.get('button[name="submit"]').click();
    //     cy.contains(successMessage).should('exist');
    // });

    // // Check that form without name does not create success message
    // it('submit form without name does not create issue', () => {
    //     cy.get('textarea[name="body"]').type(description);
    //     cy.get('select[name="category"]').select(category);
    //     cy.get('input[name="dueDate"]').type(dueDate);

    //     cy.get('button[name="submit"]').click();
    //     cy.contains(successMessage).should('not.exist');
    // });

    // // Check that empty form does not create success message
    // it('submit empty form does not create issue', () => {
    //     cy.get('button[name="submit"]').click();
    //     cy.contains(successMessage).should('not.exist');
    // });
});

// Update Issue Tests
// describe('Update Issue', () => {

// });

// Delete Issue Tests
describe('Delete Issue', () => {
    const deleteConfirmationMsg = "Are you sure you want to delete this issue? This can not be undone."
    let testId;

    beforeEach(() => {
        cy.visit('/');

        cy.request('POST', '/api/issue', { name: issueName }).then(({ body }) => {
            testId = body._id;
        });

        cy.get('.issueListSection').contains(issueName).click();
        cy.get('button[name="deleteIssue"]').click();
    });

    afterEach(() => {
        cy.request('DELETE', `/api/issue/${testId}`);
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
    })
});