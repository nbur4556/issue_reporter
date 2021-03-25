import React, { useState, useEffect } from 'react';
import './style.css';

import Render from './Render';
import HandleUi from './HandleUi';
import IssueInterface from './IssueInterface';
import ProjectInterface from './ProjectInterface';

import loadData from './loadData';

const Workbench = () => {
    const [userData, setUserData] = useState({
        projectList: [],
        issueList: []
    });

    const [userInterface, setUserInterface] = useState({
        displayProjectManager: false,
        displayCreateIssue: false,
        displayClosedIssue: false,
        projectTabs: [],
        selectProject: null,
        selectIssue: null
    });

    useEffect(() => handleLoadData(), []);
    useEffect(() => { handleLoadIssues() }, [userInterface.selectProject])

    // Get projects and issues for authorized users
    const handleLoadData = () => {
        loadData().then(projectResponse => {
            setUserData({ ...userData, projectList: projectResponse.data });
        });
    }

    // Logical Component Destructuring
    const { handleLoadIssues, handleDeleteIssue, handleSetIssueStatus } = IssueInterface(
        { userData, setUserData, userInterface, setUserInterface }
    );
    const { handleEditProject, handleDeleteProject } = ProjectInterface({ handleLoadData });

    return (
        <Render
            ui={userInterface}
            handleUi={HandleUi({ userInterface, setUserInterface, userData })}

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