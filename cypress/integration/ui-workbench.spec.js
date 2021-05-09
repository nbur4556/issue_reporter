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

    it('Select Issue 1', () => {
        cy.get('li').contains("Issue 1").click();
    });
    it('Select Issue 2', () => {
        cy.get('li').contains("Issue 2").click();
    });
    it('Select Issue 3', () => {
        cy.get('li').contains("Issue 3").click();
    });
});