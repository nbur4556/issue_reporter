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

            const issueList = [{ name: 'Issue 1', ...issueData }, { name: 'Issue 2', ...issueData }, { name: 'Issue 3', ...issueData }]

            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[0], projectId: projectId });
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[1], projectId: projectId });
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList[2], projectId: projectId });

            cy.visit('/workbench');
        });
    });

    afterEach(() => {
        cy.deleteProject(authToken, projectId);
        cy.logout();
    });

    it('Select Issue', () => {
        console.log('select issue');
    });
});