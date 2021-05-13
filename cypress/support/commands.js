// Login to credentials in cypress environment variables
Cypress.Commands.add("login", () => {
    // Login with cypress test credentials
    return cy.request('POST', `/api/user/${Cypress.env('cyUsername')}`, {
        username: Cypress.env('cyUsername'),
        password: Cypress.env('cyPassword')
    }).then(({ body }) => {
        localStorage.setItem('authToken', body.authToken);
    });
});

// Remove auth token from local storage
Cypress.Commands.add("logout", () => {
    localStorage.removeItem('authToken');
});

// Create a project
Cypress.Commands.add("createProject", (authToken, projectData) => {
    cy.request({
        method: 'POST',
        url: 'api/project',
        body: {
            projectName: projectData.name
        },
        headers: { authorization: `Bearer ${authToken}` }
    })
});

Cypress.Commands.add("deleteProject", (authToken, projectId) => {
    cy.request({
        method: 'DELETE',
        url: `api/project/${projectId}`,
        headers: { authorization: `Bearer ${authToken}` }
    });
});

Cypress.Commands.add("createIssue", (authToken, issueData) => {
    cy.request({
        method: 'POST',
        url: 'api/issue',
        body: {
            name: issueData.name,
            category: issueData.category,
            dueDate: issueData.dueDate,
            selectProject: issueData.projectId
        },
        headers: { authorization: `Bearer ${authToken}` }
    })
})

Cypress.Commands.add("deleteIssue", (authToken, projectId) => {
    cy.request({
        method: 'GET',
        url: `api/issue/byProject/${projectId}`,
        headers: { authorization: `Bearer ${authToken}` }
    }).then(data => {
        if (data.body?.issues[0]) {
            cy.request({
                method: 'DELETE',
                url: `api/issue/${data.body.issues[0]._id}`,
                body: { selectProject: projectId },
                headers: { authorization: `Bearer ${authToken}` }
            })
        }
    });
})
