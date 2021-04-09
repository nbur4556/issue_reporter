const ACTIONS = {
    LOAD_PROJECT_LIST: "load_project_list"
}

const reducerUserData = (state, action) => {
    switch (action.type) {
        case (ACTIONS.LOAD_PROJECT_LIST):
            return ({ ...state, projectList: action.payload.data });
        default:
            return state;
    }
}

export { ACTIONS }
export default reducerUserData