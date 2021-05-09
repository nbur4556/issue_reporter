const projectName = 'projectName';

describe("Issues", () => {
    let authToken;
    let projectId;

    beforeEach(() => {
        cy.login().then((data) => {
            authToken = data.body.authToken;
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then((data) => {
            projectId = data.body._id;
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