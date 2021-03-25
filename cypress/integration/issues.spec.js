const projectName = 'projectName'

describe('Create Issue', () => {
    let projectId;

    beforeEach(() => {
        cy.login().then(({ body }) => {
            // Create Project
            cy.request({
                method: 'POST',
                url: 'api/project',
                body: {
                    projectName: projectName
                },
                headers: { authorization: `Bearer ${body.authToken}` }
            }).then(data => projectId = data.body._id);

            cy.visit('/workbench');
        });
    });

    afterEach(() => {
        // Delete Project
        cy.request({
            method: 'DELETE',
            url: `api/project/${projectId}`,
            headers: { authorization: `Bearer ${localStorage.getItem('authToken')}` }
        });

        cy.logout();
    });

    it('create issue with all information', () => {
        console.log('test');
    });

    it('create issue without body', () => {
        console.log('test');
    });

    it('create issue without category', () => {
        console.log('test');
    });

    it('create issue without due date', () => {
        console.log('test');
    });

    it('submit form without name does not create issue', () => {
        console.log('test');
    });

    it('submit empty form does not create issue', () => {
        console.log('test');
    });
});

// Delete Issue Tests
describe('Delete Issue', () => {
    beforeEach(() => {
        cy.login();

        cy.visit('/workbench');
    });

    afterEach(() => {
        cy.logout();
    });

    // Check cancel delete button does not delete issue
    it('click no on delete confirmation does not delete issue', () => {
        console.log('test');
    });

    // Check that issue is removed when clicked yes
    it('click yes on delete confirmation deletes issue', () => {
        console.log('test');
    });
});