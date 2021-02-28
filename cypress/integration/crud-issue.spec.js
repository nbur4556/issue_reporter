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
        cy.get('form').contains('Name:').type(name);
        cy.get('form').contains('Body:').type(description);
        cy.get('select').select(category);
        cy.get('form').contains('Due Date:').type(dueDate);

        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('exist');
    });

    // Check that form without required information creates success message
    it('create issue without body', () => {
        cy.get('form').contains('Name:').type(name);
        cy.get('select').select(category);
        cy.get('form').contains('Due Date:').type(dueDate);

        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('exist');
    });

    it('create issue without category', () => {
        cy.get('form').contains('Name:').type(name);
        cy.get('form').contains('Body:').type(description);
        cy.get('form').contains('Due Date:').type(dueDate);

        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('exist');
    });

    it('create issue without due date', () => {
        cy.get('form').contains('Name:').type(name);
        cy.get('form').contains('Body:').type(description);
        cy.get('select').select(category);

        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('exist');
    });

    // Check that form without name does not create success message
    it('submit form without name does not create issue', () => {
        cy.get('form').contains('Body:').type(description);
        cy.get('select').select(category);
        cy.get('form').contains('Due Date:').type(dueDate);

        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('not.exist');
    });

    // Check that empty form does not create success message
    it('submit empty form does not create issue', () => {
        cy.get('form').contains('Submit').click();
        cy.contains(successMessage).should('not.exist');
    });
});