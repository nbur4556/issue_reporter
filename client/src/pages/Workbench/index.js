/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react';
import './style.css';

// Components
import Render from './Render';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

// Utilities
import loadData from './loadData';
import reducerUi, { ACTIONS as uiActions } from './reducerUi';
import reducerUserData, { ACTIONS as userDataActions } from './reducerUserData';

// Contexts
export const UserDataContext = React.createContext();
export const UiContext = React.createContext();
export const UiDispatcherContext = React.createContext();

const Workbench = () => {
    //State
    const [userData, dispatchUserData] = useReducer(reducerUserData, {
        projectList: [],
        issueList: []
    });

    const [ui, dispatchUi] = useReducer(reducerUi, {
        displayProjectManager: false,
        displayCreateProject: false,
        displayCreateIssue: false,
        displayClosedIssue: false,
        projectTabs: [],
        selectProject: null,
        selectIssue: null,
        sortBy: 'dueDate',
        sortByReversed: true
    });

    const uiDispatcher = { dispatch: dispatchUi, ACTIONS: uiActions };
    const userDataDispatcher = { dispatch: dispatchUserData, ACTIONS: userDataActions };

    // Use Effects
    useEffect(() => handleLoadData(), []);
    useEffect(() => { issueInterface.handleLoadIssues() }, [ui.selectProject])

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(({ data }) => {
            userDataDispatcher.dispatch({ type: userDataDispatcher.ACTIONS.LOAD_PROJECT_LIST, payload: { data: data } });
        });
    }

    // Issue and Project functions
    const issueInterface = IssueInterface({ userData, userDataDispatcher, ui, uiDispatcher });
    const projectInterface = ProjectInterface({ ui, uiDispatcher, handleLoadData });

    return (
        <UserDataContext.Provider value={userData}>
            <UiContext.Provider value={ui}>
                <UiDispatcherContext.Provider value={uiDispatcher}>
                    <Render
                        issueInterface={issueInterface}
                        projectInterface={projectInterface}
                        handleLoadData={handleLoadData}
                    />
                </UiDispatcherContext.Provider>
            </UiContext.Provider>
        </UserDataContext.Provider>
    );
}

export default Workbench;