const ACTIONS = {
    LOAD_DATA: "load_data"
}

const reducerUserData = (state, action) => {
    switch (action.type) {
        case (ACTIONS.LOAD_DATA):
            return ({ ...state, projectList: action.payload.data });
        default:
            return state;
    }
}

export { ACTIONS }
export default reducerUserData