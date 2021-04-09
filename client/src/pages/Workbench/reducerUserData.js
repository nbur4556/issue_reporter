const ACTIONS = {
    LOAD_PROJECT_LIST: "load_project_list",
    LOAD_ISSUES: "load_issues"
}

const reducerUserData = (state, action) => {
    switch (action.type) {
        case (ACTIONS.LOAD_PROJECT_LIST):
            return { ...state, projectList: action.payload.data };
        case (ACTIONS.LOAD_ISSUES):
            return { ...state, issueList: action.payload.issues }
        default:
            return state;
    }
}

export { ACTIONS }
export default reducerUserData