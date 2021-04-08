/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useReducer, useEffect } from 'react';
import './style.css';

import Render from './Render';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

import loadData from './loadData';
import reducerUi, { ACTIONS } from './reducerUi';

const Workbench = () => {
    const [userData, setUserData] = useState({
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

    useEffect(() => handleLoadData(), []);
    useEffect(() => { handleLoadIssues() }, [ui.selectProject])

    const uiDispatcher = { dispatch: dispatchUi, ACTIONS: ACTIONS };

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(projectResponse => {
            setUserData({ ...userData, projectList: projectResponse.data });
        });
    }

    // Logical Component Destructuring
    const { handleLoadIssues, handleDeleteIssue, handleSetIssueStatus } = IssueInterface(
        { userData, setUserData, userInterface: ui, uiDispatcher }
    );
    const { handleEditProject, handleDeleteProject } = ProjectInterface({ handleLoadData });

    return (
        <Render
            ui={ui}
            uiDispatcher={{ dispatch: dispatchUi, ACTIONS: ACTIONS }}

            userData={userData}
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