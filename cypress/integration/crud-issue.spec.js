// Create Issue Tests
describe('Create issue', () => {
    const name = 'Issue Name';
    const description = 'Issue Description';
    const category = 'Feature';
    const dueDate = '2021-02-27';
    const successMessage = `Success! Issue "${name}" created.`;

    beforeEach(() => {
        cy.visit('/create-issue');
    });

    // Check that form with all information creates success message
    it('create issue with all information', () => {
        cy.get('input[name="name"]').type(name);
        cy.get('textarea[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('exist');
    });

    // Check that form without required information creates success message
    it('create issue without body', () => {
        cy.get('input[name="name"]').type(name);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('exist');
    });

    it('create issue without category', () => {
        cy.get('input[name="name"]').type(name);
        cy.get('textarea[name="body"]').type(description);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('exist');
    });

    it('create issue without due date', () => {
        cy.get('input[name="name"]').type(name);
        cy.get('textarea[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);

        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('exist');
    });

    // Check that form without name does not create success message
    it('submit form without name does not create issue', () => {
        cy.get('textarea[name="body"]').type(description);
        cy.get('select[name="category"]').select(category);
        cy.get('input[name="dueDate"]').type(dueDate);

        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('not.exist');
    });

    // Check that empty form does not create success message
    it('submit empty form does not create issue', () => {
        cy.get('button[name="submit"]').click();
        cy.contains(successMessage).should('not.exist');
    });
});

