const projectName = 'projectName';

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
            const issueList = [
                { name: 'Issue 1', category: 'feature', dueDate: '01/02/2021' },
                { name: 'Issue 2', category: 'bug', dueDate: '01/01/2021' },
                { name: 'Issue 3', category: 'feature', dueDate: '01/03/2021' }
            ]

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

    it('Deselect Issue 1', () => {
        cy.get('li').contains("Issue 1").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'inactive-issue');
    });

    it('Select Issue 2', () => {
        cy.get('li').contains("Issue 2").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 2").parent().should('have.class', 'active-issue');
        cy.get('li').contains("Issue 3").parent().should('have.class', 'inactive-issue');
    });

    it('Deselect Issue 2', () => {
        cy.get('li').contains("Issue 2").click();
        cy.get('li').contains("Issue 2").parent().should('have.class', 'inactive-issue');
    });

    it('Select Issue 3', () => {
        cy.get('li').contains("Issue 3").click();
        cy.get('li').contains("Issue 1").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 2").parent().should('have.class', 'inactive-issue');
        cy.get('li').contains("Issue 3").parent().should('have.class', 'active-issue');
    });

    it('Deselect Issue 3', () => {
        cy.get('li').contains("Issue 3").click();
        cy.get('li').contains("Issue 3").parent().should('have.class', 'inactive-issue');
    });

    // Close Issue
    it('Close Issue', () => {
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.contains('Issue 1').should('not.exist');
        cy.contains('Issue 2').should('exist');
        cy.contains('Issue 3').should('exist');
    });

    it('Open Issue', () => {
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.get('section[class="tool-bar-controls"]').children('label').click();
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.get('section[class="tool-bar-controls"]').children('label').click();
        cy.contains('Issue 1').should('exist');
    });

    it('Show Closed Issues', () => {
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.get('section[class="tool-bar-controls"]').children('label').click();
        cy.contains('Issue 1').should('exist');
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').children('input').should('be.checked');
    });

    it('Hide Closed Issues', () => {
        cy.get('li').contains("Issue 1").parent().children('li[class="status-col"]').children('label').click();
        cy.get('section[class="tool-bar-controls"]').children('label').click().click();
        cy.contains('Issue 1').should('not.exist');
    });

    // Sort Issues
    it('Sort By Name Ascending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="name-col"]').click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 1, Issue 2, Issue 3")
        });
    });

    it('Sort By Name Descending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="name-col"]').click().click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 3, Issue 2, Issue 1")
        });
    });

    it('Sort By Category Ascending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="category-col"]').click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 2, Issue 3, Issue 1")
        });
    });

    it('Sort By Category Descending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="category-col"]').click().click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 1, Issue 3, Issue 2")
        });
    });

    it('Sort By Due Date Ascending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="due-date-col"]').click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 2, Issue 1, Issue 3")
        });
    });

    it('Sort By Due Date Descending', () => {
        cy.get('ul[class="issue-bar header-bar"]').children('li[class="due-date-col"]').click().click();
        cy.get('section[class="issueListSection"]').then(listSection => {
            const issueBars = listSection[0].children;
            const orderedString = `${issueBars[1].children[0].innerHTML}, ${issueBars[2].children[0].innerHTML}, ${issueBars[3].children[0].innerHTML}`
            cy.wrap(orderedString).should("equal", "Issue 3, Issue 1, Issue 2")
        });
    });
});

describe('Detail Section', () => {
    let authToken;
    let projectId;

    beforeEach(() => {
        cy.login().then((data) => {
            authToken = data.body.authToken;
            return cy.createProject(data.body.authToken, { name: projectName });
        }).then((data) => {
            projectId = data.body._id;

            // Create Issues
            const issueList = { name: 'Issue 1', category: 'feature', dueDate: '01/02/2021' }
            cy.createIssue(localStorage.getItem('authToken'), { ...issueList, projectId: projectId });

            cy.visit('/workbench');
            cy.get('button[data-cy="project-manager"]').click();
        });
    });

    afterEach(() => {
        cy.deleteProject(authToken, projectId);
        cy.logout();
    });

    // Project Manager
    it('Open Project Manager', () => {
        cy.get('section[data-cy="detail-section"]').contains('Project Manager').should('exist');
    });

    it('Close Project Manager', () => {
        cy.get('button[data-cy="close-project-manager"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Project Manager').should('not.exist');
    });

    it('Open Tab', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('section[class="tab-bar"]').contains('projectName').should('exist');
    });

    it('Close Tab', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('button[data-cy="close-tab"]').click();
        cy.get('section[class="tab-bar"]').contains('projectName').should('not.exist');
    });

    it('Delete Project Message', () => {
        cy.get('button[data-cy="delete-project"]').click();
        cy.contains('Are you sure you want to delete this project? This can not be undone.').should('exist');
    });

    // Create Project
    it('Open Create Project', () => {
        cy.get('button[data-cy="create-project"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Create Project').should('exist');
    });

    it('Close Create Project', () => {
        cy.get('button[data-cy="create-project"]').click();
        cy.get('button[data-cy="cancel"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Project Manager').should('exist');
    });

    // Edit Project
    it('Open Edit Project', () => {
        cy.contains('Edit').click();
        cy.get('section[data-cy="detail-section"]').contains('Project Manager').should('exist');
        cy.get('input[data-cy="edit-field"]').should('exist');
    });

    it('Close Edit Project', () => {
        cy.contains('Edit').click();
        cy.get('button[data-cy="cancel"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Project Manager').should('exist');
        cy.get('input[data-cy="edit-field"]').should('not.exist');
    });

    // Create Issue
    it('Open Create Issue', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('button[data-cy="create-issue"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Create Issue').should('exist');
    });

    it('Close Create Issue', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('button[data-cy="create-issue"]').click();
        cy.get('button[data-cy="cancel"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Create Issue').should('not.exist');
    });

    // Issue Details
    it('Open Issue Details', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('li').contains("Issue 1").click();
        cy.get('section[data-cy="detail-section"]').contains('Issue Details').should('exist');
    });

    it('Close Issue Details', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('li').contains("Issue 1").click().click();
        cy.get('section[data-cy="detail-section"]').contains('Issue Details').should('not.exist');
    });

    it('Delete Issue Message', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('li').contains("Issue 1").click();
        cy.get('button[data-cy="delete-issue"]').click();
        cy.contains('Are you sure you want to delete this issue? This can not be undone.').should('exist');
    });

    // Edit Issue
    it('Open Edit Issue', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('li').contains("Issue 1").click();
        cy.get('button[data-cy="edit-issue"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Issue Details').should('exist');
        cy.get('input[data-cy="name"]').should('exist');
        cy.get('input[data-cy="body"]').should('exist');
        cy.get('select[data-cy="category"]').should('exist');
    });

    it('Close Edit Issue', () => {
        cy.get('button[data-cy="add-tab"]').click();
        cy.get('li').contains("Issue 1").click();
        cy.get('button[data-cy="edit-issue"]').click();
        cy.get('button[data-cy="cancel"]').click();
        cy.get('section[data-cy="detail-section"]').contains('Issue Details').should('exist');
        cy.get('input[data-cy="name"]').should('not.exist');
        cy.get('input[data-cy="body"]').should('not.exist');
        cy.get('select[data-cy="category"]').should('not.exist');
    });
});