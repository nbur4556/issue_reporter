const projectName = 'projectName';
const issueData = {
    body: 'Issue Description',
    category: 'Feature',
    dueDate: '2021-02-27'
}

describe("Issue List", () => {
    let authToken;
    let projectId;

    beforeEach(() => {
        cy.login().then((data) => {
            authToken = data.body.authToken;
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then((data) => {
            projectId = data.body._id;

            // Create Issues
            const issueList = [{ name: 'Issue 1', ...issueData }, { name: 'Issue 2', ...issueData }, { name: 'Issue 3', ...issueData }]
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[0], projectId: projectId });
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[1], projectId: projectId });
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[2], projectId: projectId });

            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
            cy.get('button[data-cy="add-tab"]').click();
        });
    });

    afterEach(() => {
        cy.deleteProject(authToken, projectId);
        cy.logout();
    });

    // Issue Selection
    it('Select Issue 1', () => {
        cy.get('li').contains("Issue 1").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'active-issue');
        cy.get('li').contains("Issue 2").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 3").parent().should('have.class', 'inactive-issue');
    });

    it('Select Issue 2', () => {
        cy.get('li').contains("Issue 2").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 2").parent().should('have.class', 'active-issue');
        cy.get('li').contains("Issue 3").parent().should('have.class', 'inactive-issue');
    });

    it('Select Issue 3', () => {
        cy.get('li').contains("Issue 3").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 2").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 3").parent().should('have.class', 'active-issue');
    });

    // Close Issue
    it('Close Issue', () => {
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.contains('Issue 1').should('not.exist');
        cy.contains('Issue 2').should('exist');
        cy.contains('Issue 3').should('exist');
    });
});