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
    useEffect(() => { handleLoadIssues() }, [ui.selectProject])

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(({ data }) =>
            dispatchUserData({ type: 'load_project_list', payload: { data: data } })
        );
    }

    // Logical Component Destructuring
    const { handleLoadIssues, handleDeleteIssue, handleSetIssueStatus } = IssueInterface(
        { userData, userDataDispatcher, ui, uiDispatcher }
    );
    const { handleEditProject, handleDeleteProject } = ProjectInterface({ handleLoadData });

    return (
        <Render
            ui={ui}
            userData={userData}
            uiDispatcher={uiDispatcher}

            editProject={handleEditProject}
            deleteProject={handleDeleteProject}
            loadIssues={handleLoadIssues}
            setIssueStatus={handleSetIssueStatus}
            deleteIssue={handleDeleteIssue}
            loadData={handleLoadData}
        />
    );
}

export default Workbench;