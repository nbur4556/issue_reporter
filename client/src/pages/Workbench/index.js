/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from 'react';
import './style.css';

import Render from './Render';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

import loadData from './loadData';
import reducerUi, { ACTIONS as uiActions } from './reducerUi';
import reducerUserData, { ACTIONS as userDataActions } from './reducerUserData';

const Workbench = () => {
    const issueInterface = IssueInterface({ userData, userDataDispatcher, ui, uiDispatcher });

    const [userData, dispatchUserData] = useReducer(reducerUserData, {
        projectList: [],
        issueList: []
    });

    const [ui, dispatchUi] = useReducer(reducerUi, {
        displayProjectManager: false,
        displayCreateIssue: false,
        displayClosedIssue: false,
        projectTabs: [],
        selectProject: null,
        selectIssue: null
    })

    const uiDispatcher = { dispatch: dispatchUi, ACTIONS: uiActions };
    const userDataDispatcher = { dispatch: dispatchUserData, ACTIONS: userDataActions };

    useEffect(() => handleLoadData(), []);
    useEffect(() => { issueInterface.handleLoadIssues() }, [ui.selectProject])

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(({ data }) =>
            dispatchUserData({ type: 'load_project_list', payload: { data: data } })
        );
    }

    return (
        <Render
            ui={ui}
            userData={userData}
            uiDispatcher={uiDispatcher}

            issueInterface={issueInterface}
            projectInterface={ProjectInterface({ handleLoadData })}
            handleLoadData={handleLoadData}
        />
    );
}

export default Workbench;