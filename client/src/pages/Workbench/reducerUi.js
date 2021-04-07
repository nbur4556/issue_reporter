const ACTIONS = {
    TOGGLE_PROJECT_MANAGER: 'toggle_project_manager',
    TOGGLE_CREATE_ISSUE: 'toggle_create_issue',
    ADD_PROJECT_TAB: 'add_project_tab',
    REMOVE_PROJECT_TAB: 'remove_project_tab',
    SELECT_PROJECT: 'select_project',
    SELECT_ISSUE: 'select_issue',
    DISPLAY_CLOSED_ISSUES: 'display_closed_issues'
}

const addProjectTab = (state, { projectId, projectList }) => {
    const selectProjectId = (state.projectTabs.length === 0) ? projectId : state.selectProject;

    // Check if tab exists
    for (const tab of state.projectTabs) {
        if (tab._id === projectId) return;
    }

    // Find project in project list
    projectList.forEach((project) => {
        if (project._id === projectId)
            return { ...state, projectTabs: [...state.projectTabs, project], selectProject: selectProjectId }
        else
            return state;
    });
}

const reducerUi = (state, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_PROJECT_MANAGER:
            return (state.displayProjectManager === true)
                ? { ...state, displayProjectManager: false }
                : { ...state, displayProjectManager: true, displayCreateIssue: false, selectIssue: null };
        case ACTIONS.TOGGLE_CREATE_ISSUE:
            return (state.displayCreateIssue === true)
                ? { ...state, displayCreateIssue: false }
                : { ...state, displayCreateIssue: true, displayProjectManager: false, selectIssue: null };
        case ACTIONS.ADD_PROJECT_TAB:
            return addProjectTab(state, action.payload);;
        case ACTIONS.REMOVE_PROJECT_TAB:
            return state;
        case ACTIONS.SELECT_PROJECT:
            return state;
        case ACTIONS.SELECT_ISSUE:
            return (state.selectIssue)
                ? { ...state, selectIssue: null }
                : { ...state, selectIssue: action.payload.selectIndex, displayProjectManager: false, displayCreateIssue: false };
        case ACTIONS.DISPLAY_CLOSED_ISSUES:
            return state;
        default:
            return state;
    }
}

export default reducerUi;