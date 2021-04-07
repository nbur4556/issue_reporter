const ACTIONS = {
    TOGGLE_PROJECT_MANAGER: 'toggle_project_manager',
    TOGGLE_CREATE_ISSUE: 'toggle_create_issue',
    ADD_PROJECT_TAB: 'add_project_tab',
    REMOVE_PROJECT_TAB: 'remove_project_tab',
    SELECT_PROJECT: 'select_project',
    SELECT_ISSUE: 'select_issue',
    DISPLAY_CLOSED_ISSUES: 'display_closed_issues'
}

const reducerUi = (state, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_PROJECT_MANAGER:
            return (state.displayProjectManager === true)
                ? { ...state, displayProjectManager: false }
                : { ...state, displayProjectManager: true, displayCreateIssue: false, selectIssue: null };
        case ACTIONS.TOGGLE_CREATE_ISSUE:
            return state;
        case ACTIONS.ADD_PROJECT_TAB:
            return state;
        case ACTIONS.REMOVE_PROJECT_TAB:
            return state;
        case ACTIONS.SELECT_PROJECT:
            return state;
        case ACTIONS.SELECT_ISSUE:
            return state
        case ACTIONS.DISPLAY_CLOSED_ISSUES:
            return state;
        default:
            return state;
    }
}

export default reducerUi;